import React from 'react';
import {
  Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator,
  Table, TableBody, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn, RaisedButton, FlatButton,
} from 'material-ui';
import EmployeeDetailsDialog from './EmployeeDetailsDialog.jsx';
import { camelize } from '../../helpers/common.js';

export default class EmployeeTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //table state variables
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      showCheckboxes: true,
      selectedId: '',
      //100% minus Toolbar minus 2px border
      height: 'calc(100% - 72px)',
      //end of table state variables

      // Modal state variable
      open: false,

      // Sorting variables
      filteredDataList: undefined,
      sortBy: 'id',
      sortDir: null,

      //this variable keeps the state of a current selected row
      currentSelected: false,
      selectedNum: -1,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.state.filteredDataList && this.props.allEmployees) {
      this.setState({
        filteredDataList: this.getSortedRows(),
      });
    }
  }

  handleOpen = () => {
    //fetch employee details
    this.props.actions.getEmployeeDetails(this.state.selectedId);
    //open a modal
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.props.actions.clearEmployeeDetails();
    this.setState({
      open: false
    });
  }

  handleDeactivate = () => {
    this.props.actions.toggleEmployeeStatus(this.state.selectedId);
  }

  handleSelection = (selectedRows) => {
    if(selectedRows.length == 1) {
      this.setState({
        currentSelected: true,
        selectedNum: selectedRows[0],
        selectedId: this.state.filteredDataList[selectedRows].employeeNumber,
      });
    } else {
      this.setState({
        currentSelected: false,
        selectedNum: -1,
        selectedId: '',
      });
    }
  }

  sortClickHandler(cellDataKey) {
    var sortDir = this.state.sortDir;
    var sortBy = camelize(cellDataKey);
    if (sortBy === this.state.sortBy) {
      sortDir = this.state.sortDir === 'ASC' ? 'DESC' : 'ASC';
    } else {
      sortDir = 'DESC';
    }

    //update filteredDataList object
    var filteredDataList = this.getSortedRows(sortBy, sortDir);

    this.setState({
      sortBy: sortBy,
      sortDir: sortDir,
      filteredDataList: filteredDataList,
      currentSelected: false,
      selectedNum: -1,
      selectedId: '',
    });
  }

  getSortedRows = (sortBy, sortDir) => {
    if(this.props.allEmployees) {
      //if they are undefined - means this func was called from render, using variables from the state
      if(!sortBy && !sortDir) {
        var sortBy = this.state.sortBy;
        var sortDir = this.state.sortDir;
      }

      var rows = this.props.allEmployees.slice();
      rows.sort((a, b) => {
        var sortVal = 0;
        if (a[sortBy] > b[sortBy]) {
          sortVal = 1;
        }
        if (a[sortBy] < b[sortBy]) {
          sortVal = -1;
        }

        if (sortDir === 'DESC') {
          sortVal = sortVal * -1;
        }
        return sortVal;
      });

      return rows;
    } else {
      return [];
    }
  }

  render() {
    const actions = [
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.handleClose()}}
          />,
          <FlatButton
            label="Edit"
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.props.editClickHandler("edit", this.state.selectedId, "newEmployee")}}
          />,
        ];
    return (

      <div className="allEmployees">
        <Toolbar className="allEmployeesToolbar">
          <ToolbarGroup>
            <ToolbarTitle text="View All Employees" className="mainFont" />
            {this.state.currentSelected ?
              <ToolbarGroup>
                <ToolbarSeparator />
                <RaisedButton label="Edit"
                  primary={true}
                  onTouchTap={(e) => {e.preventDefault(); this.props.editClickHandler("edit", this.state.selectedId, "newEmployee")}}
                />
                <RaisedButton
                  label="Details"
                  primary={true}
                  onTouchTap={(e) => {e.preventDefault(); this.handleOpen()}}
                />
                <RaisedButton
                  label="Deactivate"
                  primary={true}
                  onTouchTap={(e) => {e.preventDefault(); this.handleDeactivate()}}
                />
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
            <TableRow className={'trow headerRow'} onCellClick={(event) => (this.sortClickHandler(event.target.childNodes[2].textContent))}>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '110px' }} tooltip="Employee Name">Name</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '60px' }} tooltip="Employee Role">Role</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }} tooltip="Email">Email</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '60px' }} tooltip="Cellphone Number">Cell Phone</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '50px' }} tooltip="Hire Date">Hire Date</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '30px' }} tooltip="Is active">Is Active</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={true}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.getSortedRows().map((row, index) => (
              <TableRow selected={index == this.state.selectedNum ? true : false} key={index} className={'trow'}>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '110px' }}>{row.name}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '60px' }}>{row.role}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }}>{row.email}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '60px' }}>{row.cellPhone}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '50px' }}>{row.hireDate}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '30px' }}>{row.isActive.toString()}</TableRowColumn>
              </TableRow>
              ))
            }
          </TableBody>
        </Table>

        { this.state.open ?
          <EmployeeDetailsDialog
            employeeDetails={this.props.employeeDetails}
            handleClose={this.handleClose}
            editClickHandler={this.props.editClickHandler} />
        : null }
      </div>
    );
  }
}
