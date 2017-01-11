import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, RaisedButton, } from 'material-ui';
import { IP } from '../../../../config/config.js';
import { dateHelpers } from '../helpers/common.js';

export default class SelectInstallation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //an array of all scheduled installations
      installations: undefined,

      //selected installation
      selectedInstallation: undefined,
    };
  }

  componentDidMount() {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let installations = JSON.parse(httpRequest.responseText).installations;
        _this.setState({
          installations: installations
        });

      }
    };

    httpRequest.open('GET', "http://" + IP + "/scheduledinstallations", true);
    httpRequest.send(null);
  }

  handleRowSelected(selectedRows) {
    if(selectedRows.length == 1) {
      this.setState({
        selectedInstallation: this.state.installations[selectedRows[0]],
        selectedNum: selectedRows[0],
      });
    } else {
      this.setState({
        selectedInstallation: undefined,
        selectedNum: undefined,
      });
    }
  }

  getDate(datetime) {
    var date = new Date(datetime);
    return dateHelpers.twoDigits(1 + date.getMonth())  + "-" + dateHelpers.twoDigits(date.getDate()) + "-" + date.getFullYear();
  }

  getTime(datetime) {
    var date = new Date(datetime);
    return date.getHours() + ":" + date.getMinutes();
  }

  validateSelected() {
    if (this.state.selectedNum != undefined) {
      this.props.handleInstallationNext({selectedInstallationId: this.state.selectedInstallation.installationNumber});
    }
  }

  render() {
    return (
      <div>
        <Table
          onRowSelection={this.handleRowSelected.bind(this)}
          selectable={true}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Customer</TableHeaderColumn>
              <TableHeaderColumn>Address</TableHeaderColumn>
              <TableHeaderColumn>Scheduled Date</TableHeaderColumn>
              <TableHeaderColumn>Scheduled Time</TableHeaderColumn>
              <TableHeaderColumn>Installer</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.state.installations? this.state.installations.map( (row, index) => (
                <TableRow key={index} selected={index == this.state.selectedNum ? true : false}>
                  <TableRowColumn>{row.installationNumber}</TableRowColumn>
                  <TableRowColumn>{row.customerName}</TableRowColumn>
                  <TableRowColumn>{row.address}</TableRowColumn>
                  <TableRowColumn>{this.getDate(row.installationDateTime)}</TableRowColumn>
                  <TableRowColumn>{this.getTime(row.installationDateTime)}</TableRowColumn>
                  <TableRowColumn>{row.installerName}</TableRowColumn>
                </TableRow>
                ))
            : null }
          </TableBody>
        </Table>
        <div>
          <RaisedButton
            label="Cancel"
            secondary={true}
            onTouchTap={(e) => {e.preventDefault(); this.props.menuClickHandler("dashboard")}}
          />
          <RaisedButton
            label={'Next'}
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.validateSelected()}}
          />
        </div>
      </div>
    );
  }
}
