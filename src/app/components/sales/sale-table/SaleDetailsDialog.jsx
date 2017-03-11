import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

export default class SaleDetailsDialog extends React.Component {

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
              this.props.editClickHandler("edit", this.props.saleDetails.salesNumber, "editSale")
            }}
          />,
        ];

    return (
        <Dialog
          title="Sale Details"
          actions={actions}
          modal={true}
          open={true}
        >
          {this.props.saleDetails ?
            <div>
              <strong>First Name</strong>: {this.props.saleDetails.firstName} <br />
              <strong>Last Name</strong>: {this.props.saleDetails.lastName} <br />
              <strong>Address</strong>: {this.props.saleDetails.address} <br />
              <strong>City</strong>: {this.props.saleDetails.city} <br />
              <strong>Province</strong>: {this.props.saleDetails.province} <br />
              <strong>Postal Code</strong>: {this.props.saleDetails.postalCode} <br />
              <strong>Enbridge Gas #</strong>: {this.props.saleDetails.enbridgeNum} <br />
              <strong>Email</strong>: {this.props.saleDetails.email} <br />
              <strong>Home Phone</strong>: {this.props.saleDetails.homePhone} <br />
              <strong>Cell Phone</strong>: {this.props.saleDetails.cellPhone} <br />
              <strong>Program</strong>: {this.props.saleDetails.product} <br />
              <strong>Installation Date</strong>: {this.props.saleDetails.installationDate} <br />
              <strong>Sales Representative</strong>: {this.props.saleDetails.salesRepId} <br />
              <strong>Notes</strong>: {this.props.saleDetails.notes} <br />
            </div> : null}
        </Dialog>
    );
  }
}
