var express = require('express');
var app = express();
var path = require('path');

//webpack hot load
var webpack = require('webpack');
var webpackConfig = require('./config/webpack.config');
var compiler = webpack(webpackConfig);
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));
//end of webpack hot load

app.use(express.static('dist'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './src/client/index.html'));
});

app.listen(3000, function(err) {
  console.log('Listening at http://... 3000');
}); 
