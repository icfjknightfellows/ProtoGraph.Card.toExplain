const webpack = require('webpack');
const card = require('./webpack.config.card.js');
const edit_card = require('./webpack.config.edit_card.js');

module.exports = [
  card,
  edit_card
];
