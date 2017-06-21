//environment
window.ProtoEmbed = window.ProtoEmbed || {};
// var ProtoEmbed = {};
// ProtoEmbed.init = {};
ProtoEmbed.initFrame = function (id, url, mode) {
  // console.log("window inside init", parent_window)
  window.onload = function(){
    document.getElementById("cite").parentNode.removeChild(document.getElementById("cite"));
  }
  var ResizeService = Oasis.Service.extend({
    initialize: function() {
      this.request('receive', mode).then(function (data) {
        console.log(data, "initialize")
        resizeIframe(document.querySelector('#' + id + ' iframe'), data)
      });
    },
    events: {
      resize_frame: function(data){
        resizeIframe(document.querySelector('#' + id + ' iframe'), data)
      }
    }
  });
  var sandbox = oasis.createSandbox({
    url: url,
    type: 'html',
    capabilities: [ 'receive' ],
    services: {
      receive: ResizeService
    }
  });
  sandbox.el.setAttribute("sandbox", "allow-scripts allow-same-origin")
  console.log(sandbox, "sandbox")
  document.getElementById(id).append(sandbox.el);
  document.querySelector('#' + id + ' iframe').style.width = '100%'
  document.querySelector('#' + id + ' iframe').style.height = 'auto'
  document.querySelector('#' + id + ' iframe').style.borderWidth = '0px'

  function resizeIframe(obj, data) {
    // console.log(obj, data, "iframe object")
    if (data !== undefined) {
      // obj[0].style.height = obj.context.body.scrollHeight + 'px';
      obj.style.height = data.height + 'px';
      obj.style.width = '100%';
    }
  }
}