import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ExplainerCard from './Container.jsx';
import JSONSchemaForm from './react-jsonschema-form';

export default class EditExplainerCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      dataJSON: {
        card_data: {},
        configs: {}
      },
      schemaJSON: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined
    }
  }

  exportData() {
    let getDataObj = {
      step: this.state.step,
      dataJSON: this.state.dataJSON.card_data,
      schemaJSON: this.state.schemaJSON,
      optionalConfigJSON: this.state.dataJSON.configs,
      optionalConfigSchemaJSON: this.state.optionalConfigSchemaJSON
    }
    getDataObj["name"] = getDataObj.dataJSON.data.explainer_header.substr(0,225); // Reduces the name to ensure the slug does not get too long
    return getDataObj;
  }

  componentDidMount() {
    // get sample json data based on type i.e string or object
    if (typeof this.props.dataURL === "string"){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.schemaURL), axios.get(this.props.optionalConfigURL), axios.get(this.props.optionalConfigSchemaURL)])
        .then(axios.spread((card, schema, opt_config, opt_config_schema) => {
          this.setState({
            dataJSON: {
              card_data: card.data,
              configs: opt_config.data
            },
            schemaJSON: schema.data,
            optionalConfigJSON: opt_config.data,
            optionalConfigSchemaJSON: opt_config_schema.data
          });
        }));
    }
  }

  onChangeHandler({formData}) {
    switch (this.state.step) {
      case 1:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.card_data = formData
          return {
            dataJSON: dataJSON
          }
        })
        break;
      case 2:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          console.log(dataJSON, "dataJSON")
          dataJSON.configs = formData
          return {
            dataJSON: dataJSON
            // optionalConfigJSON: dataJSON
          }
        })
        break;
    }
  }

  onSubmitHandler({formData}) {
    switch(this.state.step) {
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
    // console.log(this.state.schemaJSON, this.state, this.props, "inside renderLaptop")
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      let styles = this.state.dataJSON.configs ? {backgroundColor: this.state.dataJSON.configs.background_color} : undefined
      return (
        <div>
          <div id="protograph_div" className = "protograph_card_div" style = {styles}>
            <h1 className="protograph_explainer_header"> {data.data.explainer_header} </h1>
            <div className="protograph_explainer_text">
              <p>{data.data.explainer_text} </p>
            </div>
          </div>
        </div>
      )
    }
  }

  renderSEO() {
    console.log(this.state.dataJSON.card_data, "this.state.dataJSON in seo mode")
    let seo_blockquote = `<blockquote><h3>${this.state.dataJSON.card_data.data.explainer_header}</h3><p>${this.state.dataJSON.card_data.data.explainer_text}</p></blockquote>`
    return seo_blockquote;
  }

  renderSchemaJSON() {
    switch(this.state.step){
      case 1:
        return this.state.schemaJSON;
        break;
      case 2:
        return this.state.optionalConfigSchemaJSON;
        break;
    }
  }

  renderFormData() {
    switch(this.state.step) {
      case 1:
        return this.state.dataJSON.card_data;
        break;
      case 2:
        return this.state.dataJSON.configs;
        break;
    }
  }

  showLinkText() {
    switch(this.state.step) {
      case 1:
        return '';
        break;
      case 2:
        return '< Back to building the card';
        break;
    }
  }

  showButtonText() {
    switch(this.state.step) {
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

  render() {
    if (this.state.schemaJSON === undefined) {
      return(<div>Loading</div>)
    } else {
      return (
        <div>
          <div className="protograph_col_6" id="protograph-explainer-form-div">
            <JSONSchemaForm schema={this.renderSchemaJSON()}
              onSubmit={((e) => this.onSubmitHandler(e))}
              onChange={((e) => this.onChangeHandler(e))}
              formData={this.renderFormData()}>
              <a id="protograph-prev-link"onClick = {((e) => this.onPrevHandler(e))}>{this.showLinkText()} </a>
              {
                this.state.step !== 2 &&
                  <button type="submit" className="default-button protograph-primary-button">{this.showButtonText()}</button>
              }
            </JSONSchemaForm>
          </div>
          <div className = "protograph_col_6" id="protograph-explainer-card-div">
              <ExplainerCard
                mode='laptop'
                dataJSON={this.state.dataJSON}
                schemaJSON={this.state.schemaJSON}
                optionalConfigJSON={this.state.optionalConfigJSON}
                optionalConfigSchemaJSON={this.state.optionalConfigSchemaJSON}
              />
          </div>
        </div>
      )
    }
  }
}