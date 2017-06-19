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
      // card_styles: {
      //   backgroundColor: ""
      // }
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
            configJSON: config.data
            // card_styles: {
            //   backgroundColor: config.data.optional.background_color
            // }
          });
        }));
    } 
    // else {
    //   console.log(this.props.configURL, this.props.dataURL, "this.props.configURL")
    //   this.setState({
    //     dataJSON: this.props.dataURL
    //   });
    //   card_styles: {
    //     backgroundColor: this.props.configURL
    //   }
    // }
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
    if (this.state.step === 1) {
      this.setState({
        dataJSON: formData
      });
    } else {
      console.log("else", formData.optional.background_color)
      this.setState({
        // card_styles: {
        //   backgroundColor: formData.optional.background_color
        // }
        configJSON: formData
      })
    }
  }

  onSubmitHandler({formData}) {
    console.log(this.state.dataJSON, formData, "on Submit =======================")
    if (this.state.step === 1) {
      this.setState({
        step: 2,
        dataJSON: formData
      });
    } else {
      alert("You submitted the form");
    }
  }

  renderLaptop() {
    // const dataJSON = this.state.dataJSON,
    //   data = dataJSON ? dataJSON.data : {};
    const data = this.state.dataJSON;
    const styles = {
      backgroundColor: this.state.configJSON.optional.background_color
    }
    // console.log(this.state.dataJSON.data.explainer_header)
    return (
      <div className = "proto_card_div" style = {styles}>
        <h1 className="proto_explainer_header"> {data.explainer_header} </h1>
        <div className="proto_explainer_text">
          <p>{data.explainer_text} </p>
        </div>
      </div>
    )
  }

  renderEdit() {
    // console.log(this.state.dataJSON, this.props, this.state.schemaJSON, "schema data")
    if (this.state.schemaJSON === undefined) {
      return(<div>Loading</div>)
    } else {
      return (
        <div className="col-sm-12">
          <div className = "col-sm-6" id="proto_explainer_form_div">
            <Form schema = { this.state.step === 1 ? this.state.schemaJSON : this.state.configSchemaJSON }
            onSubmit = {((e) => this.onSubmitHandler(e))}
            onChange = {((e) => this.onChangeHandler(e))} 
            formData = { this.state.step === 1 ? this.state.dataJSON : this.state.configJSON} />
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