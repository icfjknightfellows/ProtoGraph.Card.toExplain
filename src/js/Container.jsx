import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ExplainerCard extends React.Component {
  constructor(props) {
    super(props)

    let stateVar = {
      fetchingData: true,
      dataJSON: {
        card_data: {},
        configs: {}
      },
      schemaJSON: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.schemaJSON) {
      stateVar.schemaJSON = this.props.schemaJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    if (this.props.optionalConfigSchemaJSON) {
      stateVar.optionalConfigSchemaJSON = this.props.optionalConfigSchemaJSON;
    }

    this.state = stateVar;
  }

  exportData() {
    return document.getElementById('protograph_div').getBoundingClientRect();
  }

  componentDidMount() {
    // get sample json data based on type i.e string or object
    if (this.state.fetchingData){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.schemaURL), axios.get(this.props.optionalConfigURL), axios.get(this.props.optionalConfigSchemaURL)])
        .then(axios.spread((card, schema, opt_config, opt_config_schema) => {
          this.setState({
            fetchingData: false,
            dataJSON: {
              card_data: card.data,
              configs: opt_config.data
            },
            schemaJSON: schema.data,
            optionalConfigJSON: opt_config.data,
            optionalConfigSchemaJSON: opt_config_schema.data
          });
        }));
    } else {
      this.componentDidUpdate();
    }
  }

  componentDidUpdate() {
    let elem = document.querySelector('.protograph_explainer_text')
    this.multiLineTruncate(elem)
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

  multiLineTruncate(el) {
    let data = this.state.dataJSON.card_data,
      wordArray = data.data.explainer_text.split(' '),
      props = this.props;
    // console.log(wordArray, "wordArray", el, el.scrollHeight, el.offsetHeight)
    while(el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = wordArray.join(' ') + '...' + '<span><a id="protograph_read_more">Read more</a></span>';
    }
    if(document.getElementById('protograph_read_more') !== null){
      document.getElementById('protograph_read_more').addEventListener('click', function(){
        document.querySelector('.protograph_explainer_text').style.height = 'auto';
        document.querySelector('.protograph_explainer_text').innerHTML = data.data.explainer_text;
        // console.log(props, "props")
        props.clickCallback();
      })
    }
  }

  renderLaptop() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      let styles = this.state.dataJSON.configs ? {backgroundColor: this.state.dataJSON.configs.background_color} : undefined
      styles["width"] = "100%";
      let header_style = this.state.dataJSON.configs ? {color: this.state.dataJSON.configs.text_color} : undefined;
      return (
        <div>
          <div id="protograph_div" className = "protograph_card_div" style = {styles}>
            <h1 className="protograph_explainer_header" style= {header_style}> {data.data.explainer_header} </h1>
            <div className="protograph_explainer_text">{data.data.explainer_text}</div>
          </div>
        </div>
      )
    }
  }

  renderMobile() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      let styles = this.state.dataJSON.configs ? {backgroundColor: this.state.dataJSON.configs.background_color} : undefined
      styles['width'] = '300px';
      let header_style = this.state.dataJSON.configs ? {color: this.state.dataJSON.configs.text_color} : undefined;
      return (
        <div>
          <div id="protograph_div" className = "protograph_card_div" style = {styles}>
            <h1 className="protograph_explainer_header" style= {header_style}> {data.data.explainer_header} </h1>
            <div className="protograph_explainer_text">{data.data.explainer_text}</div>
          </div>
        </div>
      )
    }
  }

  renderScreenshot() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      let styles = this.state.dataJSON.configs ? {backgroundColor: this.state.dataJSON.configs.background_color} : undefined
      let screenshot_styles =  {
        height:'auto'
      }
      return (
          <div id="ProtoScreenshot" className = "protograph_card_div" style = {styles}>
            {/* <h1 className="protograph_explainer_header"> {data.data.explainer_header} </h1> */}
            <div className="protograph_explainer_text" style = {screenshot_styles}>{data.data.explainer_text}</div>
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
        return this.renderMobile();
        break;
      case 'tablet' :
        return this.renderLaptop();
        break;
      case 'screenshot' :
          return this.renderScreenshot();
          break;
    }
  }
}