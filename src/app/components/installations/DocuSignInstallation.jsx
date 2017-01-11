import React from 'react';

export default class DocuSignInstallation extends React.Component {
  componentDidMount() {
    let _this = this;
    let data = {
      installationId: this.props.installation.installationId,
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
      program1: this.props.installation.program1,
      program2: this.props.installation.program2,
      program3: this.props.installation.program3,
      program4: this.props.installation.program4,
      program5: this.props.installation.program5,
      program6: this.props.installation.program6,

      // Installation Checklist
      checklist1: this.props.installation.checklist1,
      checklist2: this.props.installation.checklist2,
      checklist3: this.props.installation.checklist3,
      checklist4: this.props.installation.checklist4,
      checklist5: this.props.installation.checklist5,
      checklist6: this.props.installation.checklist6,

      // Customer Acknowledgement
      acknowledgement1: this.props.installation.acknowledgement1,
      acknowledgement2: this.props.installation.acknowledgement2,
      acknowledgement3: this.props.installation.acknowledgement3,
      acknowledgement4: this.props.installation.acknowledgement4,

      // The rest
      notes: this.props.installation.notes,
      contractorId: this.props.installation.installerId,
      installerName: this.props.installation.installerName,
      installedDate: this.props.installation.installedDate,
    };
    this.props.getInstallationEmbeddedUrl(data);
  }

  render() {
    return (
      <div>
        Generating DocuSign Form
      </div>
    );
  }
}
