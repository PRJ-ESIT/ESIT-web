var docusign = {
  var email = "esit.project.prj@gmail.com",				// your account email
  	  password = "esitproject2016",			// your account password
      integratorKey = "0edc98fa-39d4-46f2-baeb-09e7a0711e8c"; // your account Integrator Key (found on Preferences -> API page)

  getBaseUrl() {
    var url = "https://demo.docusign.net/restapi/v2/login_information";
		var body = "";	// no request body for login api call

		// set request url, method, body, and headers
		var options = initializeRequest(url, "GET", body, email, password);

		// send the request...
		http.request(options, function(err, res, body) {
			if(!parseResponseBody(err, res, body)) {
				return;
			}
			return JSON.parse(body).loginAccounts[0].baseUrl;
		});
  }
}
