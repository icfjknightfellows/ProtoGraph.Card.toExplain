import React from 'react';
import ReactDOM from 'react-dom';
import ExpCard from './Container.jsx';
// protoObject = {}
Proto = {};
Proto.Card = {};

Proto.Card.toExplain = function () {
  this.Container = ExpCard;
  return this;
}

Proto.Card.toExplain.prototype.init = function (options) {
  // console.log(this);
  this.options = options;
}

Proto.Card.toExplain.prototype.setData = function (data) {
  // console.log(this);
  this.data = data;
}

Proto.Card.toExplain.prototype.getData = function (data) {
  return this.Container.stateData();
}

Proto.Card.toExplain.prototype.renderLaptop = function (data) {
  this.mode = 'laptop';
  ReactDOM.render( <this.Container dataURL={this.options.data_url} schemaURL= {this.options.schema_url} mode = {this.mode}/>, this.options.selector);
}

Proto.Card.toExplain.prototype.renderEdit = function (data) {
  this.mode = 'edit';
  ReactDOM.render( <this.Container dataURL={this.options.data_url} schemaURL= {this.options.schema_url} mode = {this.mode}/>, this.options.selector);
}

module.exports = Proto 



//     var root_element = options.selector.constructor === String ? document.querySelector(options.selector) : options.selector;
//     ReactDOM.render( <Container dataURL={options.data_url} containerURL={options.container_data_url} />, root_element);
