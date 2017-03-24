var http = require("http");
var https = require("https");
var querystring = require('querystring');
var config = require("../config/config");
const async = require('async');
const xmlParser = require('xml2js');
var logger = require('../config/logger');

//*************************//
//START OF DOCUSIGN HELPERS//
//*************************//
var setEnvelopeId = function(envelopeId, service, id, callback) {
  logger.info('In setEnvelopeId');

  var jsonObj = querystring.stringify({
    // Envelope Id
    envelopeId: envelopeId
  });

  logger.info("setEnvelopeId, to send: " + jsonObj);

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

  var req = http.request(options, function(res) {
    var output = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      output += chunk;
    });

    res.on('end', function() {
      logger.info('StatusCode: ' + res.statusCode);
      try {
        var obj = JSON.parse(output);
        logger.info('setEnvelopeId, onend: ' + service + " added: " + JSON.stringify(obj));
        callback(obj);
      } catch (err) {
        logger.error('Unable to parse response as JSON', err);
        logger.debug(output);
      }
    });
  });

  req.on('error', function(err) {
    logger.error('error message');
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
        logger.info('StatusCode: ' + res.statusCode);
        try {
          var innerObj = JSON.parse(output);
          callback(innerObj, res.statusCode);
        } catch (err) {
          logger.error('Unable to parse response as JSON', err);
          logger.debug(output);
          callback(undefined, res.statusCode);
        }
      });
    });

    req.on('error', function(err) {
      logger.error(err);
      callback(undefined, res.statusCode);
    });

    req.write(body);
    req.end();
}

//***********************//
//END OF DOCUSIGN HELPERS//
//***********************//


//Webhook, retrieves docs from DocuSign and pushes them to Box
var webhook = function(data) {
  logger.info('in webhook()');

  // An incoming call from the DocuSign platform
  // See the Connect guide:
  // https://www.docusign.com/sites/default/files/connect-guide_0.pdf

  xmlParser.parseString(data, function(err, xml) {
    if (err || !xml) {
      throw new Error("Cannot parse Connect XML results: " + err);
    }

    logger.debug('webhook: Connect data parsed!');

    var envelopeStatus = xml.DocuSignEnvelopeInformation.EnvelopeStatus;
    var envelopeId = envelopeStatus[0].EnvelopeID[0];

    if (envelopeStatus[0].Status[0] === "Completed") {
      logger.debug('webhook: envelopeStatus === Completed');

      var fields = envelopeStatus[0].RecipientStatuses[0].RecipientStatus[0].FormData[0].xfdf[0].fields[0];
      var userName = envelopeStatus[0].RecipientStatuses[0].RecipientStatus[0].UserName[0];
      var userId = envelopeStatus[0].RecipientStatuses[0].RecipientStatus[0].ClientUserId[0];
      var customerName = userName.replace(" ", "_");

      // Loop through the DocumentPDFs element, storing each document.
      nodeList = xml.DocuSignEnvelopeInformation.DocumentPDFs[0].DocumentPDF;
      async.forEachSeries(nodeList, function(node, cb2) {
        var pdf = node;
        filename = envelopeId + "_doc_" + (pdf.DocumentID ? pdf.DocumentID[0] : "") + ".pdf";

        try{
          getFolderIdByEnvelopeId(envelopeId, function(obj) {
            // Check if envelopeId exists - if not it's an offline case
            if(obj.salesNumber != "0") {
              logger.debug("envelopeId found");
              if(obj.folderId == "0") {
                logger.debug("folderId not found");
                // Box folder doesn't exist - new sale - online scenario
                // Create box folder
                createBoxFolder(customerName + "_" + userId, obj.salesNumber, function(folderId) {
                  logger.debug("folderId: ", folderId);
                  uploadFile(folderId, filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(error, message) {
                    if (error) {
                      logger.error("error uploading file", JSON.stringify(error));
                      return cb2(error);
                    } else {
                      logger.info("file uploaded successfully", JSON.stringify(message));
                      return cb2();
                    }
                  });
                });
              } else {
                logger.debug("folderId found - a file has already been uploaded to the folder");
                uploadFile(obj.folderId, filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(error, message) {
                  if (error) {
                    logger.error("error uploading file", JSON.stringify(error));
                    return cb2(error);
                  } else {
                    logger.info("file uploaded successfully", JSON.stringify(message));
                    return cb2();
                  }
                });
              }
            } else {
              logger.info("envelopeId not found, offline scenario");

              uploadFile(obj.folderId, filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(error, message) {
                if (error) {
                  logger.error("error uploading file", JSON.stringify(error));
                  return cb2(error);
                } else {
                  logger.info("file uploaded successfully", JSON.stringify(message));
                  return cb2();
                }
              });
            }
          });
        } catch (ex) {
          // Couldn't write the file! Alert the humans!
          logger.error("!!!!!! PROBLEM DocuSign Webhook: Couldn't upload pdf " + filename + " !");
          return;
        }
      }, function(err) {
          if(err) {
            // One of the iterations produced an error.
            // All processing will now stop.
            logger.error('A file failed to process');
          } else {
            logger.info('All files have been processed successfully');
          }
      });
    }
    return;
  });
}

//generic helper used to change statuses for both Sale and Installation objects
//returns a statusCode with a JSON object in a case of success
var setStatus = function(id, type, status, callback) {
  logger.info('in setStatus()');

  var jsonObj = querystring.stringify({
    // Status
    status: status
  });

  logger.debug("setStatus, to send: " + jsonObj);

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

  var req = http.request(options, function(res) {
    var output = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        output += chunk;
    });

    res.on('end', function() {
      logger.info("Status code: " + statusCode);
      try {
        var obj = JSON.parse(output);
        callback(obj, res.statusCode);
      } catch (err) {
        logger.error('Unable to parse response as JSON', err);
        logger.debug(output);
        callback(false, res.statusCode);
      }
    });
  });

  req.on('error', function(err) {
    callback(false, 503);
  });

  req.write(jsonObj);
  req.end();
}

//********************//
//START OF BOX HELPERS//
//********************//
var createBoxFolder = function(name, id, callback) {
  logger.info('in createBoxFolder()');

  config.adminAPIClient.folders.create('0', name, function(err, response) {
    if(err) {
      logger.error('could not create folder');
      logger.error(JSON.stringify(err));

      // Default to root folder
      callback('0');
    } else {
      logger.debug('folder was created: ' + JSON.stringify(response.id));
      // Return fodler id
      setFolderId(response.id, id, function(folderId){
        callback(response.id);
      });
    }
  });
}

var setFolderId = function(folderId, id, callback) {
  logger.info('in setFolderId()');

  var jsonObj = querystring.stringify({
    // Envelope Id
    folderId: folderId
  });

  logger.debug("setFolderId, to send: " + jsonObj);

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
      logger.info('StatusCode: ' + res.statusCode);
      try {
        var obj = JSON.parse(output);
        logger.debug("setFolderId, onend: added " + JSON.stringify(obj));
        callback(obj);
      } catch (err) {
        logger.error('Unable to parse response as JSON', err);
        logger.debug(output);

      }
    });

  });

  req.on('error', function(err) {
    logger.error('error message');
    //response.send('error: ' + err.message);
  });

  req.write(jsonObj);
  req.end();
}

var uploadFile = function(folderId, filename, file, callback) {
  logger.info('in uploadFile()');

  config.adminAPIClient.files.uploadFile(folderId, filename, file, function(err, response) {
    logger.debug('attempt to uploadFile: ');

    if(err) {
      logger.error('box err:' + JSON.stringify(err));
      callback(err, null);
    } else {
      callback(null, response);
    }
  });
}

var getFolderIdByEnvelopeId = function(envelopeId, callback) {
  logger.info("getFolderIdByEnvelopeId: to send: " + envelopeId);

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
      logger.info('StatusCode: ' + res.statusCode);
      try {
        var obj = JSON.parse(output).sale;
        logger.debug("folderId found: " + JSON.stringify(obj));
        callback(obj);
      } catch (err) {
        logger.error('Unable to parse response as JSON', err);
        logger.debug(output);
      }
    });

  });

  req.on('error', function(err) {
    logger.error('error message');
    //response.send('error: ' + err.message);
  });

  req.end();
}

//********************//
//END OF BOX HELPERS//
//********************//

module.exports = { setEnvelopeId, getDocuSignUrl, setStatus, createBoxFolder, uploadFile, webhook };
