import React from 'react';
import {
  Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator,
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  TextField, MenuItem, RaisedButton, Dialog, FlatButton
} from 'material-ui';
import Search from 'material-ui/svg-icons/action/search';
import { IP } from '../../../../config/config.js';
import { camelize } from '../helpers/common.js';

export default class AllInstallations extends React.Component {

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
      showCheckboxes: true,
      selectedId: '',
      //100% minus Toolbar minus 2px border
      height: 'calc(100% - 72px)',
      //end of table state variables

      //this variable keeps the state of a current selected row
      currentSelected: false,
      selectedNum: -1,

      //an array to keep the data for all installations
      allInstallations: undefined,

      // Modal state variable
      open: false,
      // Modal content - installation details
      installationDetails: undefined,
      installationDate: undefined,

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
        let allInstallations = JSON.parse(httpRequest.responseText).installations;
        _this.setState({
          allInstallations: allInstallations,
          filteredDataList: allInstallations,
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/allinstallations", true);
    httpRequest.send(null);
  }

  handleOpen = () => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let installation = JSON.parse(httpRequest.responseText).installation;

        // Format and save installation date for details modal
        var tempDateTime;
        if (installation.installationDateTime) {
          tempDateTime = new Date(installation.installationDateTime);
          tempDateTime = tempDateTime.toLocaleString();
        } else {
          tempDateTime = null;
        }

        _this.setState({
          installationDetails: installation,
          installationDate: tempDateTime,
        });
      } else {
        _this.setState({
          open: true
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/getoneinstallation?id=" + this.state.selectedId, true);
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
        selectedId: this.state.filteredDataList[selectedRows].installationNumber,
      });
    } else {
      this.setState({
        currentSelected: false,
        selectedNum: -1,
        selectedId: '',
      });
    }
  }

  handleRowClick(rowId) {
    this.setState({
      selectedId: rowId,
    });
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
            onTouchTap={this.props.editClickHandler.bind(null, "edit", this.state.selectedId, "editInstallation")}
          />,
        ];
    return (

      <div className="allCustomers">
        <Toolbar className="allCustomersToolbar">
          <ToolbarGroup>
            <ToolbarTitle text="View All Installations" className="mainFont" />
            {this.state.currentSelected ?
              <ToolbarGroup>
                <ToolbarSeparator />
                <RaisedButton label="Edit" primary={true}
                  onClick={this.props.editClickHandler.bind(null, "edit", this.state.selectedId, "editInstallation")}/>
                <RaisedButton label="Details" primary={true}
                  onClick={this.handleOpen.bind(this)}/>
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
            <TableRow className={'trow'} onCellClick={(event) => (this.sortRowsBy(event.target.childNodes[2].textContent))}>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }} tooltip="Customer's Name">Customer Name</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }} tooltip="Product Installed">Product</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '70px' }} tooltip="Installation Date">Installation Date</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '70px' }} tooltip="Customer's Address">Address</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '80px' }} tooltip="Installer's Name">Installer Name</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }} tooltip="Installation Status">Status</TableHeaderColumn>
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
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }}>{row.customerName}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }}>{row.product}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '70px' }}>{row.installationDate}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '70px' }}>{row.address}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '80px' }}>{row.installerName}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }}>{row.status}</TableRowColumn>
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
          {this.state.installationDetails ?
            <div>
              <strong>First Name</strong>: {this.state.installationDetails.customerFirstName} <br />
              <strong>Last Name</strong>: {this.state.installationDetails.customerLastName} <br />
              <strong>Address</strong>: {this.state.installationDetails.address} <br />
              <strong>Unit</strong>: {this.state.installationDetails.unit} <br />
              <strong>City</strong>: {this.state.installationDetails.city} <br />
              <strong>Province</strong>: {this.state.installationDetails.province} <br />
              <strong>Postal Code</strong>: {this.state.installationDetails.postalCode} <br />
              <strong>Enbridge Gas #</strong>: {this.state.installationDetails.enbridgeNum} <br />
              <strong>Email</strong>: {this.state.installationDetails.email} <br />
              <strong>Home Phone</strong>: {this.state.installationDetails.homePhone} <br />
              <strong>Cell Phone</strong>: {this.state.installationDetails.cellPhone} <br />
              <strong>Square Footage</strong>: {this.state.installationDetails.sqFootage} <br />
              <strong>Bathrooms</strong>: {this.state.installationDetails.bathrooms} <br />
              <strong>Residents</strong>: {this.state.installationDetails.residents} <br />
              <strong>Pool</strong>: {this.state.installationDetails.hasPool == 1 ? 'Yes' : 'No'} <br />
              <strong>Program</strong>: {this.state.installationDetails.product} <br />
              <strong>Installer Name</strong>: {this.state.installationDetails.installerName} <br />
              <strong>Installation Date</strong>: {this.state.installationDate} <br />
            </div> : null}
        </Dialog>
      </div>
    );
  }
}
