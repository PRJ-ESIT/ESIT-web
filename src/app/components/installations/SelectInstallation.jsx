import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui';
import { IP } from '../../../../config/config.js';

export default class SelectInstallation extends React.Component {
  render() {
    return (
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
    );
  }
}
