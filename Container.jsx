import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import Truncate from 'react-truncate';
// import ExplainerCard from './cards/explainer_card.jsx'

export default class ExplainerCard extends React.Component {
  constructor(props) {
    super(props)
    let card_styles, 
      dimension = this.getScreenSize();
    console.log(dimension.width, dimension.height, "dimension")
    if (dimension.width <= 500){ // mobile
      card_styles = {
        height : dimension.height * 0.3
      }
    } 
    this.state = {
      card_data: [],
      // expanded: false,
      // truncated: false,
      // card_styles: card_styles
    }
    // this.handleTruncate = this.handleTruncate.bind(this);
    // this.toggleLines = this.toggleLines.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.dataURL === "string"){
      axios.all([axios.get(this.props.dataURL)])
      .then(axios.spread((card) => {
        this.setState({
          card_data: card.data
        });
      }));
    } else {
      this.setState({
        card_data: this.props.dataURL
      });
    }   
  }

  // handleTruncate(truncated) {
  //   // console.log(truncated);
  //   if (this.state.truncated !== truncated) {
  //     this.setState({
  //       truncated
  //     });
  //   }
  // }

  // toggleLines(event) {
  //   event.preventDefault();
  //   let card_offset = document.getElementById('main-card-div').offsetHeight,
  //     text_offset = document.getElementById('explainer-text').offsetHeight;
  //     console.log(card_offset, "card_offset")
  //     console.log(text_offset, "text_offset")
  //   // console.log("in toogle event --- expanded", this.state.expanded)
  //   // console.log("in toogle event --- truncated",this.state.truncated)
  //   if (!this.state.expanded) {
  //     // console.log("inside if --- before - expanded", this.state.expanded)
  //     // console.log("inside if  --- before - truncated",this.state.truncated)
  //     this.setState({
  //       expanded: !this.state.expanded,
  //       card_styles: {
  //         height: card_offset + text_offset + 18
  //       }
  //     });
  //     // console.log("inside if --- after - expanded", this.state.expanded)
  //     // console.log("inside if  --- after - truncated",this.state.truncated)
  //   } else {
  //     // console.log("inside else --- before - expanded", this.state.expanded)
  //     // console.log("inside else --- before - truncated",this.state.truncated)
  //     this.setState({
  //       expanded: !this.state.expanded,
  //       card_styles: {
  //         height: text_offset + 18
  //       }
  //     })
  //     // console.log("inside else --- after - expanded", this.state.expanded)
  //     // console.log("inside else --- after - truncated",this.state.truncated)
  //   }
  // }

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
    // const { more, less, lines } = this.props;
    // const { expanded, truncated } = this.state;
  
    // return (
    //   <div className='cards-container'> 
    //     <div id="main-card-div" className = "card-div" style = {this.state.card_styles}>
    //       <h1 className="explainer_header">{this.state.card_data.explainer_header}</h1>
    //       <div id="explainer-text" className="explainer_text" style= {this.state.explainer_text_styles}>
    //         <Truncate 
    //           lines={!expanded && lines}
    //           ellipsis={(
    //             <span>... <a id="read-more-link" href='#' onClick={this.toggleLines}>{more}</a></span>
    //           )}>
    //            {this.state.card_data.explainer_text}
    //         </Truncate>
    //       </div>
    //       {!truncated && expanded && (
    //         <span> <a id="read-more-link" href='#' onClick={this.toggleLines}>{less}</a></span>
    //       )}
    //     </div>
    //   </div>
    // );
    return (
      <div id="main-card-div" className = "card-div" style = {this.state.card_styles}>
        <h1 className="explainer_header"> {this.state.card_data.explainer_header} </h1>
        <div className="explainer_text" style= {this.state.styles}>
          <p>{this.state.card_data.explainer_text} </p> 
        </div>
      </div>
    )
  }
}

// ExplainerCard.defaultProps = {
//   lines: 4,
//   more: 'Read more',
//   less: 'Show less'
// };

// export default Container;
