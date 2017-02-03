import React from 'react';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  SelectField, MenuItem, DatePicker, RaisedButton, TimePicker, Paper,
} from 'material-ui';
import { validations, dateHelpers } from '../helpers/common.js';
import { IP } from '../../../../config/config.js';

export default class ScheduleInstallation extends React.Component {
  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    this.state = {
      // Form data
      sale: '',
      installer: '',
      installationDate: {},
      installationTime: {},

      // Error messages for each field
      saleErr: '',
      installerErr: '',
      installationDateErr: '',
      installationTimeErr: '',

      // Validation fields
      saleValidated: false,
      installerValidated: false,
      installationDateValidated: false,
      installationTimeValidated: false,

      allSales: undefined,
      allInstallers: undefined,
    }

  }

  componentDidMount() {
    this.getInstallationInfo();
  }

  handleRowSelected(selectedRows) {
    if(selectedRows.length == 1) {
      var dt = this.state.allSales[selectedRows[0]].installationDateTime.split(/[- :]/);
      this.setState({
        sale: this.state.allSales[selectedRows[0]],
        selectedNum: selectedRows[0],
        installationDate: new Date(dt[0], dt[1]-1, dt[2], dt[3], dt[4], dt[5]),
        installationDateErr: '',
        installationDateValidated: true,
        installationTime: new Date(dt[0], dt[1]-1, dt[2], dt[3], dt[4], dt[5]),
        installationTimeErr: '',
        installationTimeValidated: true,
        saleValidated: true,
      });
    } else {
      this.setState({
        sale: undefined,
        selectedNum: undefined,
        installationDate: null,
        installationDateValidated: false,
        installationTime: null,
        installationTimeValidated: false,
        saleValidated: false,
      });
    }
  }

  handleSelectChange(fieldname, event, index, value) {
    var obj = {};
    obj[fieldname + "Err"] = '';
    obj[fieldname + "Validated"] = true;
    obj[fieldname] = value;
    this.setState(obj);
  }

  handleDateChange(fieldname, event, date) {
    var obj = {};
    obj[fieldname + "Err"] = '';
    obj[fieldname + "Validated"] = true;
    obj[fieldname] = date;
    this.setState(obj);
  }

  handleTimeChange(fieldname, event, time) {
    var obj = {};
    obj[fieldname + "Err"] = '';
    obj[fieldname + "Validated"] = true;
    obj[fieldname] = time;
    this.setState(obj);
  }

  validateInstaller() {
    let installer = this.state.installer;
    if (validations.validateInstaller(installer)) {
      this.setState({
        installerErr: '',
        installer: installer,
        installerValidated: true,
      });
    } else {
      this.setState({
        installerErr: 'Installer not selected',
        installerValidated: false,
      });
    }
  }

  validateInstallationDate() {
    let installationDate = this.state.installationDate;
    if (validations.validateInstallationDate(installationDate)) {
      this.setState({
        installationDateErr: '',
        installationDateValidated: true,
      });
    } else {
      this.setState({
        installationDateErr: 'Must select an installation date',
        installationDateValidated: false,
      });
    }
  }

  validateInstallationTime() {
    let installationTime = this.state.installationTime;
    if (validations.validateInstallationDate(installationTime)) {
      this.setState({
        installationTimeErr: '',
        installationTimeValidated: true,
      });
    } else {
      this.setState({
        installationTimeErr: 'Must select installation time',
        installationTimeValidated: false,
      });
    }
  }

  validateAllAndSubmit() {
    if (this.state.saleValidated &&
        this.state.installerValidated &&
        this.state.installationDateValidated) {

    this.createNewInstallation();

    } else {
      this.validateInstaller();
      this.validateInstallationDate();
      this.validateInstallationTime();
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

  getInstallationInfo() {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let allSales = JSON.parse(httpRequest.responseText).data.sales;
        let allInstallers = JSON.parse(httpRequest.responseText).data.installers;

        _this.setState({
          allSales: allSales,
          allInstallers: allInstallers,
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/management/getunscheduled", true);
    httpRequest.send(null);
  }

  createNewInstallation() {
    //combining the date and time objects and converting them to MySQL DATETIME format
    var finalDate = new Date(this.state.installationDate);
    var hours = this.state.installationTime.getHours();
    var minutes = this.state.installationTime.getMinutes();
    finalDate.setHours(hours);
    finalDate.setMinutes(minutes);

    let data = {
      salesNumber: this.state.sale.salesNumber,
      installer: this.state.installer,
      installationDateTime: dateHelpers.toMysqlFormat(finalDate),
      folderId: this.state.sale.folderId,
    };

    var _this = this;
    var request = new XMLHttpRequest();
    request.open('POST', "http://" + IP + '/installations/create', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 201) {
        _this.getInstallationInfo();
      }
      //#TODO receive Sale number and add it to the state
    };

    request.send(JSON.stringify(data));
  }

  render() {
    return (
      <div>
        <Table
          onRowSelection={this.handleRowSelected.bind(this)}
          selectable={true}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Address</TableHeaderColumn>
              <TableHeaderColumn>Product</TableHeaderColumn>
              <TableHeaderColumn>Scheduled Date</TableHeaderColumn>
              <TableHeaderColumn>Scheduled Time</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.state.allSales? this.state.allSales.map( (row, index) => (
              <TableRow key={index} selected={index == this.state.selectedNum ? true : false}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.address}</TableRowColumn>
                <TableRowColumn>{row.product}</TableRowColumn>
                <TableRowColumn>{this.getDate(row.installationDateTime)}</TableRowColumn>
                <TableRowColumn>{this.getTime(row.installationDateTime)}</TableRowColumn>
              </TableRow>
              ))
            : null }
          </TableBody>
        </Table>

        <Paper zDepth={2} rounded={false}>
        <SelectField
          floatingLabelText="Installer"
          floatingLabelFixed={false}
          hintText="Select an Installer"
          value={this.state.installer}
          onChange={this.handleSelectChange.bind(this, "installer")}
          errorText={this.state.installerErr}
          errorStyle={{float: "left"}}
          style={{ paddingLeft: "20px", verticalAlign: 'bottom' }}
        >
          {this.state.allInstallers ? this.state.allInstallers.map((installer, index) => (
            <MenuItem key={index} value={installer.employeeNumber} primaryText={installer.name} />
          ))
          : null }
        </SelectField>
        <DatePicker
          floatingLabelText="Scheduled Installation Date"
          hintText="2017-08-20"
          container="inline"
          value={this.state.installationDate}
          onChange={this.handleDateChange.bind(this, "installationDate")}
          minDate={this.state.minDate}
          maxDate={this.state.maxDate}
          errorText={this.state.installationDateErr}
          errorStyle={{float: "left"}}
          onTouchTap={(e) => {e.preventDefault();}}
          style={{marginLeft: "20px"}}
        />
        <br />
        <TimePicker
          hintText="Installation Time"
          floatingLabelText="Installation Time"
          value={this.state.installationTime}
          onChange={this.handleTimeChange.bind(this, "installationTime")}
          errorText={this.state.installationTimeErr}
          errorStyle={{float: "left"}}
          style={{marginLeft: "20px"}}
        />
        </Paper>
        <br />
        <RaisedButton
          label="Cancel"
          secondary={true}
          onTouchTap={(e) => {e.preventDefault(); this.props.menuClickHandler("dashboard")}}
          style={{marginLeft: "20px"}}
        />
        &nbsp;
        &nbsp;
        <RaisedButton
          label="Schedule"
          onTouchTap={(e) => {e.preventDefault(); this.validateAllAndSubmit()}}
        />
      </div>
    );
  }
}
