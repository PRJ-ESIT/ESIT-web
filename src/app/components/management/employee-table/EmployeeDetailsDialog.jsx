import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

export default class EmployeeDetailsDialog extends React.Component {

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
            onTouchTap={(e) => {e.preventDefault(); this.props.editClickHandler("edit", this.props.employeeDetails.employeeId, "newEmployee")}}
          />,
        ];

    return (
        <Dialog
          title="Employee Details"
          actions={actions}
          modal={true}
          open={true}
        >
          {this.props.employeeDetails ?
            <div>
              <strong>First Name</strong>: {this.props.employeeDetails.firstName} <br />
              <strong>Last Name</strong>: {this.props.employeeDetails.lastName} <br />
              <strong>Employee Role</strong>: {this.props.employeeDetails.role} <br />
              <strong>Hire Date</strong>: {this.props.employeeDetails.hireDate} <br />
              <strong>Address</strong>: {this.props.employeeDetails.address} <br />
              <strong>City</strong>: {this.props.employeeDetails.city} <br />
              <strong>Province</strong>: {this.props.employeeDetails.province} <br />
              <strong>Postal Code</strong>: {this.props.employeeDetails.postalCode} <br />
              <strong>Email</strong>: {this.props.employeeDetails.email} <br />
              <strong>Home Phone</strong>: {this.props.employeeDetails.homePhone} <br />
              <strong>Cell Phone</strong>: {this.props.employeeDetails.cellPhone} <br />
            </div> : null}
        </Dialog>
    );
  }
}
