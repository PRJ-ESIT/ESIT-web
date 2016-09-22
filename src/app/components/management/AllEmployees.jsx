import React from 'react';
import {
  Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator,
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  TextField, MenuItem, DropDownMenu, RaisedButton
} from 'material-ui';
import Search from 'material-ui/svg-icons/action/search';


const temporaryTableData = [
  {
    employeeNum: 12345,
    name: 'James Smith',
    type: 'Sales Agent',
    email: '123@filterbutler.ca',
    cellPhone: '647-555-1234',
    hireDate: '02/13/16',
    isActive: 'yes'
  },
  {
    employeeNum: 12345,
    name: 'James Smith',
    type: 'Sales Agent',
    email: '123@filterbutler.ca',
    cellPhone: '647-555-1234',
    hireDate: '02/13/16',
    isActive: 'yes'
  },
  {
    employeeNum: 12345,
    name: 'James Smith',
    type: 'Sales Agent',
    email: '123@filterbutler.ca',
    cellPhone: '647-555-1234',
    hireDate: '02/13/16',
    isActive: 'yes'
  },
  {
    employeeNum: 12345,
    name: 'James Smith',
    type: 'Installation Agent',
    email: '123@filterbutler.ca',
    cellPhone: '647-555-1234',
    hireDate: '02/13/16',
    isActive: 'yes'
  },
  {
    employeeNum: 12345,
    name: 'James Smith',
    type: 'Sales Agent',
    email: '123@filterbutler.ca',
    cellPhone: '647-555-1234',
    hireDate: '02/13/16',
    isActive: 'yes'
  },
  {
    employeeNum: 12345,
    name: 'James Smith',
    type: 'Administrator',
    email: '123@filterbutler.ca',
    cellPhone: '647-555-1234',
    hireDate: '02/13/16',
    isActive: 'yes'
  },
  {
    employeeNum: 12345,
    name: 'James Smith',
    type: 'Sales Agent',
    email: '123@filterbutler.ca',
    cellPhone: '647-555-1234',
    hireDate: '02/13/16',
    isActive: 'yes'
  },
  {
    employeeNum: 12345,
    name: 'James Smith',
    type: 'Installation Agent',
    email: '123@filterbutler.ca',
    cellPhone: '647-555-1234',
    hireDate: '02/13/16',
    isActive: 'yes'
  },
  {
    employeeNum: 12345,
    name: 'Administrator',
    type: 'Sales Agent',
    email: '123@filterbutler.ca',
    cellPhone: '647-555-1234',
    hireDate: '02/13/16',
    isActive: 'yes'
  },
  {
    employeeNum: 12345,
    name: 'James Smith',
    type: 'Sales Agent',
    email: '123@filterbutler.ca',
    cellPhone: '647-555-1234',
    hireDate: '02/13/16',
    isActive: 'yes'
  },
  {
    employeeNum: 12345,
    name: 'James Smith',
    type: 'Installation Agent',
    email: '123@filterbutler.ca',
    cellPhone: '647-555-1234',
    hireDate: '02/13/16',
    isActive: 'yes'
  }
];


export default class AllEmployees extends React.Component {

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

      <div className="allEmployees">
        <Toolbar className="allEmployeesToolbar">
          <ToolbarGroup>
            <ToolbarTitle text="View All Employees" />
            <Search
              style={{
                height: '100%',
                paddingTop: '5px'
              }}
            />
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
              <TableHeaderColumn tooltip="Employee #">Employee #</TableHeaderColumn>
              <TableHeaderColumn tooltip="Employee Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Employee Type">Type</TableHeaderColumn>
              <TableHeaderColumn tooltip="Email">Email</TableHeaderColumn>
              <TableHeaderColumn tooltip="Cellphone Number">Phone</TableHeaderColumn>
              <TableHeaderColumn tooltip="Hire Date">Hire Date</TableHeaderColumn>
              <TableHeaderColumn tooltip="Is active">Is Active</TableHeaderColumn>
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
                <TableRowColumn>{row.employeeNum}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.type}</TableRowColumn>
                <TableRowColumn>{row.email}</TableRowColumn>
                <TableRowColumn>{row.cellPhone}</TableRowColumn>
                <TableRowColumn>{row.hireDate}</TableRowColumn>
                <TableRowColumn>{row.isActive}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
