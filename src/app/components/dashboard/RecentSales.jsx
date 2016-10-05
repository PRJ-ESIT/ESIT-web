import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui';

const temporaryTableData = [
  {
    saleNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    saleNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    saleNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    saleNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    saleNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    saleNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    saleNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    saleNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    saleNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    saleNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
  {
    saleNum:12345,
    name: 'James Smith',
    product: 'Whole Home Filter',
    date: '01/10/16',
    address: '123 Yonge St.',
  },
];

export default class RecentSales extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      //100% minus Toolbar minus 2px border
      height: 'calc(100% - 72px)',
    };
  }

  render() {
    var tableRowColumnStyles = {
      paddingRight: '2px',
      paddingLeft: '5px'
    };
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
              <TableHeaderColumn style={tableRowColumnStyles} tooltip="Sale #">Sale #</TableHeaderColumn>
              <TableHeaderColumn style={tableRowColumnStyles} tooltip="Customer's Name">Name</TableHeaderColumn>
              <TableHeaderColumn style={tableRowColumnStyles} tooltip="Product's Name">Product</TableHeaderColumn>
              <TableHeaderColumn style={tableRowColumnStyles} tooltip="Date">Date</TableHeaderColumn>
              <TableHeaderColumn style={tableRowColumnStyles} tooltip="Address">Address</TableHeaderColumn>
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
                <TableRowColumn style={tableRowColumnStyles}>{row.saleNum}</TableRowColumn>
                <TableRowColumn style={tableRowColumnStyles}>{row.name}</TableRowColumn>
                <TableRowColumn style={tableRowColumnStyles}>{row.product}</TableRowColumn>
                <TableRowColumn style={tableRowColumnStyles}>{row.date}</TableRowColumn>
                <TableRowColumn style={tableRowColumnStyles}>{row.address}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
    );
  }
}
