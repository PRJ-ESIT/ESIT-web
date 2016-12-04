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

    this.state = {
      sale: '',
      installer: '',
      saleErr: '',
      installerErr: '',
    }
  }

  handleSelectChange(fieldname, event, index, value) {
    var obj = {};
    obj[fieldname + "Err"] = '';
    obj[fieldname] = value;
    this.setState(obj);
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
        <br />
        <RaisedButton label="Cancel" secondary={true} />
        &nbsp;
        &nbsp;
        <RaisedButton label="Save" />
      </div>
    );
  }
}
