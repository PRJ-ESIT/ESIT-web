import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

export default class CustomerDetailsDialog extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const actions = [
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.props.handleClose()}}
          />
        ];

    return (
        <Dialog
          title="Customer Details"
          actions={actions}
          modal={true}
          open={true}
        >
          {this.props.customerDetails ?
            <div>
              <strong>First Name</strong>: {this.props.customerDetails.firstName} <br />
              <strong>Last Name</strong>: {this.props.customerDetails.lastName} <br />
              <strong>Email</strong>: {this.props.customerDetails.email} <br />
              <strong>Home Phone</strong>: {this.props.customerDetails.homePhone} <br />
              <strong>Cell Phone</strong>: {this.props.customerDetails.cellPhone} <br />
              <strong>Enbridge Number</strong>: {this.props.customerDetails.enbridgeNumber} <br />
            </div> : null}
        </Dialog>
    );
  }
}
