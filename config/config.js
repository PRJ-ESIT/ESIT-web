var IP = "192.168.224.128:3000"
var crudIP = "192.168.224.128"
var authIP = "192.168.224.128"
var docMgrIP = "192.168.224.128"

var docusign = {
  email: "esit.project.prj@gmail.com",				// your account email
  password: "esitproject2016",			// your account password
  integratorKey: "0edc98fa-39d4-46f2-baeb-09e7a0711e8c", // your account Integrator Key (found on Preferences -> API page)
  saleTemplateId: "2065d181-3836-4b1e-829a-89133e49a444", // id of sales form template
  hostname: "demo.docusign.net",
  baseUrl: "/restapi/v2/accounts/1848997"
};

module.exports =  { IP, crudIP, authIP, docMgrIP, docusign };
