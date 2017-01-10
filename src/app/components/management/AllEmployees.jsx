import React from 'react';
import {
  Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator,
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  TextField, MenuItem, RaisedButton, Dialog, FlatButton
} from 'material-ui';
import Search from 'material-ui/svg-icons/action/search';
import { IP } from '../../../../config/config.js';
import { camelize } from '../helpers/common.js';


export default class AllEmployees extends React.Component {

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

      //this variable keeps the state of a current selected row
      currentSelected: false,
      selectedNum: -1,

      //an array to keep all employees data
      allEmployees: undefined,

      // Modal state variable
      open: false,
      // Modal content - employee details
      employeeDetails: undefined,
      hireDate: undefined,

      // Sorting variables
      filteredDataList: undefined,
      sortBy: 'id',
      sortDir: null,
    }
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount() {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let allEmployees = JSON.parse(httpRequest.responseText).employees;
        _this.setState({
          allEmployees: allEmployees,
          filteredDataList: allEmployees,
        });

      }
    };

    httpRequest.open('GET', "http://" + IP + "/allemployees", true);
    httpRequest.send(null);
  }

  handleOpen = () => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let employee = JSON.parse(httpRequest.responseText).employee;

        // Format and save installation date for details modal
        var tempDateTime;
        if (employee.hireDate) {
          tempDateTime = new Date(employee.hireDate);
          tempDateTime = tempDateTime.toLocaleDateString();
        } else {
          tempDateTime = null;
        }

        _this.setState({
          employeeDetails: employee,
          hireDate: tempDateTime,
        });
      } else {
        _this.setState({
          open: true
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/getoneemployee?id=" + this.state.selectedId, true);
    httpRequest.send(null);
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  handleSelection(selectedRows) {
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

  sortRowsBy(cellDataKey) {
    cellDataKey = camelize(cellDataKey);
    var sortDir = this.state.sortDir;
    var sortBy = cellDataKey;
    if (sortBy === this.state.sortBy) {
      sortDir = this.state.sortDir === 'ASC' ? 'DESC' : 'ASC';
    } else {
      sortDir = 'DESC';
    }
    var rows = this.state.filteredDataList.slice();

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

    this.setState({
      sortBy,
      sortDir,
      filteredDataList : rows,
      currentSelected: false,
      selectedNum: -1,
      selectedId: '',
    });
  }

  render() {
    const actions = [
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Edit"
            primary={true}
            onTouchTap={this.props.editClickHandler.bind(null, "edit", this.state.selectedId, "newEmployee")}
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
                <RaisedButton label="Edit" primary={true}
                onClick={this.props.editClickHandler.bind(null,
                  "edit", this.state.selectedId, "newEmployee")} />
                <RaisedButton label="Details" primary={true}
                  onClick={this.handleOpen.bind(this)}/>
                <RaisedButton label="Deactivate" primary={true} />
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
            <TableRow className={'trow'} onCellClick={(event) => (this.sortRowsBy(event.target.childNodes[2].textContent))}>
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
            deselectOnClickaway={false}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.filteredDataList ? this.state.filteredDataList.map( (row, index) => (
              <TableRow selected={index == this.state.selectedNum ? true : false} key={index} className={'trow'}>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '110px' }}>{row.name}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '60px' }}>{row.role}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }}>{row.email}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '60px' }}>{row.cellPhone}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '50px' }}>{row.hireDate}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '30px' }}>{row.isActive.toString()}</TableRowColumn>
              </TableRow>
              ))
            : null }
          </TableBody>
        </Table>
        <Dialog
          title="Installation Details"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          {this.state.employeeDetails ?
            <div>
              <strong>First Name</strong>: {this.state.employeeDetails.firstName} <br />
              <strong>Last Name</strong>: {this.state.employeeDetails.lastName} <br />
              <strong>Employee Role</strong>: {this.state.employeeDetails.role} <br />
              <strong>Hire Date</strong>: {this.state.hireDate} <br />
              <strong>Address</strong>: {this.state.employeeDetails.address} <br />
              <strong>City</strong>: {this.state.employeeDetails.city} <br />
              <strong>Province</strong>: {this.state.employeeDetails.province} <br />
              <strong>Postal Code</strong>: {this.state.employeeDetails.postalCode} <br />
              <strong>Email</strong>: {this.state.employeeDetails.email} <br />
              <strong>Home Phone</strong>: {this.state.employeeDetails.homePhone} <br />
              <strong>Cell Phone</strong>: {this.state.employeeDetails.cellPhone} <br />
            </div> : null}
        </Dialog>
      </div>
    );
  }
}
