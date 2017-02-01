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

    httpRequest.open('GET', "http://" + IP + "/installations/getallscheduled?id=" + this.props.userId, true);
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
    var d = datetime.split(/[- :]/);
    var date = new Date(d[0], d[1]-1, d[2], d[3], d[4], d[5]);
    return dateHelpers.twoDigits(1 + date.getMonth())  + "-" + dateHelpers.twoDigits(date.getDate()) + "-" + date.getFullYear();
  }

  getTime(datetime) {
    var t = datetime.split(/[- :]/);
    var time = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    var mins = ("0" + time.getMinutes());
    return time.getHours() + ":" + mins.slice(-2);
  }

  validateSelected() {
    if (this.state.selectedNum != undefined) {
      this.props.handleInstallationNext({
        selectedInstallationId: this.state.selectedInstallation.installationNumber,
        folderId: this.state.selectedInstallation.folderId
      });
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
        <br />
        <RaisedButton
          label="Cancel"
          secondary={true}
          onTouchTap={(e) => {e.preventDefault(); this.props.menuClickHandler("dashboard")}}
        />
        &nbsp;
        &nbsp;
        <RaisedButton
          label={'Next'}
          primary={true}
          onTouchTap={(e) => {e.preventDefault(); this.validateSelected()}}
        />
      </div>
    );
  }
}
