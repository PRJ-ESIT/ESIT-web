var BoxSDK = require('box-node-sdk');
var fs = require('fs');
var path = require('path');

// Box.com vars
var CLIENT_ID = 'fmoj564gllo2g90aykbejymeyr8g73am',
  CLIENT_SECRET = 'aRRX4hOWmiKsSlltaiAW2BHZ5eNAYFDK',
  PUBLIC_KEY_ID = 'awvfchd0',
  PRIVATE_KEY_PATH = '../../../private_key.pem',
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

var adminAPIClient = sdk.getAppAuthClient('enterprise', ENTERPRISE_ID);

//internal IP addresses
var crudIP = "10.10.192.145"
var authIP = "10.10.192.145"
var docMgrIP = "10.10.192.145"
//domain name
var IP = "myvmlab.senecacollege.ca:5521"

//docuSign information
var docusign = {
  email: "esit.project.prj@gmail.com",        // your account email
  password: "esitproject2016",      // your account password
  integratorKey: "0edc98fa-39d4-46f2-baeb-09e7a0711e8c", // your account Integrator Key (found on Preferences -> API page)
  saleTemplateId: "2065d181-3836-4b1e-829a-89133e49a444", // id of sales form template
  installationTemplateId: "e20e2449-551e-49f1-8000-42b1cbf6d057", // Id of installation form template
  hostname: "demo.docusign.net",
  baseUrl: "/restapi/v2/accounts/1848997"
};

module.exports = { adminAPIClient, crudIP, authIP, docMgrIP, docusign, IP };
