import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from 'react-jsonschema-form';

export default class ExplainerCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      dataJSON: {
        data: {},
        configs: {}
      },
      schemaJSON: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined,
      mandatoryConfigJSON: {}, 
      mandatoryConfigSchemaJSON: undefined                
    }
  }

  exportData() {
    let getDataObj = {
      dataJSON: this.state.dataJSON.data,
      schemaJSON: this.state.schemaJSON,
      optionalConfigJSON: this.state.optionalConfigJSON,
      optionalConfigSchemaJSON: this.state.optionalConfigSchemaJSON,
      mandatoryConfigJSON: this.state.mandatoryConfigJSON, 
      mandatoryConfigSchemaJSON: this.state.mandatoryConfigSchemaJSON
    }
    console.log(getDataObj, "=====getdata=====")
    return getDataObj;
    // return this.state
  }

  componentDidMount() {
    // get sample json data based on type i.e string or object
    if (typeof this.props.dataURL === "string"){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.schemaURL), axios.get(this.props.optionalConfigURL), axios.get(this.props.optionalConfigSchemaURL), axios.get(this.props.mandatoryConfigURL),axios.get(this.props.mandatoryConfigSchemaURL)])
        .then(axios.spread((card, schema, opt_config, opt_config_schema, mandatory_config, mandatory_config_schema) => {
          this.setState({
            dataJSON: {
              data: card.data,
              configs: opt_config.data
            },
            schemaJSON: schema.data,
            optionalConfigJSON: opt_config.data,
            optionalConfigSchemaJSON: opt_config_schema.data,
            mandatoryConfigJSON: mandatory_config.data, 
            mandatoryConfigSchemaJSON: mandatory_config_schema.data
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
    // console.log(formData, "...................")
    switch (this.state.step) {
      // case 1: 
      //   break;
      case 1:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.data = formData
          return {
            dataJSON: dataJSON  
          }
        })
        break;
      case 2:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.configs.background_color = formData.background_color
          return {
            dataJSON: dataJSON  
          }
        })
        break;
    }
  }

  onSubmitHandler({formData}) {
    // console.log(formData, "on Submit =======================")
    switch(this.state.step) {
      // case 1:
      //   this.setState({
      //     step: 2
      //   });
      //   break;
      case 1:
        this.setState({
          step: 2
        });
        break;
      case 2:
        alert("The card is published");
        break;
    }
  }

  renderLaptop() {
    // console.log(this.state.configJSON, this.state.step,"inside his.state.configJSON")
    const data = this.state.dataJSON.data;
    let styles = this.state.dataJSON.configs ? {backgroundColor: this.state.dataJSON.configs.background_color} : undefined
    // console.log(data, "data-----", this.state.step, this.state.configJSON)
    
    // console.log(styles,';;;;;;;')
    return (
      <div className = "protograph_card_div" style = {styles}>
        <h1 className="protograph_explainer_header"> {data.explainer_header} </h1>
        <div className="protograph_explainer_text">
          <p>{data.explainer_text} </p>
        </div>
      </div>
    )
  }

  renderSchemaJSON() {
    // console.log(this.state.optionalConfigSchemaJSON, "this.state.configSchemaJSON")
    switch(this.state.step){
      // case 1:
      //   return this.state.mandatoryConfigSchemaJSON;
      //   break;
      case 2:
        return this.state.optionalConfigSchemaJSON;
        break;
      case 1:
        return this.state.schemaJSON; 
        break;
    }
  }

  renderFormData() {
    switch(this.state.step) {
      // case 1:
      //   return {};
      //   break;
      case 2:
        return this.state.dataJSON.configs;
        break;
      case 1:
        return this.state.dataJSON.data;
        break;
    }
  }

  showLinkText() {
    switch(this.state.step) {
      // case 1:
      //   return '';
      //   break;
      case 1:
        return '';
        // return '< Back to Mandatory selection';
        break;
      case 2:
        return '< Back to building the card';
        break;
    }
  }

  showButtonText() {
    switch(this.state.step) {
      // case 1:       
      case 1:
        return 'Proceed to next step';
        break;
      case 2:
        return 'Publish';
        break;
    }
  }

  onPrevHandler() {
    let prev_step = --this.state.step;
    this.setState({
      step: prev_step
    })  
  }

  renderEdit() {
    // console.log(this.state.dataJSON, this.props, this.state.schemaJSON, "schema data")
    if (this.state.schemaJSON === undefined) {
      return(<div>Loading</div>)
    } else {
      return (
        <div className="col-sm-12">
          <div className = "col-sm-6" id="protograph-explainer-form-div">
            <Form schema = {this.renderSchemaJSON()}
            onSubmit = {((e) => this.onSubmitHandler(e))}
            onChange = {((e) => this.onChangeHandler(e))} 
            formData = {this.renderFormData()}>
            <a id="protograph-prev-link"onClick = {((e) => this.onPrevHandler(e))}>{this.showLinkText()} </a>
            <button type="submit" className="btn btn-info">{this.showButtonText()}</button>
            </Form>
          </div>
          <div className = "col-sm-6" id="protograph-explainer-card-div">
            {this.renderLaptop()}
          </div>
        </div>
      )
    }
  }

  render() {
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