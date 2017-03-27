var config = require("../config/config");
var http = require("http");
var querystring = require('querystring');
var formidable = require('formidable');
var fs = require('fs');
var logger = require('../config/logger');

var express     = require('express');
var commonRouter = express.Router();

//importing helpers
var helpers = require('../helpers/common');
var uploadFile = helpers.uploadFile;
var setStatus = helpers.setStatus;
//end of helpers import
const async = require('async');

//GET http://localhost:3000/common/allemployeesbyrole
commonRouter.get('/allemployeesbyrole', function(request, response) {
  logger.info("CommonRoutes: Handling GET /allemployeesbyrole request");

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
        logger.info('StatusCode: ' + res.statusCode);
        try {
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

//GET http://localhost:3000/common/dashboard
commonRouter.get('/dashboard', function(request, response) {
  logger.info("CommonRoutes: Handling GET /dashboard request");

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/SaleService/getAllSales/' + request.query.id,
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
          var sales = JSON.parse(output).sales;
        } catch (err) {
          logger.error('Unable to parse response as JSON', err);
          logger.debug(output);
          return response.status(res.statusCode).send();
        }

        //done with the sales, now retrieving the Installations
        var options = {
          host: config.crudIP,
          port: 8080,
          path: '/crud/InstallationService/getAllInstallations/' + request.query.id,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        var installRequest = http.request(options, function(resp) {
          var output = '';
          resp.setEncoding('utf8');
          resp.on('data', function (chunk) {
            output += chunk;
          });
          resp.on('end', function() {
            logger.info('StatusCode: ' + resp.statusCode);
            try {
              var installations = JSON.parse(output).installations;
            } catch (err) {
              logger.error('Unable to parse response as JSON', err);
              logger.debug(output);
              return response.status(res.statusCode).send();
            }

            var entry = {
              data: {
                'sales': sales,
                'installations': installations
              }
            };

            // Get some of that sweet, sweet data!
            config.adminAPIClient.users.get(config.adminAPIClient.CURRENT_USER_ID, null, function(err, currentUser) {
              if(err) throw err;
              logger.debug('Hello, ' + currentUser.name + '!');
            });

            return response.status(200).json(entry);
          });
        });

        installRequest.on('error', function(err) {
          if (err.code === "ECONNREFUSED") {
            logger.error("Web service refused connection");
            return response.status(503).send();
          }
          logger.error(err);
          return response.status(503).send();
        });
        installRequest.end();
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

//POST http://localhost:3000/common/upload
commonRouter.post('/upload', function(request, response) {
  logger.info("CommonRoutes: Handling POST /upload request");

  var form = new formidable.IncomingForm();
  // Allow upload multiple files in a single request
  form.multiples = true;
  var files = {}, fields = {};

  form
    .on('error', function(err) {
      logger.error(err);
      response.writeHead(500, {'content-type': 'text/plain'});
      response.end('error:\n\n'+ err);
    })
    .on('file', function(name, file) {
      files[file.name] = file;
    })
    .on('field', function(name, field) {
      fields[name] = field;
    })
    .on('end', function() {
      logger.debug('/upload -> post completed');

      // Loop through all files
      async.forEach(Object.keys(files), function(file_name, cb) {
        var file = files[file_name];

        var fileStream = fs.createReadStream(file.path + "");
        var filename;

        if (fields.type == "Sale") {
          filename = "cheque_saleid_" + fields.id + ".jpg";
        } else if (fields.type == "Installation") {
          filename = "installation_id_" + fields.id + "_" + file.name;
        }

        uploadFile(fields.folderId, filename, fileStream, function(err, res) {
          if (err) {
            logger.error('File was not uploaded');
            // Once the upload completes, delete the temporary file from disk
            fs.unlink(file.path + "", function() {
              cb(err);
            });
          } else {
            logger.debug("file uploaded");
            // Once the upload completes, delete the temporary file from disk
            fs.unlink(file.path + "", function() {
              cb();
            });
          }
        });
      }, function(err) { // Fired at the end, once all the files have been uploaded
            if(err) {
              return response.end(err);
            }

            if(fields.type == "Sale") {
              setStatus(fields.id, fields.type, "Paid", function(obj, statusCode) {
                if(obj) {
                  return response.status(statusCode).json({success: true, obj: obj});
                } else {
                  return response.status(statusCode).send();
                }
              });
            } else if(fields.type == "Installation") {
              setStatus(fields.id, fields.type, "Documented", function(obj, statusCode) {
                if(obj) {
                  return response.status(statusCode).json({success: true, installation: obj.installation});
                } else {
                  return response.status(statusCode).send();
                }
              });
            }
      });
    });
  form.parse(request);
});

module.exports = commonRouter;
