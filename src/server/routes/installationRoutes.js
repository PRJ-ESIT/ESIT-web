var config = require("../config/config");
var express     = require('express');
var installationRouter = express.Router();
var http = require("http");
var https = require("https");
var querystring = require('querystring');
var path = require('path');
var logger = require('../config/logger');

//importing helpers
var helpers = require('../helpers/common');
var setEnvelopeId = helpers.setEnvelopeId;
var getDocuSignUrl = helpers.getDocuSignUrl;
var setStatus = helpers.setStatus;
//end of helpers import


//GET http://localhost:3000/installations/getall
installationRouter.get('/getall', function(request, response) {
  logger.info("InstallationRoutes: Handling GET /getall request");

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/InstallationService/getAllInstallations/'  + request.query.id,
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

//GET http://localhost:3000/installations/getallscheduled
installationRouter.get('/getallscheduled', function(request, response) {
  logger.info("InstallationRoutes: Handling GET /getallscheduled request");

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/InstallationService/getScheduledInstallations/'  + request.query.id,
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

//POST http://localhost:3000/installations/create
installationRouter.post('/create', function(request, response) {
  logger.info("InstallationRoutes: Handling POST /create request");

  var jsonObj = querystring.stringify({
    //homeowner's info
    saleId: request.body.salesNumber,
    installerId: request.body.installer,
    installationDateTime: request.body.installationDateTime,
    folderId: request.body.folderId
  });

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
      return response.status(201).json(tempObj);
    });

  });

  req.on('error', function(err) {
    logger.error('error message');
    //response.send('error: ' + err.message);
  });

  req.write(jsonObj);
  req.end();
});

//GET http://localhost:3000/installations/getone
installationRouter.get('/getone', function(request, response) {
  logger.info("InstallationRoutes: Handling GET /getone request");

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

//GET http://localhost:3000/installations/closefirstiframe
installationRouter.get('/closefirstiframe', function(req, res) {
  logger.info("InstallationRoutes: Handling GET /closefirstiframe request");

  if (req.query.event == 'signing_complete') {
    setStatus(req.query.id, "Installation", "Customer Signed", function() {
      res.sendFile(path.join(__dirname + '../../../client/closeinstallationoneiframe.html'));
    });
  }
  // Handle else case when docusign form is cancelled, editClickHandler
  // See https://www.docusign.com/developer-center/explore/features/embedding-docusign#determine-action
});

//GET http://localhost:3000/installations/closesecondiframe
installationRouter.get('/closesecondiframe', function(req, res) {
  logger.info("InstallationRoutes: Handling GET /closesecondiframe request");

  if (req.query.event == 'signing_complete') {
    setStatus(req.query.id, "Installation", "Installer Signed", function() {
      res.sendFile(path.join(__dirname + '../../../client/closeinstallationtwoiframe.html'));
    });
  }
  // Handle else case when docusign form is cancelled, editClickHandler
  // See https://www.docusign.com/developer-center/explore/features/embedding-docusign#determine-action
});

//POST http://localhost:3000/installations/getinstallationembeddedurl
installationRouter.post('/getinstallationembeddedurl', function(request, response) {
  logger.info("InstallationRoutes: Handling POST /getinstallationembeddedurl request");

  var url = config.docusign.baseUrl + "/envelopes";
  var customerName = request.body.fname + ' ' +  request.body.lname;
  var returnUrl = "http://" + config.IP + "/installations/closefirstiframe?id=" + request.body.installationId;

  // Prepare the request body
  var body = JSON.stringify({
      "emailSubject": "DocuSign API call - Embedded Sending Example",
      "templateId": config.docusign.installationTemplateId,
      "templateRoles": [{ // Installer
        "email": "installer@example.com",
        "name": request.body.installerName,
        "roleName": "Installer",
        "clientUserId": request.body.contractorId,  // user-configurable
        "tabs" : {
          "textTabs" : [{
                tabLabel : "installerName",
                value : request.body.installerName,
                locked : "true"
              },
              {
                tabLabel : "installerId",
                value : request.body.contractorId,
                locked : "true"
              }
          ]
        }
      },
      { // Customer
        "email": request.body.email,
        "name": customerName,
        "roleName": "Customer",
        "clientUserId": "1001", // user-configurable
        "tabs" : {
          "textTabs" : [{
                tabLabel : "customerFName",
                value : request.body.fname,
                locked : "true"
              },
              {
                tabLabel : "customerLName",
                value : request.body.lname,
                locked : "true"
              },
              {
                tabLabel : "customerAddress",
                value : request.body.address,
                locked : "true"
              },
              {
                tabLabel : "customerUnit",
                value : request.body.unitNum,
                locked : "true"
              },
              {
                tabLabel : "customerCity",
                value : request.body.city,
                locked : "true"
              },
              {
                tabLabel : "customerPostalCode",
                value : request.body.postalCode,
                locked : "true"
              },
              {
                tabLabel : "customerHomePhone",
                value : request.body.homePhone,
                locked : "true"
              },
              {
                tabLabel : "customerCellPhone",
                value : request.body.cellPhone,
                locked : "true"
              },
              {
                tabLabel : "customerEmail",
                value : request.body.email,
                locked : "true"
              },
              {
                tabLabel : "customerEnbridgeNumber",
                value : request.body.enbridge,
                locked : "true"
              },
              {
                tabLabel : "customerSQFootage",
                value: request.body.sqft,
                locked : "true"
              },
              {
                tabLabel : "customerBathrooms",
                value: request.body.bathrooms,
                locked : "true"
              },
              {
                tabLabel : "customerNumResidents",
                value: request.body.residents,
                locked : "true"
              },
              {
                tabLabel : "customerNotes",
                value: request.body.notes,
                locked : "true"
              }
          ],
          "radioGroupTabs" : [{
            "groupName" : "customerPool",
            "radios" : [{
              "value" : "Yes",
              "selected" : request.body.pool == "1",
              locked : "true"
            },
            {
              "value" : "No",
              "selected" : request.body.pool == "0",
              locked : "true"
            }]
          },
          {
            "groupName" : "customerChecklist1",
            "radios" : [{
              "value" : "Yes",
              "selected" : request.body.checklist1 == "yes",
              locked : "true"
            },
            {
              "value" : "No",
              "selected" : request.body.checklist1 == "no",
              locked : "true"
            }]
          },
          {
            "groupName" : "customerChecklist2",
            "radios" : [{
              "value" : "Yes",
              "selected" : request.body.checklist2 == "yes",
              locked : "true"
            },
            {
              "value" : "No",
              "selected" : request.body.checklist2 == "no",
              locked : "true"
            }]
          },
          {
            "groupName" : "customerChecklist3",
            "radios" : [{
              "value" : "Yes",
              "selected" : request.body.checklist3 == "yes",
              locked : "true"
            },
            {
              "value" : "No",
              "selected" : request.body.checklist3 == "no",
              locked : "true"
            }]
          },
          {
            "groupName" : "customerChecklist4",
            "radios" : [{
              "value" : "Yes",
              "selected" : request.body.checklist4 == "yes",
              locked : "true"
            },
            {
              "value" : "No",
              "selected" : request.body.checklist4 == "no",
              locked : "true"
            }]
          },
          {
            "groupName" : "customerChecklist5",
            "radios" : [{
              "value" : "Yes",
              "selected" : request.body.checklist5 == "yes",
              locked : "true"
            },
            {
              "value" : "No",
              "selected" : request.body.checklist5 == "no",
              locked : "true"
            }]
          },
          {
            "groupName" : "customerChecklist6",
            "radios" : [{
              "value" : "Yes",
              "selected" : request.body.checklist6 == "yes",
              locked : "true"
            },
            {
              "value" : "No",
              "selected" : request.body.checklist6 == "no",
              locked : "true"
            }]
          },
          {
            "groupName" : "customerAcknowledgement1",
            "radios" : [{
              "value" : "Yes",
              "selected" : request.body.acknowledgement1 == true,
              locked : "true"
            },
            {
              "value" : "No",
              "selected" : request.body.acknowledgement1 == false,
              locked : "true"
            }]
          },
          {
            "groupName" : "customerAcknowledgement2",
            "radios" : [{
              "value" : "Yes",
              "selected" : request.body.acknowledgement2 == true,
              locked : "true"
            },
            {
              "value" : "No",
              "selected" : request.body.acknowledgement2 == false,
              locked : "true"
            }]
          },
          {
            "groupName" : "customerAcknowledgement3",
            "radios" : [{
              "value" : "Yes",
              "selected" : request.body.acknowledgement3 == true,
              locked : "true"
            },
            {
              "value" : "No",
              "selected" : request.body.acknowledgement3 == false,
              locked : "true"
            }]
          },
          {
            "groupName" : "customerAcknowledgement4",
            "radios" : [{
              "value" : "Yes",
              "selected" : request.body.acknowledgement4 == true,
              locked : "true"
            },
            {
              "value" : "No",
              "selected" : request.body.acknowledgement4 == false,
              locked : "true"
            }]
          }],
          "listTabs" : [{
            "tabLabel" : "customerProvince",
            "value" : request.body.province,
            locked : "true"
          }],
          "checkboxTabs" : [{
            "tabLabel" : "customerProgram1",
            "selected" : request.body.program1,
            locked : "true"
          },
          {
            "tabLabel" : "customerProgram2",
            "selected" : request.body.program2,
            locked : "true"
          },
          {
            "tabLabel" : "customerProgram3",
            "selected" : request.body.program3,
            locked : "true"
          },
          {
            "tabLabel" : "customerProgram4",
            "selected" : request.body.program4,
            locked : "true"
          },
          {
            "tabLabel" : "customerProgram5",
            "selected" : request.body.program5,
            locked : "true"
          },
          {
            "tabLabel" : "customerProgram6",
            "selected" : request.body.program6,
            locked : "true"
          }]
        }
      }],
      "status": "sent"
    });

  // Prepare DocuSign header
  var dsAuthHeader = JSON.stringify({
    'Username': config.docusign.email,
    'Password': config.docusign.password,
    'IntegratorKey': config.docusign.integratorKey
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

  // Note HTTPS request here
  var req = https.request(options, function(res)
    {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
        var obj = JSON.parse(output);
        var envelopeId = obj.envelopeId;

        // Save envelopeId to db
        return setEnvelopeId(envelopeId, 'InstallationService' , request.body.installationId, function() {
          // Get embedded URL
          return getDocuSignUrl(envelopeId, returnUrl, request.body.email, customerName, "1001", function(urlObj) {
            // Add envelopeId to object
            urlObj["envelopeId"] = envelopeId;
            return response.status(200).json(urlObj);
          });
        });
      });
    });

    req.on('error', function(err) {
      logger.error(err);
      response.send('error: ' + err.message);
    });

    req.write(body);
    req.end();
});

//POST http://localhost:3000/installations/getInstallationEmbeddedUrl2
installationRouter.post('/getInstallationEmbeddedUrl2', function(request, response) {
  logger.info("InstallationRoutes: Handling POST /getInstallationEmbeddedUrl2 request");

  var installerName = request.body.installerName;
  var installerId = request.body.contractorId;
  var envelopeId = request.body.envelopeId;
  var installerEmail = "installer@example.com";
  var returnUrl = "http://" + config.IP + "/installations/closesecondiframe?id=" + request.body.installationId;

  return getDocuSignUrl(envelopeId, returnUrl, installerEmail, installerName, installerId, function(urlObj) {
    return response.status(200).json(urlObj);
  });
});

module.exports = installationRouter;
