var config = require("../config/config");
var http = require("http");
var querystring = require('querystring');
var formidable = require('formidable');
var fs = require('fs');

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

//GET http://localhost:3000/common/dashboard
commonRouter.get('/dashboard', function(request, response) {

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
          var sales = JSON.parse(output).sales;
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

                  // Get some of that sweet, sweet data!
                  config.adminAPIClient.users.get(config.adminAPIClient.CURRENT_USER_ID, null, function(err, currentUser) {
                    if(err) throw err;
                    console.log('Hello, ' + currentUser.name + '!');
                  });

                  // adminAPIClient.folders.getItems('0', null, function(err, response) {
                  //   console.log(err);
                  //   if(err) throw err;
                  //   console.log(response);
                  // });

                  response.status(200).json(entry);
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

//POST http://localhost:3000/common/upload
commonRouter.post('/upload', function(request, response) {
  var form = new formidable.IncomingForm();
  // Allow upload multiple files in a single request
  form.multiples = true;
  var files = {}, fields = {};

  form
    .on('error', function(err) {
      console.error(err);
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
      console.log('-> post done');
      // response.writeHead(200, {'content-type': 'text/plain'});
      // console.log('received files:\n\n '+util.inspect(files));
      // console.log('received fields:\n\n '+util.inspect(fields));

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

            // Once the upload completes, delete the temporary file from disk
            fs.unlink(file.path + "", function() {
              cb(err);
            });
          } else {
            console.log("file uploaded");
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
              setStatus(fields.id, fields.type, "Paid", function(obj) {
                return response.status(200).json({success: true, obj: obj});
              });
            } else if(fields.type == "Installation") {
              setStatus(fields.id, fields.type, "Documented", function(obj) {
                return response.status(200).json({success: true, installation: obj.installation});
              });
            }
      });
    });
  form.parse(request);
});

module.exports = commonRouter;
