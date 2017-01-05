import React from 'react';
import {
  Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator,
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  TextField, MenuItem, RaisedButton, Dialog, FlatButton
} from 'material-ui';
import Search from 'material-ui/svg-icons/action/search';
import { IP } from '../../../../config/config.js';


export default class AllCustomers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //table state variables
      fixedHeader: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      //100% minus Toolbar minus 2px border
      height: 'calc(100% - 72px)',
      //end of table state variables

      //this variable keeps the state of a current selected row
      currentSelected: false,
      selectedNum: -1,
      //an array to keep the data for the AllCustomers table
      allCustomers: undefined,
    }
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount() {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let allCustomers = JSON.parse(httpRequest.responseText).customers;
        _this.setState({allCustomers: allCustomers});
      }
    };

    httpRequest.open('GET', "http://" + IP + "/allcustomers", true);
    httpRequest.send(null);
  }

  handleSelection(selectedRows) {
    if(selectedRows.length == 1) {
      this.setState({
        currentSelected: true,
        selectedNum: selectedRows[0],
      });
    } else {
      this.setState({
        currentSelected: false,
        selectedNum: -1,
      });
    }
  }

  render() {
    return (

      <div className="allCustomers">
        <Toolbar className="allCustomersToolbar">
          <ToolbarGroup>
            <ToolbarTitle text="View All Customers" className="mainFont" />
            {this.state.currentSelected ?
              <ToolbarGroup>
                <ToolbarSeparator />
                <RaisedButton label="Details" primary={true} />
                <RaisedButton label="Delete" primary={true} />
              </ToolbarGroup>
            : null }
          </ToolbarGroup>
        </Toolbar>
        <Table
          onRowSelection={this.handleSelection}
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
            <TableRow className={'trow'}>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '130px' }} tooltip="Customer's Name">Name</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '130px' }} tooltip="Customer's Email">Email</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }} tooltip="Customer's Phone Number">Home Phone</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }} tooltip="Customer's Phone Number">Cell Phone</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }} tooltip="Enbridge Number">Enbridge Number</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.allCustomers ? this.state.allCustomers.map( (row, index) => (
              <TableRow selected={index == this.state.selectedNum ? true : false} key={index} className={'trow'}>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '130px' }}>{row.name}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '130px' }}>{row.email}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }}>{row.homePhone}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }}>{row.cellPhone}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }}>{row.enbridgeNumber}</TableRowColumn>
              </TableRow>
              ))
            : null }
          </TableBody>
        </Table>
      </div>
    );
  }
}
