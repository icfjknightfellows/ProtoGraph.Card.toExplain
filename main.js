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

ProtoGraph.Card.toExplain.prototype.renderSEO = function (data) {
  this.renderMode = 'SEO';
  return this.containerInstance.renderSEO();
}

ProtoGraph.Card.toExplain.prototype.renderLaptop = function (data) {
  console.log(window, "inside renderLaptop methos", this)
  var that = this;
  // debugger;
  var ReceiverConsumer = Oasis.Consumer.extend({
    requests: {
      receive: function(mode) {
        // console.log("receive", this, that.options.selector)
        that.renderMode = 'laptop';
        ReactDOM.render(
          <ExpCard
            dataURL={that.options.data_url}
            schemaURL={that.options.schema_url}
            optionalConfigURL={that.options.configuration_url}
            optionalConfigSchemaURL={that.options.configuration_schema_url}
            mode={that.renderMode}
            ref={(e) => {
              that.containerInstance = that.containerInstance || e;
            }}/>,
            that.options.selector);
        setTimeout(function(){
          var h = that.options.selector.offsetHeight
          console.log(h, "hhhhhhhhhhhhhhh")
          oasis.consumers.receive.send('resize_frame', {width: '100%', height: h})
        }, 2000)
      }
    }
  });
  oasis.connect({
    consumers: {
      receive: ReceiverConsumer
    }
  })
  // this.mode = 'laptop';
  // ReactDOM.render(
  //   <ExpCard
  //     dataURL={this.options.data_url}
  //     schemaURL={this.options.schema_url}
  //     optionalConfigURL={this.options.configuration_url}
  //     optionalConfigSchemaURL={this.options.configuration_schema_url}
  //     mode={this.mode}
  //     ref={(e) => {
  //       this.containerInstance = this.containerInstance || e;
  //     }}/>,
  //   this.options.selector);
}

ProtoGraph.Card.toExplain.prototype.renderMobile = function (data) {
  this.mode = 'mobile';
  ReactDOM.render(
    <ExpCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
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
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}