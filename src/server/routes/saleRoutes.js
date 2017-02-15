var config = require("../config/config");
var express     = require('express');
var saleRouter = express.Router();
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
var createBoxFolder = helpers.createBoxFolder;
//end of helpers import


//GET http://localhost:3000/sales/getall
saleRouter.get('/getall', function(request, response) {
  logger.info("SaleRoutes: Handling GET /getall request");

  var options = {
    host: config.crudIP,
    port: 8080,
    path: '/crud/SaleService/getAllSales/'  + request.query.id,
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

//GET http://localhost:3000/sales/getone
saleRouter.get('/getone', function(request, response) {
  logger.info("SaleRoutes: Handling GET /getone request");

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

//POST http://localhost:3000/sales/create
saleRouter.post('/create', function(request, response) {
  logger.info("SaleRoutes: Handling POST /create request");

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
    salesRepId: request.body.salesRepId,
  });

  createSale(jsonObj, function (saleObj) {
    if(saleObj) {
      return response.status(201).json(saleObj);
    } else {
      return response.status(400);
    }
  })
});

//helper function to create a sale
var createSale = function (requestBody, callback) {
  logger.info('in createSale()');

  // Create sale
  var options = {
    host: config.crudIP,
    port: 8080,
    method: 'POST',
    path: '/crud/SaleService/createNewSale',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(requestBody)
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
      callback(saleObj);
    });
  });

  req.on('error', function(err) {
    logger.error('error message');
    //response.send('error: ' + err.message);
  });

  req.write(requestBody);
  req.end();
}

//GET http://localhost:3000/sales/closesaleiframe
saleRouter.get('/closesaleiframe', function(req, res) {
  logger.info("SaleRoutes: Handling GET /closesaleiframe request");

  if (req.query.event == 'signing_complete') {
    setStatus(req.query.id, "Sale", "Signed", function() {
      createBoxFolder(req.query.name + '_' + req.query.id, req.query.id, function() {
        res.sendFile(path.join(__dirname + '../../../client/closesaleiframe.html'));
      });
    });
  }
  // Handle else case when docusign form is cancelled, editClickHandler
  // See https://www.docusign.com/developer-center/explore/features/embedding-docusign#determine-action
});

//POST http://localhost:3000/sales/getsaleembeddedurl
saleRouter.post('/getsaleembeddedurl', function(request, response) {
  logger.info("SaleRoutes: Handling POST /getsaleembeddedurl request");

  var url = config.docusign.baseUrl + "/envelopes";
  var recipientName = request.body.fname + ' ' +  request.body.lname;
  var formattedName = recipientName.replace(' ', '_');
  var returnUrl = "http://" + config.IP + "/sales/closesaleiframe?id=" + request.body.salesNumber +
    "&name=" + formattedName;
  // Prepare the request body
  var body = JSON.stringify({
      "emailSubject": "DocuSign API call - Embedded Sending Example",
      "templateId": config.docusign.saleTemplateId,
      "templateRoles": [{
        "email": request.body.email,
        "name": recipientName,
        "roleName": "Customer",
        "clientUserId": "1001", // user-configurable
        "tabs" : {
          "textTabs" : [{
               tabLabel : "customerSalesNumber",
               value : request.body.salesNumber,
               locked : "true"
              },
              {
                tabLabel : "customerFName",
                value : request.body.fname,
                locked : "true"
              },
              {
                tabLabel : "PADFName",
                value : request.body.fname,
                locked : "true"
              },
              {
                tabLabel : "customerLName",
                value : request.body.lname,
                locked : "true"
              },
              {
                tabLabel : "PADLName",
                value : request.body.lname,
                locked : "true"
              },
              {
                tabLabel : "customerAddress",
                value : request.body.address,
                locked : "true"
              },
              {
                tabLabel : "PADAddress",
                value : request.body.address,
                locked : "true"
              },
              {
                tabLabel : "PADAddress",
                value : request.body.address,
                locked : "true"
              },
              {
                tabLabel : "PADUnit",
                value : request.body.unitNum,
                locked : "true"
              },
              {
                tabLabel : "customerCity",
                value : request.body.city,
                locked : "true"
              },
              {
                tabLabel : "PADCity",
                value : request.body.city,
                locked : "true"
              },
              {
                tabLabel : "customerPostalCode",
                value : request.body.postalCode,
                locked : "true"
              },
              {
                tabLabel : "PADPostalCode",
                value : request.body.postalCode,
                locked : "true"
              },
              {
                tabLabel : "customerHomePhone",
                value : request.body.homePhone,
                locked : "true"
              },
              {
                tabLabel : "PADHomePhone",
                value : request.body.homePhone,
                locked : "true"
              },
              {
                tabLabel : "customerCellPhone",
                value : request.body.cellPhone,
                locked : "true"
              },
              {
                tabLabel : "PADCellPhone",
                value : request.body.cellPhone,
                locked : "true"
              },
              {
                tabLabel : "customerEnbridgeNumber",
                value : request.body.enbridge,
                locked : "true"
              },
              {
                tabLabel : "customerInstallationDate",
                value : request.body.installationDate,
                locked : "true"
              },
              {
                tabLabel : "customerInstallationTime",
                value : request.body.installationTime,
                locked : "true"
              },
              {
                tabLabel : "customerNotes",
                value : request.body.notes,
                locked : "true"
              },
              {
                tabLabel : "customerSalesRepId",
                value : request.body.salesRepId,
                locked : "true"
              },
              {
                tabLabel : "customerSalesRepName",
                value: request.body.salesRepName,
                locked : "true"
              }
          ],
          "radioGroupTabs" : [{
            "groupName" : "customerProgram",
            "radios" : [{
              "value" : "1",
              "selected" : request.body.programType == "1",
              locked : "true"
            },
            {
              "value" : "2",
              "selected" : request.body.programType == "2",
              locked : "true"
            },
            {
              "value" : "3",
              "selected" : request.body.programType == "3",
              locked : "true"
            }]
          }],
          "listTabs" : [{
            "tabLabel" : "customerProvince",
            "value" : request.body.province,
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
        return setEnvelopeId(envelopeId, 'SaleService' , request.body.salesNumber, function() {
          // Get embedded URL
          return getDocuSignUrl(envelopeId, returnUrl, request.body.email, recipientName, "1001", function(urlObj) {
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

module.exports = saleRouter;
