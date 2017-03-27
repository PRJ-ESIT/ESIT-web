var config = require("../config/config");
var http = require("http");
var querystring = require('querystring');
var logger = require('../config/logger');

var express     = require('express');
var authRouter = express.Router();


//POST http://localhost:3000/auth/login
authRouter.post('/login', function(request, response) {
  logger.info("AuthRoutes: Handling POST Login request");

  var jsonObj = querystring.stringify({
    email: request.body.email,
    password: request.body.password,
  });
  var options = {
    host: config.crudIP,
    port: 8080,
    method: 'POST',
    path: '/auth/AuthService/login',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(jsonObj)
    }
  };

  var req = http.request(options, function(res) {
    var output = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        output += chunk;
    });

    res.on('end', function() {
      logger.info('StatusCode: ' + res.statusCode);
      if(res.statusCode == 200) {
        try {
          var token = JSON.parse(output);
          return response.status(res.statusCode).json(token);
        } catch (err) {
          logger.error('Unable to parse response as JSON', err);
          logger.debug(output);
          return response.status(res.statusCode).send();
        }
      } else {
        return response.status(res.statusCode).send();
      }
    });
  });

  req.on('error', function(err) {
    logger.error('error message');
    //response.send('error: ' + err.message);
  });

  req.write(jsonObj);
  req.end();
});

module.exports = authRouter;
