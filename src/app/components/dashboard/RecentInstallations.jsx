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
              <TableHeaderColumn style={{ padding: '0px 5px 0px 5px', width: '75px' }} tooltip="Installation #">Installation #</TableHeaderColumn>
              <TableHeaderColumn style={{ padding: '0px 5px 0px 5px', width: '125px' }} tooltip="Customer's Name">Name</TableHeaderColumn>
              <TableHeaderColumn style={{ padding: '0px 5px 0px 5px', width: '125px' }}style={tableRowColumnStyles} tooltip="Product's Name">Product</TableHeaderColumn>
              <TableHeaderColumn style={{ padding: '0px 5px 0px 5px', width: '75px' }}style={tableRowColumnStyles} tooltip="Date">Date</TableHeaderColumn>
              <TableHeaderColumn style={{ padding: '0px 5px 0px 5px', width: '150px' }} tooltip="Address">Address</TableHeaderColumn>
              <TableHeaderColumn style={{ padding: '0px 5px 0px 5px', width: '125px' }} tooltip="Installer's Name">Installer</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.allInstallations ? this.props.allInstallations.map( (row, index) => (
              <TableRow className="tableRow" style={tableRowColumnStyles} key={index}>
                <TableRowColumn style={{ padding: '0px 5px 0px 5px', width: '75px' }}>{row.installationNumber}</TableRowColumn>
                <TableRowColumn style={{ padding: '0px 5px 0px 5px', width: '125px' }}>{row.customerName}</TableRowColumn>
                <TableRowColumn style={{ padding: '0px 5px 0px 5px', width: '125px' }}>{row.product}</TableRowColumn>
                <TableRowColumn style={{ padding: '0px 5px 0px 5px', width: '75px' }}>01.01.1900</TableRowColumn>
                <TableRowColumn style={{ padding: '0px 5px 0px 5px', width: '150px' }}>{row.address}</TableRowColumn>
                <TableRowColumn style={{ padding: '0px 5px 0px 5px', width: '125px' }}>{row.installerName}</TableRowColumn>
              </TableRow>
              ))
            : null }
          </TableBody>
        </Table>
    );
  }
}
