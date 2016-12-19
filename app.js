var config = require("./config/config");

var express = require('express');
var app = express();
var path = require('path');
var http = require("http");
//we need this to build our POST request
var querystring = require('querystring');
//added body-parser to grab information from the POST request
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//end of body-parser

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


app.get('/dashboard', function(request, response) {

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/SaleService/getAllSales/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
          var sales = JSON.parse(output).sales;
          //done with the sales, now retrieving the Installations
          var options = {
            host: config.crudIP,
            port: 8080,
            path: '/crud/InstallationService/getAllInstallations/',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          };

          var installRequest = http.request(options, function(resp)
            {
              var output = '';
              resp.setEncoding('utf8');

              resp.on('data', function (chunk) {
                output += chunk;
              });

              resp.on('end', function() {
                  var installations = JSON.parse(output).installations;
                  var entry = {
                    data: {
                      'sales': sales,
                      'installations': installations
                    }
                  };
                  return response.status(200).json(entry);
              });
            });

            installRequest.on('error', function(err) {
                //response.send('error: ' + err.message);
            });

            installRequest.end();
      });
    });

    req.on('error', function(err) {
        //response.send('error: ' + err.message);
    });

    req.end();
});


app.get('/allsales', function(request, response) {

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/SaleService/getAllSales/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
          var sales = JSON.parse(output);
          return response.status(200).json(sales);
      });
    });

    req.on('error', function(err) {
        //response.send('error: ' + err.message);
    });

    req.end();
});

app.get('/scheduleinstallationinfo', function(request, response) {

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/SaleService/getAllCompletedSales/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
        //saving all the completed sales from the current request
        var sales = JSON.parse(output).sales;

        //fetching all the installers from crud
        var options = {
          host: config.crudIP,
          port: 8080,
          path: '/crud/EmployeeService/getEmployeesByRole/installer',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        var reqs = http.request(options, function(resp)
          {
            var output = '';
            resp.setEncoding('utf8');

            resp.on('data', function (chunk) {
              output += chunk;
            });

            resp.on('end', function() {
                var installers = JSON.parse(output).employees;

                var entry = {
                  data: {
                    'sales': sales,
                    'installers': installers
                  }
                };
                return response.status(200).json(entry);
            });
          });

          reqs.on('error', function(err) {
              //response.send('error: ' + err.message);
          });

          reqs.end();
      });
    });

    req.on('error', function(err) {
        //response.send('error: ' + err.message);
    });

    req.end();
});

app.get('/allinstallations', function(request, response) {

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/InstallationService/getAllInstallations/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
          var obj = JSON.parse(output);
          return response.status(200).json(obj);
      });
    });

    req.on('error', function(err) {
        //response.send('error: ' + err.message);
    });

    req.end();
});

app.get('/scheduledinstallations', function(request, response) {

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/InstallationService/getScheduledInstallations/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
          var obj = JSON.parse(output);
          return response.status(200).json(obj);
      });
    });

    req.on('error', function(err) {
        //response.send('error: ' + err.message);
    });

    req.end();
});

app.get('/allcustomers', function(request, response) {

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/CustomerService/getAllCustomers/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
          var obj = JSON.parse(output);
          return response.status(200).json(obj);
      });
    });

    req.on('error', function(err) {
        //response.send('error: ' + err.message);
    });

    req.end();
});


app.get('/allemployees', function(request, response) {

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/EmployeeService/getAllEmployees/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
          var obj = JSON.parse(output);
          return response.status(200).json(obj);
      });
    });

    req.on('error', function(err) {
        //response.send('error: ' + err.message);
    });

    req.end();
});

app.get('/allemployeesbyrole', function(request, response) {

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/EmployeeService/getEmployeesByRole/' + request.query.role,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
          var obj = JSON.parse(output);
          return response.status(200).json(obj);
      });
    });

    req.on('error', function(err) {
        //response.send('error: ' + err.message);
    });

    req.end();
});

app.get('/existingsale', function(request, response) {
  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/SaleService/getSaleById/' + request.query.id,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
          var obj = JSON.parse(output);
          return response.status(200).json(obj);
      });
    });

    req.on('error', function(err) {
        //response.send('error: ' + err.message);
    });

    req.end();
});

app.get('/getoneemployee', function(request, response) {
  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/EmployeeService/getEmployeeById/' + request.query.id,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
          var obj = JSON.parse(output);
          return response.status(200).json(obj);
      });
    });

    req.on('error', function(err) {
        //response.send('error: ' + err.message);
    });

    req.end();
});

//POST http://localhost:3000/newsale
app.post('/newsale', function(request, response) {
  var jsonObj = querystring.stringify({
    //homeowner's info
    fname: request.body.fname,
    lname: request.body.lname,
    address: request.body.address,
    unitNum: request.body.unitNum,
    city: request.body.city,
    province: request.body.province,
    postalCode: request.body.postalCode,
    enbridge: request.body.enbridge,
    email: request.body.email,
    homePhone: request.body.homePhone,
    cellPhone: request.body.cellPhone,
    //program type
    programType: request.body.programType,
    //Installation & Delivery
    installationDateTime: request.body.installationDateTime,
    notes: request.body.notes,

    //the rest
    dateSigned: request.body.dateSigned,
    salesRepId: request.body.salesRepId
  });

  var options = {
    host: config.crudIP,
    port: 8080,
    method: 'POST',
    path: '/crud/SaleService/createNewSale',
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
      var saleObj = JSON.parse(output);
      return response.status(201).json(saleObj);
    });

  });

  req.on('error', function(err) {
    console.log('error message');
    //response.send('error: ' + err.message);
  });

  req.write(jsonObj);
  req.end();
});

//POST http://localhost:3000/newinstallation
app.post('/newinstallation', function(request, response) {
  var jsonObj = querystring.stringify({
    //homeowner's info
    saleId: request.body.salesNumber,
    installerId: request.body.installer,
    installationDateTime: request.body.installationDateTime
  });
  console.log(jsonObj);
  var options = {
    host: config.crudIP,
    port: 8080,
    method: 'POST',
    path: '/crud/InstallationService/createNewInstallation',
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
      return response.status(200).json(tempObj);
    });

  });

  req.on('error', function(err) {
    console.log('error message');
    //response.send('error: ' + err.message);
  });

  req.write(jsonObj);
  req.end();
});

//POST http://localhost:3000/newemployee
app.post('/newemployee', function(request, response) {
  var jsonObj = querystring.stringify({
    //homeowner's info
    fname: request.body.fname,
    lname: request.body.lname,
    street: request.body.address,
    unitNum: request.body.unitNum,
    city: request.body.city,
    province: request.body.province,
    postalCode: request.body.postalCode,
    email: request.body.email,
    homePhone: request.body.homePhone,
    cellPhone: request.body.cellPhone,
    password: request.body.password,
    hireDate: request.body.hireDate,
    isActive: request.body.isActive,
    employeeType: request.body.employeeType
  });

  var options = {
    host: config.crudIP,
    port: 8080,
    method: 'POST',
    path: '/crud/EmployeeService/createNewEmployee',
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
      return response.status(200).json(tempObj);
    });

  });

  req.on('error', function(err) {
    console.log('error message');
    //response.send('error: ' + err.message);
  });

  req.write(jsonObj);
  req.end();
});

app.get('/getoneinstallation', function(request, response) {
  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/InstallationService/getInstallationById/' + request.query.id,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
          var obj = JSON.parse(output);
          return response.status(200).json(obj);
      });
    });

    req.on('error', function(err) {
        //response.send('error: ' + err.message);
    });

    req.end();
});

app.listen(3000, function(err) {
  console.log('Listening at http://... 3000');
});
