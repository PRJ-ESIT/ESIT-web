var IP = "myvmlab.senecacollege.ca:5521"
var crudIP = "10.10.192.145"
var authIP = "10.10.192.145"
var docMgrIP = "10.10.192.145"

var docusign = {
  email: "esit.project.prj@gmail.com",				// your account email
  password: "esitproject2016",			// your account password
  integratorKey: "0edc98fa-39d4-46f2-baeb-09e7a0711e8c", // your account Integrator Key (found on Preferences -> API page)
  saleTemplateId: "2065d181-3836-4b1e-829a-89133e49a444", // id of sales form template
  installationTemplateId: "e20e2449-551e-49f1-8000-42b1cbf6d057", // Id of installation form template
  hostname: "demo.docusign.net",
  baseUrl: "/restapi/v2/accounts/1848997"
};

module.exports =  { IP, crudIP, authIP, docMgrIP, docusign };
