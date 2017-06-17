import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ExplainerCard extends React.Component {
  constructor(props) {
    super(props)
    let card_styles, 
      dimension = this.getScreenSize();
    console.log(dimension.width, dimension.height, "dimension")
    if (dimension.width <= 500){ // mobile
      card_styles = {
        height : dimension.height * 0.3,
        backgroundColor: ""
      }
    } 
    this.state = {
      card_data: []
    }
  }

  componentDidMount() {
    if (typeof this.props.dataURL === "string"){
      axios.get(this.props.dataURL)
      .then(card => {
        this.setState({
          card_data: card.data.data,
          card_styles: {
            backgroundColor: card.data.configuration.background_color
          }
        });
      });
    } else {
      this.setState({
        card_data: this.props.dataURL
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

  render() {
    return (
      <div className = "proto_card_div" style = {this.state.card_styles}>
        <h1 className="proto_explainer_header"> {this.state.card_data.explainer_header} </h1>
        <div className="proto_explainer_text" style= {this.state.styles}>
          <p>{this.state.card_data.explainer_text} </p> 
        </div>
      </div>
    )
  }
}