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

//Logger
var logger = require('./src/server/config/logger');

//no hot load in production
if(process.env.NODE_ENV === "development") {
  //webpack hot load
  var webpack = require('webpack');
  var webpackConfig = require('./config/webpack.development.config');
  var compiler = webpack(webpackConfig);
  app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
  //end of webpack hot load
}

//middleware to serve gzip to the client, production only
if(process.env.NODE_ENV === "production") {
  app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });
}

//starting point of our app
app.use(express.static('dist'));
app.get('/', function(req, res) {
  logger.info("Main route: Handling GET / request");
  res.sendFile(path.join(__dirname, './src/client/index.html'));
});
//end of our app's starting point

// DocuSign webhook listener
app.post('/', bodyParser.text({
  limit: '50mb',
  type: '*/xml'
  }), function(request, response) {

    logger.info('Main route: Handling POST / request');
    var contentType = request.headers['content-type'] || '',
      mime = contentType.split(';')[0];

    webhook(request.body);
    response.send('Received!');
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
  logger.info('Listening at http://... 3000');
});
