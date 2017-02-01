var config = require("../config/config");
var http = require("http");
var querystring = require('querystring');

var express     = require('express');
var managementRouter = express.Router();

//GET http://localhost:3000/management/getunscheduled
managementRouter.get('/getunscheduled', function(request, response) {

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

//GET http://localhost:3000/management/getallcustomers
managementRouter.get('/getallcustomers', function(request, response) {

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

//GET http://localhost:3000/management/getallemployees
managementRouter.get('/getallemployees', function(request, response) {

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

//GET http://localhost:3000/management/getoneemployee
managementRouter.get('/getoneemployee', function(request, response) {
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

//GET http://localhost:3000/management/getonecustomer
managementRouter.get('/getonecustomer', function(request, response) {
  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/CustomerService/getCustomerById/' + request.query.id,
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

//POST http://localhost:3000/management/newemployee
managementRouter.post('/newemployee', function(request, response) {
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
      return response.status(201).json(tempObj);
    });

  });

  req.on('error', function(err) {
    console.log('error message');
    //response.send('error: ' + err.message);
  });

  req.write(jsonObj);
  req.end();
});

//GET http://localhost:3000/management/files
// Get files from box.com
managementRouter.get('/files', function(request, response) {
  // Get the user's files in their root folder.  Box uses folder ID "0" to
  // represent the user's root folder, where we'll be putting all their files.
  config.adminAPIClient.folders.getItems('0', null, function(err, data) {
    if(err) {
      return response.status(404);
    }

    return response.status(200).json({
      files: data ? data.entries: [],
    });
  });
});

//GET http://localhost:3000/management/thumbnail/:id
// Get box thumbnail
managementRouter.get('/thumbnail/:id', function(req, res) {
  // API call to get the thumbnail for a file.  This can return either the
  // specific thumbnail image or a URL pointing to a placeholder thumbnail.
  config.adminAPIClient.files.getThumbnail(req.params.id, {}, function(err, data) {

    if (err) {
      res.status(err.statusCode || 500).json(err);
      return;
    }

    if (data.file) {
      // We got the thumbnail file, so send the image bytes back
      res.send(data.file);
    } else if (data.location) {
      // We got a placeholder URL, so redirect the user there
      res.redirect(data.location);
    } else {
      // Something went wrong, so return a 500
      res.status(500).end();
    }
  });
});

//GET http://localhost:3000/management/download/:id
// Download box.com file
managementRouter.get('/download/:id', function(req, res) {
  // API call to get the temporary download URL for the user's file
  config.adminAPIClient.files.getDownloadURL(req.params.id, null, function(err, url) {

    if (err) {
      res.redirect('/dashboard');
      return;
    }

    // Redirect to the download URL, which will cause the user's browser to
    // start the download
    res.redirect(url);
  });
});

module.exports = managementRouter;
