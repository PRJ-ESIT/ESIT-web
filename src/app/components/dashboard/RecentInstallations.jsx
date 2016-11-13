import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui';

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
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '40px' }} tooltip="Installation Number">#</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '130px' }} tooltip="Customer's Name">Name</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '130px' }} tooltip="Product's Name">Product</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '70px' }} tooltip="Date">Date</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '150px' }} tooltip="Address">Address</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }} tooltip="Installer's Name">Installer</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.allInstallations ? this.props.allInstallations.map( (row, index) => (
              <TableRow className="tableRow" key={index}>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '40px' }}>{row.installationNumber}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '130px' }}>{row.customerName}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '130px' }}>{row.product}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '70px' }}>{row.installationDate}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '150px' }}>{row.address}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }}>{row.installerName}</TableRowColumn>
              </TableRow>
              ))
            : null }
          </TableBody>
        </Table>
    );
  }
}
