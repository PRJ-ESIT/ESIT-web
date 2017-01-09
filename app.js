var config = require("./config/config");
const xmlParser = require('xml2js');
var express = require('express');
var app = express();
var path = require('path');
var http = require("http");
var https = require("https");
const async = require('async');
//we need this to build our POST request
var querystring = require('querystring');
//added body-parser to grab information from the POST request
var bodyParser = require('body-parser');
// Initialize Box SDK
var BoxSDK = require('box-node-sdk');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//end of body-parser
var fs = require('fs');
// Box.com vars
var CLIENT_ID = 'fmoj564gllo2g90aykbejymeyr8g73am',
	CLIENT_SECRET = 'aRRX4hOWmiKsSlltaiAW2BHZ5eNAYFDK',
	PUBLIC_KEY_ID = 'awvfchd0',
	PRIVATE_KEY_PATH = './private_key.pem',
	PRIVATE_KEY_PASSPHRASE = 'esit2016',
	ENTERPRISE_ID = '1365346',
  APP_USER_ID = '306146146';

var sdk = new BoxSDK({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  appAuth: {
    keyID: PUBLIC_KEY_ID,
    privateKey: fs.readFileSync(path.resolve(__dirname, PRIVATE_KEY_PATH)),
    passphrase: PRIVATE_KEY_PASSPHRASE
  }
});
// console.log(sdk);
// console.log(path.resolve(__dirname, PRIVATE_KEY_PATH));

var adminAPIClient = sdk.getAppAuthClient('enterprise', ENTERPRISE_ID);
// console.log(box.users);
// DocuSign base url
var baseUrl;

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

app.get('/closesaleiframe', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/client/closesaleiframe.html'));
});

app.get('/closeinstallationoneiframe', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/client/closeinstallationoneiframe.html'));
});

app.get('/closeinstallationtwoiframe', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/client/closeinstallationtwoiframe.html'));
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

                  // Get some of that sweet, sweet data!
                  adminAPIClient.users.get(adminAPIClient.CURRENT_USER_ID, null, function(err, currentUser) {
                    if(err) throw err;
                    console.log('Hello, ' + currentUser.name + '!');
                  });

                  adminAPIClient.folders.getItems('0', null, function(err, response) {
                    console.log(err);
                    if(err) throw err;
                    console.log(response);
                  });

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
  // // Create sale
  // var jsonObj = querystring.stringify({
  //   //homeowner's info
  //   fname: request.body.fname,
  //   lname: request.body.lname,
  //   address: request.body.address,
  //   unitNum: request.body.unitNum,
  //   city: request.body.city,
  //   province: request.body.province,
  //   postalCode: request.body.postalCode,
  //   enbridge: request.body.enbridge,
  //   email: request.body.email,
  //   homePhone: request.body.homePhone,
  //   cellPhone: request.body.cellPhone,
  //   //program type
  //   programType: request.body.programType,
  //   //Installation & Delivery
  //   installationDateTime: request.body.installationDateTime,
  //   notes: request.body.notes,
	//
  //   //the rest
  //   dateSigned: request.body.dateSigned,
  //   salesRepId: request.body.salesRepId,
  // });
	// console.log(jsonObj);
  // var options = {
  //   host: config.crudIP,
  //   port: 8080,
  //   method: 'POST',
  //   path: '/crud/SaleService/createNewSale',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Content-Length': Buffer.byteLength(jsonObj)
  //   }
  // };
	//
  // var req = http.request(options, function(res) {
  //   var output = '';
  //   res.setEncoding('utf8');
  //   res.on('data', function (chunk) {
  //       output += chunk;
  //   });
	//
  //   res.on('end', function() {
  //     var saleObj = JSON.parse(output);
  //     console.log(saleObj);
  //     return response.status(201).json(saleObj);
  //   });
  // });
	//
  // req.on('error', function(err) {
  //   console.log('error message');
  //   //response.send('error: ' + err.message);
  // });
	//
  // req.write(jsonObj);
  // req.end();
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

//POST http://localhost:3000/newinstallation
app.post('/newinstallation', function(request, response) {
  var jsonObj = querystring.stringify({
    //homeowner's info
    saleId: request.body.salesNumber,
    installerId: request.body.installer,
    installationDateTime: request.body.installationDateTime
  });
  // console.log(jsonObj);
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

app.post('/getembeddedurl', function(request, response) {
  var url = config.docusign.baseUrl + "/envelopes";
  var recipientName = request.body.fname + ' ' +  request.body.lname;
  var returnUrl = "http://" + config.IP + "/closesaleiframe";
  // Prepare the request body
  var body = JSON.stringify({
      "emailSubject": "DocuSign API call - Embedded Sending Example",
      "templateId": config.docusign.saleTemplateId,
      "templateRoles": [{
        "email": request.body.email,
        "name": recipientName,
        "roleName": "Customer",
        "clientUserId": "1001",	// user-configurable
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
				return setEnvelopeId(envelopeId, request.body.salesNumber, function() {
					// Get embedded URL
	        return getDocuSignUrl(envelopeId, returnUrl, request.body.email, recipientName, "1001", function(urlObj) {
	          return response.status(200).json(urlObj);
	        });
				});
      });
    });

    req.on('error', function(err) {
      console.log(err);
      response.send('error: ' + err.message);
    });

    req.write(body);
    req.end();
});

app.post('/getInstallationEmbeddedUrl', function(request, response) {
  var url = config.docusign.baseUrl + "/envelopes";
  var customerName = request.body.fname + ' ' +  request.body.lname;
  var returnUrl = "http://" + config.IP + "/closeinstallationoneiframe";

  // Prepare the request body
  var body = JSON.stringify({
      "emailSubject": "DocuSign API call - Embedded Sending Example",
      "templateId": config.docusign.installationTemplateId,
      "templateRoles": [{ // Installer
        "email": "installer@example.com",
        "name": request.body.installerName,
        "roleName": "Installer",
        "clientUserId": request.body.contractorId,	// user-configurable
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
        "clientUserId": "1001",	// user-configurable
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
				console.log(envelopeId);
        return getDocuSignUrl(envelopeId, returnUrl, request.body.email, customerName, "1001", function(urlObj) {
          // Add envelopeId to object
          urlObj["envelopeId"] = envelopeId;
          return response.status(200).json(urlObj);
        });
      });
    });

    req.on('error', function(err) {
      console.log(err);
      response.send('error: ' + err.message);
    });

    req.write(body);
    req.end();
});

app.post('/getInstallationEmbeddedUrl2', function(request, response) {
  var installerName = request.body.installerName;
  var installerId = request.body.contractorId;
  var envelopeId = request.body.envelopeId;
  var installerEmail = "installer@example.com";
  var returnUrl = "http://" + config.IP + "/closeinstallationtwoiframe";

  return getDocuSignUrl(envelopeId, returnUrl, installerEmail, installerName, installerId, function(urlObj) {
    return response.status(200).json(urlObj);
  });
});

// DocuSign webhook listener
app.post('/', bodyParser.text({
	limit: '50mb',
	type: '*/xml'
	}), function(request, response) {
		var contentType = request.headers['content-type'] || '',
			mime = contentType.split(';')[0];
		// console.log(mime);
		// console.log("webhook request body: " + JSON.stringify(request.body));
		webhook(request.body);
		response.send("Received!");
});

var createSale = function (requestBody, callback) {
	// Create sale
	console.log(requestBody);
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
      console.log(saleObj);
			callback(saleObj);
    });
  });

  req.on('error', function(err) {
    console.log('error message');
    //response.send('error: ' + err.message);
  });

  req.write(requestBody);
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
      "clientUserId": clientUserId,	// must match clientUserId in step 2!
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

var createBoxFolder = function(name, callback) {
  adminAPIClient.folders.create('0', name, function(err, response) {
		if(err) {
			console.log('could not create folder');
      // Default to root folder
      callback('0');
		} else {
			console.log('folder was created: ' + JSON.stringify(response));
      // Return fodler id
      callback(response.id);
		}
	});
}

var setEnvelopeId = function(envelopeId, saleId, callback) {
	var jsonObj = querystring.stringify({
    // Envelope Id
    envelopeId: envelopeId
  });
	console.log("to send: " + jsonObj);
  var options = {
    host: config.crudIP,
    port: 8080,
    method: 'PUT',
    path: '/crud/SaleService/setEnvelopeId/' + saleId,
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

var getFolderIdByEnvelopeId = function(envelopeId, pdf, filename, callback) {
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
			console.log("envelopeId/folderId found: " + JSON.stringify(obj));
			callback(obj);
      // var folderId = obj.folderId;
      // adminAPIClient.files.uploadFile(folderId, "E" + envelopeId + "_" + filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, response) {
      //   console.log('uploadFile');
      //   if(err) {
      //     console.log('box err:' + err);
      //     callback(err);
      //   }
			// 	console.log("uploaded successfully");
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

var uploadFile = function(folderId, filename, file, callback) {
	adminAPIClient.files.uploadFile(folderId, filename, file, function(err, response) {
		console.log('attempt to uploadFile: ');
		if(err) {
			console.log('box err:' + err);
			callback("0");
		}
		console.log(JSON.stringify(response));
		callback(response);
	});
}

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
		// var customerFName = envelopeStatus[0].RecipientStatuses[0].RecipientStatus[0].FormData[0].xfdf[0].fields[0].field["customerFName"].value;
		var customerFName = "James";
		var customerLName = "Johnson";
		var saleId = "20";

		// console.log(envelopeStatus);
		console.log(envelopeId);
		// var timeGenerated = envelopeStatus[0].TimeGenerated[0];

		// Store the file. Create directories as needed
		// Some systems might still not like files or directories to start
		// with numbers.
		// So we prefix the envelope ids with E and the timestamps with T
		// var filesDir = path.resolve(__filename + "/../../" + self.xmlFileDir);
		// console.log("filesDir=" + filesDir);
		// if (!fs.existsSync(filesDir)) {
		// 	if (!fs.mkdirSync(filesDir, 0755))
		// 		console.log("Cannot create folder: " + filesDir);
		// }
		// var envelopeDir = path.resolve(__filename + "/../../" + self.xmlFileDir + "E" + envelopeId);
		// console.log("envelopeDir=" + envelopeDir);
		// if (!fs.existsSync(envelopeDir)) {
		// 	if (!fs.mkdirSync(envelopeDir, 0755))
		// 		console.log("Cannot create folder: " + envelopeDir);
		// }
		// var filename = path.resolve(__filename + "/../../" + self.xmlFileDir + "E" + envelopeId + "/T" + timeGenerated.replace(/:/g, '_') + ".xml");
		// console.log("filename=" + filename);
		// try {
		// 	fs.writeFileSync(filename, data);
		// } catch (ex) {
		// 	// Couldn't write the file! Alert the humans!
		// 	console.error("!!!!!! PROBLEM DocuSign Webhook: Couldn't store xml " + filename + " !");
		// 	return;
		// }
		//
		// // log the event
		// console.log("DocuSign Webhook: created " + filename);

		if ("Completed" === envelopeStatus[0].Status[0]) {
			// Loop through the DocumentPDFs element, storing each document.
			nodeList = xml.DocuSignEnvelopeInformation.DocumentPDFs[0].DocumentPDF;
			var i = 0;
			async.forEachSeries(nodeList, function(node, cb) {
				var pdf = node;
				filename = "doc_" + (pdf.DocumentID ? pdf.DocumentID[0] : "") + ".pdf";
				// var folderId = "0"; // Root folder id
				// var fullFilename = path.resolve(__filename + "/../../" + self.xmlFileDir + "E" + envelopeId + "/" + filename);
				// console.log('file' + ':' + fullFilename);

				try{
					// fs.writeFile(fullFilename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, data) {
					// 	if (err) {
					// 		console.log('Error writing file: ' + err);
					// 		callback(err);
					// 	} else {
					// 		console.log("File saved");
					// 		console.log("envelopeId: " + envelopeId);
					// 		// var doc = fs.readFileSync(filename);
					// 		// var folderId = '15078518730';
					// 		// Attempt to save to box
					// 		// box.folders.get(envelopeId, null, function(err, response) {
					// 		// 	if(err) {
					// 		// 		console.log('folder not found');
					// 		// 		console.log('folders err: ' + err);
					// 		// 		box.folders.create('15078518730', envelopeId, function(err, response) {
					// 		// 			if(err) {
					// 		// 				console.log('could not create folder');
					// 		// 				box.files.uploadFile(folderId, "E" + envelopeId + "_" + filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, response) {
					// 		// 					console.log('uploadFile: ' + i);
					// 		// 					if(err) {
					// 		// 						console.log('box err:' + err);
					// 		// 						callback(err);
					// 		// 					}
					// 		// 					console.log(response);
					// 		// 					callback();
					// 		// 				});
					// 		// 			} else {
					// 		// 				console.log('folder was created: ' + JSON.stringify(response));
					// 		// 				box.files.uploadFile(response.id, "E" + envelopeId + "_" + filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, response) {
					// 		// 					console.log('uploadFile: ' + filename);
					// 		// 					if(err) {
					// 		// 						console.log('box err:' + err);
					// 		// 						callback(err);
					// 		// 					}
					// 		// 					console.log(response);
					// 		// 					callback();
					// 		// 				});
					// 		// 			}
					// 		// 		});
					// 		// 	} else {
					// 		// 		console.log('folder was already created');
					// 		// 		box.files.uploadFile(envelopeId, "E" + envelopeId + "_" + filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, response) {
					// 		// 			console.log('uploadFile: ' + i);
					// 		// 			if(err) {
					// 		// 				console.log('box err:' + err);
					// 		// 				callback(err);
					// 		// 			}
					// 		// 			console.log(response);
					// 		// 			callback();
					// 		// 		});
					// 		// 	// console.log('folders response: ' + response);
					// 		// 	}
					// 		// });
					// 	}
					// });
          // envelopeId = envelopeId.replace(/[-]/g, "");
					getFolderIdByEnvelopeId(envelopeId, pdf, filename, function(obj) {
						// Check if envelopeId exists - if not it's an offline case
						if(obj.envelopeId != "0") {
							console.log("envelopeId found");
							if(obj.folderId == "0") {
								console.log("folderId not found");
								// Box folder doesn't exist - new sale - online scenario
								// Create box folder
								createBoxFolder(customerFName + "_" + customerLName + "_" + saleId + "_", function (folderId) {
									console.log("folderId: ", folderId);
									uploadFile(id, filename, new Buffer(pdf.PDFBytes[0], 'base64'),function(message) {
										console.log("file uploaded");
										if (message == "0") {
											console.log("error uploading file", JSON.stringify(message));
											cb(error);
										} else {
											console.log("file uploaded successfully", JSON.stringify(message));
											cb();
										}
									});
								});
							} else {
								console.log("folderId found - installation scenario");
							}
						} else {
							console.log("envelopeId not found, offline scenario");
						}
						// adminAPIClient.files.uploadFile(folderId, "E" + envelopeId + "_" + filename, new Buffer(pdf.PDFBytes[0], 'base64'), function(err, response) {
						// 	console.log('uploadFile: ' + i++);
						// 	if(err) {
						// 		console.log('box err:' + err);
						// 		callback(err);
						// 	}
						// 	console.log(response);
						// 	callback();
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

app.listen(3000, function(err) {
  console.log('Listening at http://... 3000');
});
