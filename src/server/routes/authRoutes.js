var config = require("../config/config");
var http = require("http");
var querystring = require('querystring');

var express     = require('express');
var authRouter = express.Router();

//POST http://localhost:3000/auth/login
authRouter.post('/login', function(request, response) {
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
      //#TODO remove tempObj and forward the SaleNumber from crud instead
      var tempObj = {'a': 'b'};
      if(res.statusCode == 400) {
        return response.status(400).json(tempObj);
      } else if(res.statusCode == 200) {
        var token = JSON.parse(output);
        return response.status(200).json(token);
      }
    });
  });

  req.on('error', function(err) {
    console.log('error message');
    //response.send('error: ' + err.message);
  });

  req.write(jsonObj);
  req.end();
});

module.exports = authRouter;
