import React from 'react';

export default class DocuSignInstallation2 extends React.Component {
  componentDidMount() {
    let _this = this;
    let data = {
      // Installer Information
      contractorId: this.props.installation.installerId,
      installerName: this.props.installation.installerName,
      installedDate: this.props.installation.installedDate,
      envelopeId: this.props.envelopeId,
    };
    this.props.getInstallationEmbeddedUrl2(data);
  }

  render() {
    return (
      <div>Generating DocuSign Form</div>
    );
  }
}
