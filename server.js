const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.dev.config');

const env = process.env.NODE_ENV || 'development';
const port = parseInt(process.env.PORT, 10) || 8000;

if (env === 'production') {
  config = require('./webpack.config');
}

var app = express();
app.set('port', port);

var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('./client/build/app.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'app.js'));
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port);