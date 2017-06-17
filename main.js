import React from 'react';
import ReactDOM from 'react-dom';
import ExpCard from './Container.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};

ProtoGraph.Card.toExplain = function () {
  this.cardType = 'ExplainerCard';
}

ProtoGraph.Card.toExplain.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toExplain.prototype.setData = function (data) {
  this.data = data;
}

ProtoGraph.Card.toExplain.prototype.getData = function (data) {
  return this.containerInstance.stateData();
}

ProtoGraph.Card.toExplain.prototype.renderLaptop = function (data) {
  this.mode = 'laptop';
  this.containerInstance = <ExpCard dataURL={this.options.data_url} />
  ReactDOM.render(this.containerInstance, this.options.selector);
}

ProtoGraph.Card.toExplain.prototype.renderEdit = function (data) {
  this.mode = 'edit';
}