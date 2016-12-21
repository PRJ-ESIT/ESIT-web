import React from 'react';
import { IP } from '../../../../config/config.js';

export default class DocuSignInstallation extends React.Component {
  componentDidMount() {
    console.log("HEY, I got the installation");
    console.log(this.props);
    let _this = this;
    let data = {
      // Homeowner Information
      fname: this.props.installation.customerFirstName,
      lname: this.props.installation.customerLastName, //customer table
      address: this.props.installation.address, //address table
      unitNum: this.props.installation.unitNum,//address table
      city: this.props.installation.city,//address table
      province: this.props.installation.province,//address table
      postalCode: this.props.installation.postalCode.replace(/\s/g,''),//address table
      enbridge: this.props.installation.enbridge, //customer table
      email: this.props.installation.email, //customer table
      homePhone: this.props.installation.homePhone, //customer table
      cellPhone: this.props.installation.cellPhone, //customer table
      sqft: this.props.installation.sqft,
      bathrooms: this.props.installation.bathrooms,
      residents: this.props.installation.residents,
      pool: this.props.installation.pool,

      // Program Installation
      // TODO

      // Installation Checklist
      // TODO

      // Customer Acknowledgement
      // TODO

      // The rest
      notes: this.props.installation.notes,
      contractorId: this.props.installation.installerId,
      installerName: this.props.installation.installerName,
      installedDate: this.props.installation.installedDate,
    };
console.log(data);
    this.props.getInstallationEmbeddedUrl(data);

    // var httpRequest = new XMLHttpRequest();
    // let _this = this;
    // httpRequest.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //     let url = JSON.parse(httpRequest.responseText).url;
    //     console.log(url);
    //     // _this.setState({
    //     //   docuSignURL: url,
    //     // });
    //   }
    // };
    //
    // httpRequest.open('POST', "http://" + IP + "/getInstallationEmbeddedUrl", true);
    // httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // httpRequest.send(JSON.stringify(data));
  }

  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}
