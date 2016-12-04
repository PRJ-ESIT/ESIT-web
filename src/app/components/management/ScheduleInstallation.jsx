import React from 'react';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  SelectField, MenuItem, DatePicker, RaisedButton,
} from 'material-ui';
import { validations } from '../helpers/common.js';
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

      // Error messages for each field
      saleErr: '',
      installerErr: '',
      installationDateErr: '',

      // Validation fields
      saleValidated: false,
      installerValidated: false,
      installationDateValidated: false,
      allValidated: false,
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

  validateSale() {

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

  validateAllFields() {
    this.validateInstaller();
    this.validateInstallationDate();

    if (this.state.saleValidated &&
        this.state.installerValidated &&
        this.state.installationDateValidated) {
      this.setState({allValidated: true});
    } else {
      this.setState({allValidated: false});
    }
  }

  render() {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Customer</TableHeaderColumn>
              <TableHeaderColumn>Address</TableHeaderColumn>
              <TableHeaderColumn>Scheduled Date</TableHeaderColumn>
              <TableHeaderColumn>Scheduled Time</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>

        <SelectField
          floatingLabelText="Installer"
          floatingLabelFixed={false}
          hintText="Select an Installer"
          value={this.state.installer}
          onChange={this.handleSelectChange.bind(this, "installer")}
          errorText={this.state.installerErr}
          errorStyle={{float: "left"}}
        >
          <MenuItem key={1} value={"Installer 1"} primaryText="Installer Name Here" />
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
        />
        <br />
        <RaisedButton label="Cancel" secondary={true} />
        &nbsp;
        &nbsp;
        <RaisedButton label="Save" onClick={this.validateAllFields.bind(this)} />
      </div>
    );
  }
}
