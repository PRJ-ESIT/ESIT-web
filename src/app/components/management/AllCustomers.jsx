import React from 'react';
import {
  Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator,
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  TextField, MenuItem, DropDownMenu, RaisedButton
} from 'material-ui';


const temporaryTableData = [
  {
    customerNum: 12345,
    name: 'James Smith',
    email: 'james.smith@example.com',
    phoneNum: '647-555-1234',
    enbridgeNum: '123-789-456',
    lastSale: '02/13/16'
  },
  {
    customerNum: 12345,
    name: 'James Smith',
    email: 'james.smith@example.com',
    phoneNum: '647-555-1234',
    enbridgeNum: '123-789-456',
    lastSale: '02/13/16'
  },
  {
    customerNum: 12345,
    name: 'James Smith',
    email: 'james.smith@example.com',
    phoneNum: '647-555-1234',
    enbridgeNum: '123-789-456',
    lastSale: '02/13/16'
  },
  {
    customerNum: 12345,
    name: 'James Smith',
    email: 'james.smith@example.com',
    phoneNum: '647-555-1234',
    enbridgeNum: '123-789-456',
    lastSale: '02/13/16'
  },
  {
    customerNum: 12345,
    name: 'James Smith',
    email: 'james.smith@example.com',
    phoneNum: '647-555-1234',
    enbridgeNum: '123-789-456',
    lastSale: '02/13/16'
  },
  {
    customerNum: 12345,
    name: 'James Smith',
    email: 'james.smith@example.com',
    phoneNum: '647-555-1234',
    enbridgeNum: '123-789-456',
    lastSale: '02/13/16'
  },
  {
    customerNum: 12345,
    name: 'James Smith',
    email: 'james.smith@example.com',
    phoneNum: '647-555-1234',
    enbridgeNum: '123-789-456',
    lastSale: '02/13/16'
  },
  {
    customerNum: 12345,
    name: 'James Smith',
    email: 'james.smith@example.com',
    phoneNum: '647-555-1234',
    enbridgeNum: '123-789-456',
    lastSale: '02/13/16'
  },
  {
    customerNum: 12345,
    name: 'James Smith',
    email: 'james.smith@example.com',
    phoneNum: '647-555-1234',
    enbridgeNum: '123-789-456',
    lastSale: '02/13/16'
  },
  {
    customerNum: 12345,
    name: 'James Smith',
    email: 'james.smith@example.com',
    phoneNum: '647-555-1234',
    enbridgeNum: '123-789-456',
    lastSale: '02/13/16'
  },
  {
    customerNum: 12345,
    name: 'James Smith',
    email: 'james.smith@example.com',
    phoneNum: '647-555-1234',
    enbridgeNum: '123-789-456',
    lastSale: '02/13/16'
  }
];


export default class AllCustomers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //dropdown state variable
      dropdownValue: 1,
      //table state variables
      fixedHeader: true,
      fixedFooter: false,
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
    }
    this.handleSelection = this.handleSelection.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleDropdownChange(event, index, value) {
    console.log(index);
    console.log(value);
    this.setState({dropdownValue: value});
  }

  handleSelection(selectedRows) {
    console.log(selectedRows);
    console.log(this.state);
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
            <ToolbarTitle text="View All Customers" />
            <TextField
              style={{height: '100%'}}
              hintText="search"
            />
            <ToolbarSeparator />
            <DropDownMenu
              iconStyle={{fill: 'rgb(0, 0, 0)'}}
              value={this.state.dropdownValue}
              onChange={this.handleDropdownChange}
            >
              <MenuItem value={1} primaryText="Show 10" />
              <MenuItem value={2} primaryText="Show 25" />
              <MenuItem value={3} primaryText="Show 50" />
              <MenuItem value={4} primaryText="Show 100" />
            </DropDownMenu>
            {this.state.currentSelected ?
              <ToolbarGroup>
                <ToolbarSeparator />
                <RaisedButton label="Edit" primary={true} />
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
              <TableHeaderColumn tooltip="Customer #">Customer #</TableHeaderColumn>
              <TableHeaderColumn tooltip="Customer's Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Customer's Email">Email</TableHeaderColumn>
              <TableHeaderColumn tooltip="Customer's Phone Number">Phone Number</TableHeaderColumn>
              <TableHeaderColumn tooltip="Enbridge Number">Enbridge Number</TableHeaderColumn>
              <TableHeaderColumn tooltip="Last Sale">Last Sale</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {temporaryTableData.map( (row, index) => (
              <TableRow
                selected={index == this.state.selectedNum ? true : false}
                key={index}>
                <TableRowColumn>{row.customerNum}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.email}</TableRowColumn>
                <TableRowColumn>{row.phoneNum}</TableRowColumn>
                <TableRowColumn>{row.enbridgeNum}</TableRowColumn>
                <TableRowColumn>{row.lastSale}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
