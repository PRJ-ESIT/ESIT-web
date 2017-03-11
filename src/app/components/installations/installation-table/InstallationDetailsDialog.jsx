import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

export default class InstallationDetailsDialog extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const actions = [
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.props.handleClose()}}
          />,
          <FlatButton
            label="Edit"
            primary={true}
            onTouchTap={(e) => {
              e.preventDefault();
              this.props.editClickHandler("edit", this.props.installationDetails.installationNumber, "editInstallation")
            }}
          />,
        ];

    return (
        <Dialog
          title="Installation Details"
          actions={actions}
          modal={true}
          open={true}
        >
          {this.props.installationDetails ?
            <div>
              <strong>First Name</strong>: {this.props.installationDetails.customerFirstName} <br />
              <strong>Last Name</strong>: {this.props.installationDetails.customerLastName} <br />
              <strong>Address</strong>: {this.props.installationDetails.address} <br />
              <strong>Unit</strong>: {this.props.installationDetails.unit} <br />
              <strong>City</strong>: {this.props.installationDetails.city} <br />
              <strong>Province</strong>: {this.props.installationDetails.province} <br />
              <strong>Postal Code</strong>: {this.props.installationDetails.postalCode} <br />
              <strong>Enbridge Gas #</strong>: {this.props.installationDetails.enbridgeNum} <br />
              <strong>Email</strong>: {this.props.installationDetails.email} <br />
              <strong>Home Phone</strong>: {this.props.installationDetails.homePhone} <br />
              <strong>Cell Phone</strong>: {this.props.installationDetails.cellPhone} <br />
              <strong>Square Footage</strong>: {this.props.installationDetails.sqFootage} <br />
              <strong>Bathrooms</strong>: {this.props.installationDetails.bathrooms} <br />
              <strong>Residents</strong>: {this.props.installationDetails.residents} <br />
              <strong>Pool</strong>: {this.props.installationDetails.hasPool == 1 ? 'Yes' : 'No'} <br />
              <strong>Program</strong>: {this.props.installationDetails.product} <br />
              <strong>Installer Name</strong>: {this.props.installationDetails.installerName} <br />
              <strong>Installation Date</strong>: {this.props.installationDetails.installationDate} <br />
            </div> : null}
        </Dialog>
    );
  }
}
