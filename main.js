import React from 'react';
import ReactDOM from 'react-dom';
import ExplainerCard from './src/js/Container.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toExplain = function () {
  this.cardType = 'ExplainerCard';
}

ProtoGraph.Card.toExplain.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toExplain.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toExplain.prototype.renderLaptop = function (data) {
  this.mode = 'laptop';
  ReactDOM.render(
    <ExplainerCard
      viewCastId={this.options.viewCastId}
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      readMoreEnabled={data}
      clickCallback={this.options.onClickCallback}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}
      piwikCallback={this.options.piwikCallback}
    />,
    this.options.selector);
}

ProtoGraph.Card.toExplain.prototype.renderMobile = function (data) {
  this.mode = 'mobile';
  ReactDOM.render(
    <ExplainerCard
      viewCastId={this.options.viewCastId}
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      readMoreEnabled={data}
      clickCallback={this.options.onClickCallback}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}
      piwikCallback={this.options.piwikCallback}
    />,
    this.options.selector);
}

ProtoGraph.Card.toExplain.prototype.renderScreenshot = function (data) {
  this.mode = 'screenshot';
  ReactDOM.render(
    <ExplainerCard
      viewCastId={this.options.viewCastId}
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}
      piwikCallback={this.options.piwikCallback}
    />,
    this.options.selector);
}

