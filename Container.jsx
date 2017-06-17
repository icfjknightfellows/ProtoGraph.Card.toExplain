import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from 'react-jsonschema-form';

export default class ExplainerCard extends React.Component {
  constructor(props) {  
    super(props)
    let card_styles = {
      backgroundColor: ""
    }
    this.state = {
      dataJSON: {
        data: {},
        configuration: {}
      },
      schema_data: undefined
    }
  }

  componentDidMount() {
    // get sample json data based on type i.e string or object
    if (typeof this.props.dataURL === "string"){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.schemaURL)])
        .then(axios.spread((card, schema) => {
          console.log(card, schema, "-------")
          this.setState({
            dataJSON: card.data,
            schema_data: schema.data,
            card_styles: {
              backgroundColor: card.data.configuration.background_color
            }
          });
        }));
    } else {
      this.setState({
        dataJSON: this.props.dataURL
      });
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
    console.log(formData,"...................")
    this.setState({
      dataJSON: formData,
      card_styles: {
        backgroundColor: formData.configuration.background_color
      }
    });
  }

  renderLaptop() {
    console.log(this.state.dataJSON);
    // const dataJSON = this.state.dataJSON,
    //   data = dataJSON ? dataJSON.data : {};
    const data = this.state.dataJSON.data;
    // console.log(this.state.dataJSON.data.explainer_header)
    return (
      <div className = "proto_card_div" style = {this.state.card_styles}>
        <h1 className="proto_explainer_header"> {data.explainer_header} </h1>
        <div className="proto_explainer_text" style= {this.state.styles}>
          <p>{data.explainer_text} </p> 
        </div>
      </div>
    )
  }

  renderEdit() {
    // console.log(this.state.dataJSON, this.props, this.state.schema_data, "schema data")
    if (this.state.schema_data === undefined) {
      return(<div>Loading</div>)
    } else {
      return (
        <div className="col-sm-12">
          <div className = "col-sm-6" id="proto_explainer_form_div">
            <Form schema = { this.state.schema_data }
            onChange = {((e) => this.onChangeHandler(e))} 
            formData = {this.state.dataJSON }/>
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