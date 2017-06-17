const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const PORT = 8080;
const config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

const compiler = webpack(config);

const server = new WebpackDevServer(compiler);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on ${PORT}`);
});
