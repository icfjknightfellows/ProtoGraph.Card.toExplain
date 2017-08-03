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
        }));
    } else {
      this.componentDidUpdate();
    }
  }

  componentDidUpdate() {
    if (this.props.mode === 'mobile' || this.props.mode === 'laptop'){
      let elem = document.querySelector('.protograph-explainer-text')
      this.multiLineTruncate(elem)
    }
  }

  multiLineTruncate(el) {
    let data = this.state.dataJSON.card_data,
      wordArray = data.data.explainer_text.split(' '),
      props = this.props;
    while(el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = wordArray.join(' ') + '...' + '<br><button id="read-more-button" class="protograph-read-more">View more</button>' ;
    }
    if(document.getElementById('read-more-button') !== null){
      document.getElementById('read-more-button').addEventListener('click', function(){
        document.getElementById('read-more-button').style.display = 'none'
        document.querySelector('.protograph-explainer-text').style.height = 'auto';
        document.querySelector('.protograph-explainer-text').style.marginBottom = '10px';
        document.querySelector('.protograph-explainer-text').innerHTML = data.data.explainer_text;
        if(typeof props.clickCallback === 'function') {
          props.clickCallback();
        }
      })
    }
  }

  renderLaptop() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      let styles = {
        width : "100%"
      }
      return (
        <div id="protograph-div" style={styles}>
          <div className="protograph-card">
            {(data.data.hasOwnProperty('tag') && data.data.tag !== "undefined" && data.data.tag !== '' ) ? <p className="protograph-tag">#{data.data.tag}</p>: ''}
            <h3 className="ui header" style={{marginBottom: '15px'}}>{data.data.explainer_header}</h3>
            <p className="protograph-explainer-text">{data.data.explainer_text}</p>
            <div className="protograph-footer">
              <div className="protograph-credits"><a className="protograph-card-link" href="https://protograph.pykih.com/card/toexplain" target="_blank">toExplain</a></div>
            </div>
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
      let styles = {
        width : "300px"
      }
      return (
        <div id="protograph-div" style={styles}>
          <div className="protograph-card">
            {(data.data.hasOwnProperty('tag') && data.data.tag !== "undefined" && data.data.tag !== '' ) ? <p className="protograph-tag">#{data.data.tag}</p>: ''}
            <h3 className="ui header" style={{marginBottom: '15px'}}>{data.data.explainer_header}</h3>
            <p className="protograph-explainer-text">{data.data.explainer_text}</p>
            <div className="protograph-footer">
              <div className="protograph-credits"><a className="protograph-card-link" href="https://protograph.pykih.com/card/toexplain" target="_blank">toExplain</a></div>
            </div>
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
      return (
        <div id="ProtoScreenshot">
          <div className="protograph-card">
            <p>{data.data.explainer_text}</p>
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
        return this.renderMobile();
        break;
      case 'screenshot' :
        return this.renderScreenshot();
        break;
    }
  }
}