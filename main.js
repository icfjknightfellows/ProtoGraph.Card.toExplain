import React from 'react';
import ReactDOM from 'react-dom';
import ExpCard from './src/js/Container.jsx';

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
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toExplain.prototype.renderLaptop = function (data) {
  this.mode = 'laptop';
  ReactDOM.render(
    <ExpCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      configURL={this.options.configuration_url}
      configSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

ProtoGraph.Card.toExplain.prototype.renderMobile = function (data) {
  this.mode = 'mobile';
  ReactDOM.render(
    <ExpCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      configURL={this.options.configuration_url}
      configSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

ProtoGraph.Card.toExplain.prototype.renderEdit = function (data) {
  this.mode = 'edit';
  ReactDOM.render(
    <ExpCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      mandatoryConfigURL={this.options.mandatory_config_url}
      mandatoryConfigSchemaURL={this.options.mandatory_config_schema_url}
      optionalConfigURL={this.options.optional_config_url}
      optionalConfigSchemaURL={this.options.optional_config_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}