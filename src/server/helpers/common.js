var http = require("http");
var https = require("https");
var querystring = require('querystring');
var config = require("../config/config");
const async = require('async');
const xmlParser = require('xml2js');

//*************************//
//START OF DOCUSIGN HELPERS//
//*************************//
var setEnvelopeId = function(envelopeId, service, id, callback) {
  var jsonObj = querystring.stringify({
    // Envelope Id
    envelopeId: envelopeId
  });
  console.log("to send: " + jsonObj);
  var options = {
    host: config.crudIP,
    port: 8080,
    method: 'PUT',
    path: '/crud/' + service + '/setEnvelopeId/' + id,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(jsonObj)
    }
  };
 console.log(options);
  var req = http.request(options, function(res) {
    var output = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        output += chunk;
    });

    res.on('end', function() {
      console.log("output: " + output);
      var obj = JSON.parse(output);
      console.log(service + " added: " + JSON.stringify(obj));
      callback(obj);
    });

  });

  req.on('error', function(err) {
    console.log('error message');
    //response.send('error: ' + err.message);
  });

  req.write(jsonObj);
  req.end();
}

var getDocuSignUrl = function(envelopeId, returnUrl, email, userName, clientUserId, callback) {
  // Prepare DocuSign header
  var dsAuthHeader = JSON.stringify({
    'Username': config.docusign.email,
    'Password': config.docusign.password,
    'IntegratorKey': config.docusign.integratorKey
  });

  // Get embedded URL
  var url = config.docusign.baseUrl + "/envelopes/" + envelopeId + "/views/recipient";

  // Prepare the request body
  var body = JSON.stringify({
      "returnUrl": returnUrl,
      "authenticationMethod": "email",
      "email": email,
      "userName": userName,
      "clientUserId": clientUserId, // must match clientUserId in step 2!
    });

  var options = {
    hostname: config.docusign.hostname,
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      'X-DocuSign-Authentication' : dsAuthHeader
    }
  };

  // Inner request
  var req = https.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
        var innerObj = JSON.parse(output);
        callback(innerObj);
      });
    });

    req.on('error', function(err) {
      response.send('error: ' + err.message);
    });

    req.write(body);
    req.end();
}

//***********************//
//END OF DOCUSIGN HELPERS//
//***********************//


//Webhook, retrieves docs from DocuSign and pushes them to Box
var webhook = function(data) {
  // An incoming call from the DocuSign platform
  // See the Connect guide:
  // https://www.docusign.com/sites/default/files/connect-guide_0.pdf
  var self = this;
  // console.log("Data received from DS Connect: " + JSON.stringify(data));
  xmlParser.parseString(data, function(err, xml) {
    if (err || !xml) {
      throw new Error("Cannot parse Connect XML results: " + err);
    }

    console.log("Connect data parsed!");
    var envelopeStatus = xml.DocuSignEnvelopeInformation.EnvelopeStatus;
    var envelopeId = envelopeStatus[0].EnvelopeID[0];
    // var userName = envelopeStatus[0].RecipientStatuses[0].RecipientStatus[0].UserName[0];
    // var userId = envelopeStatus[0].RecipientStatuses[0].RecipientStatus[0].ClientUserId[0];
    // var customerName = userName.replace(" ", "_");
    //
    // // console.log(envelopeStatus);
    // console.log(envelopeId);
    // console.log(userName);
    // console.log(userId);
    // console.log(customerName);

    // var timeGenerated = envelopeStatus[0].TimeGenerated[0];

    // Store the file. Create directories as needed
    // Some systems might still not like files or directories to start
    // with numbers.
    // So we prefix the envelope ids with E and the timestamps with T
    // var filesDir = path.resolve(__filename + "/../../" + self.xmlFileDir);
    // console.log("filesDir=" + filesDir);
    // if (!fs.existsSync(filesDir)) {
    //  if (!fs.mkdirSync(filesDir, 0755))
    //    console.log("Cannot create folder: " + filesDir);
    // }
    // var envelopeDir = path.resolve(__filename + "/../../" + self.xmlFileDir + "E" + envelopeId);
    // console.log("envelopeDir=" + envelopeDir);
    // if (!fs.existsSync(envelopeDir)) {
    //  if (!fs.mkdirSync(envelopeDir, 0755))
    //    console.log("Cannot create folder: " + envelopeDir);
    // }
    // var filename = path.resolve(__filename + "/../../" + self.xmlFileDir + "E" + envelopeId + "/T" + timeGenerated.replace(/:/g, '_') + ".xml");
    // console.log("filename=" + filename);
    // try {
    //  fs.writeFileSync(filename, data);
    // } catch (ex) {
    //  // Couldn't write the file! Alert the humans!
    //  console.error("!!!!!! PROBLEM DocuSign Webhook: Couldn't store xml " + filename + " !");
    //  return;
    // }
    //
    // // log the event
    // console.log("DocuSign Webhook: created " + filename);

    if ("Completed" === envelopeStatus[0].Status[0]) {
      var fields = envelopeStatus[0].RecipientStatuses[0].RecipientStatus[0].FormData[0].xfdf[0].fields[0];
      var userName = envelopeStatus[0].RecipientStatuses[0].RecipientStatus[0].UserName[0];
      var userId = envelopeStatus[0].RecipientStatuses[0].RecipientStatus[0].ClientUserId[0];
      var customerName = userName.replace(" ", "_");

      // console.log(envelopeStatus);
      console.log(envelopeId);
      console.log(userName);
      console.log(userId);
      console.log(customerName);

      // Loop through the DocumentPDFs element, storing each document.
      nodeList = xml.DocuSignEnvelopeInformation.DocumentPDFs[0].DocumentPDF;
      var i = 0;
      async.forEachSeries(nodeList, function(node, cb2) {
        var pdf = node;
        filename = envelopeId + "_doc_" + (pdf.DocumentID ? pdf.DocumentID[0] : "") + ".pdf";
        // var folderId = "0"; // Root folder id
        // var fullFilename = path.resolve(__filename + "/../../" + self.xmlFileDir + "E" + envelopeId + "/" + filename);
        // console.log('file' + ':' + fullFilename);

        try{
          // fs.writeFile(fullFilename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, data) {
          //  if (err) {
          //    console.log('Error writing file: ' + err);
          //    callback(err);
          //  } else {
          //    console.log("File saved");
          //    console.log("envelopeId: " + envelopeId);
          //    // var doc = fs.readFileSync(filename);
          //    // var folderId = '15078518730';
          //    // Attempt to save to box
          //    // box.folders.get(envelopeId, null, function(err, response) {
          //    //  if(err) {
          //    //    console.log('folder not found');
          //    //    console.log('folders err: ' + err);
          //    //    box.folders.create('15078518730', envelopeId, function(err, response) {
          //    //      if(err) {
          //    //        console.log('could not create folder');
          //    //        box.files.uploadFile(folderId, "E" + envelopeId + "_" + filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, response) {
          //    //          console.log('uploadFile: ' + i);
          //    //          if(err) {
          //    //            console.log('box err:' + err);
          //    //            callback(err);
          //    //          }
          //    //          console.log(response);
          //    //          callback();
          //    //        });
          //    //      } else {
          //    //        console.log('folder was created: ' + JSON.stringify(response));
          //    //        box.files.uploadFile(response.id, "E" + envelopeId + "_" + filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, response) {
          //    //          console.log('uploadFile: ' + filename);
          //    //          if(err) {
          //    //            console.log('box err:' + err);
          //    //            callback(err);
          //    //          }
          //    //          console.log(response);
          //    //          callback();
          //    //        });
          //    //      }
          //    //    });
          //    //  } else {
          //    //    console.log('folder was already created');
          //    //    box.files.uploadFile(envelopeId, "E" + envelopeId + "_" + filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, response) {
          //    //      console.log('uploadFile: ' + i);
          //    //      if(err) {
          //    //        console.log('box err:' + err);
          //    //        callback(err);
          //    //      }
          //    //      console.log(response);
          //    //      callback();
          //    //    });
          //    //  // console.log('folders response: ' + response);
          //    //  }
          //    // });
          //  }
          // });
          // envelopeId = envelopeId.replace(/[-]/g, "");
          getFolderIdByEnvelopeId(envelopeId, function(obj) {
            // Check if envelopeId exists - if not it's an offline case
            if(obj.salesNumber != "0") {
              console.log("envelopeId found");
              if(obj.folderId == "0") {
                console.log("folderId not found");
                // Box folder doesn't exist - new sale - online scenario
                // Create box folder
                createBoxFolder(customerName + "_" + userId, obj.salesNumber, function(folderId) {
                  console.log("folderId: ", folderId);
                  uploadFile(folderId, filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(error, message) {
                    console.log("file uploaded");
                    if (error) {
                      console.log("error uploading file", JSON.stringify(error));
                      return cb2(error);
                    } else {
                      console.log("file uploaded successfully", JSON.stringify(message));
                      return cb2();
                    }
                  });
                });
              } else {
                console.log("folderId found - a file has already been uploaded to the folder");
                uploadFile(obj.folderId, filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(error, message) {
                  console.log("file uploaded");
                  if (error) {
                    console.log("error uploading file", JSON.stringify(error));
                    return cb2(error);
                  } else {
                    console.log("file uploaded successfully", JSON.stringify(message));
                    return cb2();
                  }
                });
              }
            } else {
              console.log("envelopeId not found, offline scenario");
              uploadFile(obj.folderId, filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(error, message) {
                console.log("file uploaded");
                if (error) {
                  console.log("error uploading file", JSON.stringify(error));
                  return cb2(error);
                } else {
                  console.log("file uploaded successfully", JSON.stringify(message));
                  return cb2();
                }
              });
            }
            // adminAPIClient.files.uploadFile(folderId, "E" + envelopeId + "_" + filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, response) {
            //  console.log('uploadFile: ' + i++);
            //  if(err) {
            //    console.log('box err:' + err);
            //    callback(err);
            //  }
            //  console.log(response);
            //  callback();
            // });
            console.log(obj);
          });
        } catch (ex) {
          // Couldn't write the file! Alert the humans!
          console.error("!!!!!! PROBLEM DocuSign Webhook: Couldn't upload pdf " + filename + " !");
          return;
        }
      }, function(err) {
          if(err) {
            // One of the iterations produced an error.
            // All processing will now stop.
            console.log('A file failed to process');
          } else {
          console.log('All files have been processed successfully');
          }
      });
    }
    return;
  });
}

//generic helper used to change statuses for both Sale and Installation objects
var setStatus = function(id, type, status, callback) {
  var jsonObj = querystring.stringify({
    // Status
    status: status
  });
  console.log("to send: " + jsonObj);
  var options = {
    host: config.crudIP,
    port: 8080,
    method: 'PUT',
    path: '/crud/' + type + 'Service/setStatus/' + id,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(jsonObj)
    }
  };
 console.log(options);
  var req = http.request(options, function(res) {
    var output = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        output += chunk;
    });

    res.on('end', function() {
      // console.log("output: " + output);
      var obj = JSON.parse(output);
      // console.log("added: " + JSON.stringify(obj));
      callback(obj);
    });

  });

  req.on('error', function(err) {
    console.log('error message');
    //response.send('error: ' + err.message);
  });

  req.write(jsonObj);
  req.end();
}

//********************//
//START OF BOX HELPERS//
//********************//
var createBoxFolder = function(name, id, callback) {
  config.adminAPIClient.folders.create('0', name, function(err, response) {
    if(err) {
      console.log('could not create folder');
      console.log(JSON.stringify(err));
      // Default to root folder
      callback('0');
    } else {
      console.log('folder was created: ' + JSON.stringify(response.id));
      // Return fodler id
      setFolderId(response.id, id, function(folderId){
        callback(response.id);
      });
    }
  });
}

var setFolderId = function(folderId, id, callback) {
  var jsonObj = querystring.stringify({
    // Envelope Id
    folderId: folderId
  });
  console.log("to send: " + jsonObj);
  var options = {
    host: config.crudIP,
    port: 8080,
    method: 'PUT',
    path: '/crud/SaleService/setFolderId/' + id,
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
      console.log("output: " + output);
      var obj = JSON.parse(output);
      console.log("added: " + JSON.stringify(obj));
      callback(obj);
    });

  });

  req.on('error', function(err) {
    console.log('error message');
    //response.send('error: ' + err.message);
  });

  req.write(jsonObj);
  req.end();
}

var uploadFile = function(folderId, filename, file, callback) {
  config.adminAPIClient.files.uploadFile(folderId, filename, file, function(err, response) {
    console.log('attempt to uploadFile: ');
    if(err) {
      console.log('box err:' + JSON.stringify(err));
      callback(err, null);
    } else {  
      console.log(JSON.stringify(response));
      callback(null, response);
    }
  });
}

var getFolderIdByEnvelopeId = function(envelopeId, callback) {
  console.log("to send: " + envelopeId);
  var options = {
    host: config.crudIP,
    port: 8080,
    method: 'GET',
    path: '/crud/SaleService/getFolderIdByEnvelopeId/' + envelopeId,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = http.request(options, function(res) {
    var output = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        output += chunk;
    });

    res.on('end', function() {
      // console.log("output: " + output);
      var obj = JSON.parse(output).sale;
      console.log("folderId found: " + JSON.stringify(obj));
      callback(obj);
      // var folderId = obj.folderId;
      // adminAPIClient.files.uploadFile(folderId, "E" + envelopeId + "_" + filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, response) {
      //   console.log('uploadFile');
      //   if(err) {
      //     console.log('box err:' + err);
      //     callback(err);
      //   }
      //  console.log("uploaded successfully");
      //   // console.log(response);
      //   callback(folderId);
      // });
    });

  });

  req.on('error', function(err) {
    console.log('error message');
    //response.send('error: ' + err.message);
  });

  req.end();
}

//********************//
//END OF BOX HELPERS//
//********************//

module.exports = { setEnvelopeId, getDocuSignUrl, setStatus, createBoxFolder, uploadFile, webhook };
