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
    return document.getElementById('protograph-div').getBoundingClientRect();
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

          if (typeof this.props.piwikCallback === "function") {
            this.props.piwikCallback('toExplain', 'loaded', this.props.viewCastId);
          }

        }));
    } else {
      this.componentDidUpdate();
    }
  }

  componentDidUpdate() {
    if (this.props.mode === 'mobile' || this.props.mode === 'laptop'){
      // console.log(this.props.readMoreEnabled, "this.props.readMoreEnabled")
      if (this.props.readMoreEnabled || this.props.readMoreEnabled === undefined) {
        let elem = document.querySelector('.protograph-explainer-text')
        this.multiLineTruncate(elem)
      }
    }
  }

  multiLineTruncate(el) {
    let data = this.state.dataJSON.card_data,
      border_style = this.state.dataJSON.configs ? `1px solid ${this.state.dataJSON.configs.band_color} !important` : undefined,
      wordArray = data.data.explainer_text.split(' '),
      props = this.props;
    while(el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = wordArray.join(' ') + '...' + '<br><button id="read-more-button" class="protograph-read-more" style="color:'+ this.state.dataJSON.configs.band_color +';border:'+border_style+'">Keep reading</button>' ;
    }
    if(document.getElementById('read-more-button') !== null){
      document.getElementById('read-more-button').addEventListener('click', function(){
        document.getElementById('read-more-button').style.display = 'none'
        document.querySelector('.protograph-explainer-text').style.maxHeight = 'none';
        document.querySelector('.protograph-explainer-text').style.marginBottom = '10px';
        document.querySelector('.protograph-explainer-text').innerHTML = data.data.explainer_text;
        if(typeof props.clickCallback === 'function') {
          props.clickCallback();
        }
      })
    }
  }

  renderLaptop(readMoreEnabled) {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      return this.renderCard('laptop', readMoreEnabled);
    }
  }

  renderMobile(readMoreEnabled) {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      return this.renderCard('mobile', readMoreEnabled);
    }
  }

  renderCard(mode, readMoreEnabled) {
    const data = this.state.dataJSON.card_data;
    let styles = this.state.dataJSON.configs ? {borderLeft: `5px solid ${this.state.dataJSON.configs.band_color}`} : undefined;
    styles["width"] = "100%";
    if (mode === 'mobile') {
      styles["maxWidth"] = "320px";
    }
    let header_style = this.state.dataJSON.configs ? {color: this.state.dataJSON.configs.band_color} : undefined,
    border_style = this.state.dataJSON.configs ? `1px solid ${this.state.dataJSON.configs.band_color}` : undefined;
    if (document.getElementById("read-more-button") !== null) {
      document.getElementById("read-more-button").style.border = border_style;
      document.getElementById("read-more-button").style.color = this.state.dataJSON.configs.band_color
    }
    // console.log(readMoreEnabled,"readMoreEnabled")
    let max_height = readMoreEnabled || readMoreEnabled === undefined ? {maxHeight:"110px"} : {maxHeight:"none"}
    return (
      <div id="protograph-div">
        <div className="protograph-card" style={styles}>
          <h3 className="ui header" style= {header_style}> {data.data.explainer_header}</h3>
          <div className="protograph-explainer-text" style={max_height}>{data.data.explainer_text}</div>
          <div className="protograph-footer">
            <div className="protograph-credits"><a className="protograph-card-link" href="https://protograph.pykih.com/card/toexplain" target="_blank">toExplain</a></div>
          </div>
        </div>
      </div>
    )
  }

  renderScreenshot() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      let styles = this.state.dataJSON.configs ? {borderLeft: `5px solid ${this.state.dataJSON.configs.band_color}`} : undefined;
      return (
        <div id="ProtoScreenshot">
          <div className="protograph-card" style={styles}>
            <p>{data.data.explainer_text}</p>
          </div>
        </div>
      )
    }
  }

  render() {
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop(this.props.readMoreEnabled);
        break;
      case 'mobile' :
        return this.renderMobile(this.props.readMoreEnabled);
        break;
      case 'screenshot' :
        return this.renderScreenshot();
        break;
    }
  }
}