import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from 'react-jsonschema-form';

export default class ExplainerCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      dataJSON: {},
      schemaJSON: undefined,
      configSchemaJSON: undefined,
      configJSON: {}
    }
  }

  exportData() {
    return this.state;
  }

  componentDidMount() {
    // get sample json data based on type i.e string or object
    if (typeof this.props.dataURL === "string"){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.schemaURL), axios.get(this.props.configURL), axios.get(this.props.configSchemaURL)])
        .then(axios.spread((card, schema, config, config_schema) => {
          this.setState({
            dataJSON: card.data,
            schemaJSON: schema.data,
            configSchemaJSON: config_schema.data,
            configJSON: config.data.optional
          });
        }));
    } 
  }

  getScreenSize() {
    let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      width = w.innerWidth || e.clientWidth || g.clientWidth,
      height = w.innerHeight|| e.clientHeight|| g.clientHeight;

    return {
      width: width,
      height: height
    };
  }

  onChangeHandler({formData}) {
    console.log(formData, this.state.step, "...................")
    switch (this.state.step) {
      case 1: 
        break;
      case 2:
        this.setState({
          dataJSON: formData
        });
        break;
      case 3:
        this.setState({
          configJSON: formData
        })
        break;
    }
  }

  onSubmitHandler({formData}) {
    console.log(formData, "on Submit =======================")
    switch(this.state.step) {
      case 1:
        this.setState({
          step: 2
        });
        break;
      case 2:
        this.setState({
          step: 3,
          dataJSON: formData
        });
        break;
      case 3:
        alert("The card is published");
        break;
    }
  }

  renderLaptop() {
    console.log(this.state.configJSON, this.state.step,"inside his.state.configJSON")
    const data = this.state.dataJSON;
    let styles = {
      backgroundColor: this.state.configJSON.background_color
    }
    // console.log(data, "data-----", this.state.step, this.state.configJSON)
    return (
      <div className = "proto_card_div" style = {styles}>
        <h1 className="proto_explainer_header"> {data.explainer_header} </h1>
        <div className="proto_explainer_text">
          <p>{data.explainer_text} </p>
        </div>
      </div>
    )
  }

  renderSchemaJSON() {
    switch(this.state.step){
      case 1:
        return this.state.configSchemaJSON.properties.mandatory;
        break;
      case 3:
        return this.state.configSchemaJSON.properties.optional;
        break;
      case 2: 
        return this.state.schemaJSON; 
        break;
    }
  }

  renderFormData() {
    switch(this.state.step) {
      case 1:
        return this.state.configJSON.mandatory;
        break;
      case 3:
        return this.state.configJSON;
        break;
      case 2:
        return this.state.dataJSON;
        break;
    }
  }

  showLinkText() {
    switch(this.state.step) {
      case 1:
        return '';
        break;
      case 2:
        return '< Back to Mandatory selection';
        break;
      case 3:
        return '< Back to building the card';
        break;
    }
  }

  showButtonText() {
    switch(this.state.step) {
      case 1:       
      case 2:
        return 'Proceed to next step';
        break;
      case 3:
        return 'Publish';
        break;
    }
  }

  renderEdit() {
    // console.log(this.state.dataJSON, this.props, this.state.schemaJSON, "schema data")
    if (this.state.schemaJSON === undefined) {
      return(<div>Loading</div>)
    } else {
      return (
        <div className="col-sm-12">
          <div className = "col-sm-6" id="proto_explainer_form_div">
            <Form schema = {this.renderSchemaJSON()}
            onSubmit = {((e) => this.onSubmitHandler(e))}
            onChange = {((e) => this.onChangeHandler(e))} 
            formData = {this.renderFormData()}>
            <a href="#">{this.showLinkText()} </a>
            <button type="submit" className="btn btn-info">{this.showButtonText()}</button>
            </Form>
          </div>
          <div className = "col-sm-6" id="proto_explainer_card_div">
            {this.renderLaptop()}
          </div>
        </div>
      )
    }
  }

  render() {
    // console.log(this.props.mode, "mode")
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop();
        break;
      case 'mobile' :
        return this.renderLaptop();
        break;
      case 'tablet' :
        return this.renderLaptop();
        break;
      case 'edit' :
        return this.renderEdit();
        break;
    }

  }
}