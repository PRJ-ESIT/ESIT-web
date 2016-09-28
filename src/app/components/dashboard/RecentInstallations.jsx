import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui';

const temporaryTableData = [
  {
    installNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    installNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    installNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    installNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    installNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    installNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    installNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    installNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    installNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    installNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    installNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
];

export default class RecentInstallations extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      //100% minus Toolbar minus 2px border
      height: 'calc(100% - 72px)',
    };
  }

  render() {
    return (
        <Table
          wrapperStyle={{height: this.state.height}}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn tooltip="Installation #">Installation #</TableHeaderColumn>
              <TableHeaderColumn tooltip="Customer's Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Product's Name">Product</TableHeaderColumn>
              <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
              <TableHeaderColumn tooltip="Address">Address</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {temporaryTableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.installNum}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.product}</TableRowColumn>
                <TableRowColumn>{row.date}</TableRowColumn>
                <TableRowColumn>{row.address}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
    );
  }
}
