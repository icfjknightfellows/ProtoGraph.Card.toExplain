import React from 'react';
import ReactDOM from 'react-dom';
import EditExplainerCard from './src/js/edit_explainer_card.jsx';

ProtoGraph.Card.toExplain.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toExplain.prototype.renderSEO = function (data) {
  this.renderMode = 'SEO';
  return this.containerInstance.renderSEO();
}

ProtoGraph.Card.toExplain.prototype.renderEdit = function (onPublishCallback) {
  this.mode = 'edit';
  this.onPublishCallback = onPublishCallback;
  ReactDOM.render(
    <EditExplainerCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      siteConfigURL={this.options.site_config_url}
      onPublishCallback={this.onPublishCallback}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}