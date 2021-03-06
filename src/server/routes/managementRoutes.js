var config = require("../config/config");
var http = require("http");
var querystring = require('querystring');
var logger = require('../config/logger');

var express     = require('express');
var managementRouter = express.Router();

//importing helpers
var helpers = require('../helpers/common');
var setStatus = helpers.setStatus;
//end of helpers import

//GET http://localhost:3000/management/getunscheduled
managementRouter.get('/getunscheduled', function(request, response) {
  logger.info("ManagementRoutes: Handling GET /getunscheduled request");

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
        logger.info('StatusCode: ' + res.statusCode);
        try {
          //saving all the completed sales from the current request
          var sales = JSON.parse(output).sales;
        } catch (err) {
          logger.error('Unable to parse response as JSON', err);
          logger.debug(output);
          return response.status(res.statusCode).send();
        }

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

        var reqs = http.request(options, function(resp) {
          var output = '';
          resp.setEncoding('utf8');

          resp.on('data', function (chunk) {
            output += chunk;
          });

          resp.on('end', function() {
            logger.info('StatusCode: ' + res.statusCode);
            try {
              //saving all the completed sales from the current request
              var installers = JSON.parse(output).employees;
            } catch (err) {
              logger.error('Unable to parse response as JSON', err);
              logger.debug(output);
              return response.status(res.statusCode).send();
            }

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
          if (err.code === "ECONNREFUSED") {
            logger.error("Web service refused connection");
            return response.status(503).send();
          }
          logger.error(err);
          return response.status(503).send();
        });

        reqs.end();
      });
    });

    req.on('error', function(err) {
      if (err.code === "ECONNREFUSED") {
        logger.error("Web service refused connection");
        return response.status(503).send();
      }
      logger.error(err);
      return response.status(503).send();
    });

    req.end();
});

//GET http://localhost:3000/management/getallcustomers
managementRouter.get('/getallcustomers', function(request, response) {
  logger.info("ManagementRoutes: Handling GET /getallcustomers request");

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
        logger.info('StatusCode: ' + res.statusCode);
        try {
          //saving all the completed sales from the current request
          var obj = JSON.parse(output);
          return response.status(res.statusCode).json(obj);
        } catch (err) {
          logger.error('Unable to parse response as JSON', err);
          logger.debug(output);
          return response.status(res.statusCode).send();
        }
      });
    });

    req.on('error', function(err) {
      if (err.code === "ECONNREFUSED") {
        logger.error("Web service refused connection");
        return response.status(503).send();
      }
      logger.error(err);
      return response.status(503).send();
    });

    req.end();
});

//GET http://localhost:3000/management/getallemployees
managementRouter.get('/getallemployees', function(request, response) {
  logger.info("ManagementRoutes: Handling GET /getallemployees request");

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
        logger.info('StatusCode: ' + res.statusCode);
        try {
          //saving all the completed sales from the current request
          var obj = JSON.parse(output);
          return response.status(res.statusCode).json(obj);
        } catch (err) {
          logger.error('Unable to parse response as JSON', err);
          logger.debug(output);
          return response.status(res.statusCode).send();
        }
      });
    });

    req.on('error', function(err) {
      if (err.code === "ECONNREFUSED") {
        logger.error("Web service refused connection");
        return response.status(503).send();
      }
      logger.error(err);
      return response.status(503).send();
    });

    req.end();
});

//PUT http://localhost:3000/management/updateemployeestatus
managementRouter.put('/toggleemployeestatus', function(request, response) {
  logger.info("ManagementRoutes: Handling PUT /toggleemployeestatus request");

    //web service toggles the status, so we leave the status parameter empty
    setStatus(request.body.employeeId, "Employee", "", function(obj, statusCode) {
      logger.info("Status code: " + statusCode);
      if(obj) {
        return response.status(statusCode).json(obj);
      } else {
        return response.status(statusCode).send();
      }
    });
});

//PUT http://localhost:3000/management/updateemployee
managementRouter.put('/updateemployee', function(request, response) {
  logger.info("ManagementRoutes: Handling PUT /updateemployee request");

  var jsonObj = querystring.stringify({
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
    employeeType: request.body.employeeType
  });

  logger.debug('Sending request for id: ' + request.query.id);
  logger.debug('New data:' + jsonObj);

  var options = {
    host: config.crudIP,
    port: 8080,
    method: 'PUT',
    path: '/crud/EmployeeService/updateEmployee/' + request.query.id,
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
      logger.info("Status code: " + res.statusCode);
      return response.status(res.statusCode).send();
    });
  });

  req.on('error', function(err) {
    if (err.code === "ECONNREFUSED") {
      logger.error("Web service refused connection");
      return response.status(503).send();
    }
    logger.error(err);
    return response.status(503).send();
  });

  req.write(jsonObj);
  req.end();
});

//GET http://localhost:3000/management/getoneemployee
managementRouter.get('/getoneemployee', function(request, response) {
  logger.info("ManagementRoutes: Handling GET /getoneemployee request");

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
        logger.info('StatusCode: ' + res.statusCode);
        try {
          //saving all the completed sales from the current request
          var obj = JSON.parse(output);
          return response.status(res.statusCode).json(obj);
        } catch (err) {
          logger.error('Unable to parse response as JSON', err);
          logger.debug(output);
          return response.status(res.statusCode).send();
        }
      });
    });

    req.on('error', function(err) {
      if (err.code === "ECONNREFUSED") {
        logger.error("Web service refused connection");
        return response.status(503).send();
      }
      logger.error(err);
      return response.status(503).send();
    });

    req.end();
});

//GET http://localhost:3000/management/getonecustomer
managementRouter.get('/getonecustomer', function(request, response) {
  logger.info("ManagementRoutes: Handling GET /getonecustomer request");

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
        logger.info('StatusCode: ' + res.statusCode);
        try {
          //saving all the completed sales from the current request
          var obj = JSON.parse(output);
          return response.status(res.statusCode).json(obj);
        } catch (err) {
          logger.error('Unable to parse response as JSON', err);
          logger.debug(output);
          return response.status(res.statusCode).send();
        }
      });
    });

    req.on('error', function(err) {
      if (err.code === "ECONNREFUSED") {
        logger.error("Web service refused connection");
        return response.status(503).send();
      }
      logger.error(err);
      return response.status(503).send();
    });

    req.end();
});

//POST http://localhost:3000/management/newemployee
managementRouter.post('/newemployee', function(request, response) {
  logger.info("ManagementRoutes: Handling POST /newemployee request");

  var jsonObj = querystring.stringify({
    //employee's info
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
      logger.info('StatusCode: ' + res.statusCode);
      return response.status(res.statusCode).send();
    });

  });

  req.on('error', function(err) {
    if (err.code === "ECONNREFUSED") {
      logger.error("Web service refused connection");
      return response.status(503).send();
    }
    logger.error(err);
    return response.status(503).send();
  });

  req.write(jsonObj);
  req.end();
});

//GET http://localhost:3000/management/files
// Get files from box.com
managementRouter.get('/files', function(request, response) {
  logger.info("ManagementRoutes: Handling GET /files request");

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
  logger.info("ManagementRoutes: Handling GET /thumbnail/:id request");

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
  logger.info("ManagementRoutes: Handling GET /download/:id request");

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
