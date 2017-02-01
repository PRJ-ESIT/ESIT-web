var express = require('express');
var app = express();
var path = require('path');

//added body-parser to grab information from the POST request
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//end of body-parser

//importing helpers
var helpers = require('./src/server/helpers/common');
var webhook = helpers.webhook;
//end of helpers import

//webpack hot load
var webpack = require('webpack');
var webpackConfig = require('./config/webpack.config');
var compiler = webpack(webpackConfig);
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));
//end of webpack hot load

//starting point of our app
app.use(express.static('dist'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './src/client/index.html'));
});
//end of our app's starting point

// DocuSign webhook listener
app.post('/', bodyParser.text({
  limit: '50mb',
  type: '*/xml'
  }), function(request, response) {
    var contentType = request.headers['content-type'] || '',
      mime = contentType.split(';')[0];
    // console.log(mime);
    // console.log("webhook request body: " + JSON.stringify(request.body));
    webhook(request.body);
    response.send("Received!");
});

//importing routes
var sales = require('./src/server/routes/saleRoutes');
var installations = require('./src/server/routes/installationRoutes');
var management = require('./src/server/routes/managementRoutes');
var common = require('./src/server/routes/commonRoutes');
var auth = require('./src/server/routes/authRoutes');

//use the routes
app.use('/sales',  sales);
app.use('/installations',  installations);
app.use('/management', management);
app.use('/common', common);
app.use('/auth', auth);

app.listen(3000, function(err) {
  console.log('Listening at http://... 3000');
});
