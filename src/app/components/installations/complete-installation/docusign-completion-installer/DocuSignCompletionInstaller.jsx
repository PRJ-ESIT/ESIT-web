import React from 'react';
import {CircularProgress} from 'material-ui';

export default class DocuSignCompletionInstaller extends React.Component {
  componentDidMount() {
    let _this = this;
    let data = {
      // Installer Information
      contractorId: this.props.installation.installerId,
      installerName: this.props.installation.installerName,
      installerEmail: this.props.installation.installerEmail,
      installedDate: this.props.installation.installedDate,
      installationId: this.props.installation.installationId,
      envelopeId: this.props.envelopeId ? this.props.envelopeId : this.props.installation.envelopeId,
    };

    this.props.getInstallationEmbeddedUrl2(data);
  }

  render() {
    return (
      <div>
        <div className="mid">
          <p style={{margin: 'auto'}}>Generating DocuSign Form</p>
          <br />
          <CircularProgress
            size={80}
            thickness={5}
            style={{margin: 'auto'}}
          />
        </div>
      </div>
    );
  }
}
