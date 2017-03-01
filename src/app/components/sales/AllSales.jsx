import React from 'react';
import {
  Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator,
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  TextField, MenuItem, RaisedButton, Dialog, FlatButton
} from 'material-ui';
import Search from 'material-ui/svg-icons/action/search';
import { IP } from '../../../../config/config.js';
import { camelize } from '../helpers/common.js';


export default class AllSales extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // table state variable
      fixedHeader: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      selectedId: '',
      //100% minus Toolbar minus 2px border
      height: 'calc(100% - 72px)',
      //end of table state variables

      //this variable keeps the state of a current selected row
      currentSelected: false,
      selectedNum: -1,

      //an array to keep the data for the sales table
      allSales: undefined,

      // Modal state variable
      open: false,
      // Modal content - sale details
      saleDetails: undefined,
      installationDate: undefined,

      // Sorting variables
      filteredDataList: undefined,
      sortBy: 'id',
      sortDir: null,
    }
  }

  componentDidMount() {
    this.getAllSales();
  }

  getAllSales = () => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let allSales = JSON.parse(httpRequest.responseText).sales;
        _this.setState({
          allSales: allSales,
          filteredDataList: allSales,
        });

      }
    };

    httpRequest.open('GET', "http://" + IP + "/sales/getall?id=" + this.props.userId, true);
    httpRequest.send(null);
  }

  handleOpen = () => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let sale = JSON.parse(httpRequest.responseText).sale;

        // Format and save installation date for details modal
        var tempDateTime;
        if (sale.installationDateTime) {
          tempDateTime = new Date(sale.installationDateTime);
          tempDateTime = tempDateTime.toLocaleString();
        } else {
          tempDateTime = null;
        }

        _this.setState({
          saleDetails: sale,
          installationDate: tempDateTime,
        });
      } else {
        _this.setState({
          open: true
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/sales/getone?id=" + this.state.selectedId, true);
    httpRequest.send(null);
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  handleCancel = () => {
    let data = {
      saleId: this.state.selectedId,
    };

    var _this = this;
    var request = new XMLHttpRequest();
    request.open('PUT', 'http://' + IP + '/sales/cancel', true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        _this.getAllSales();
      }
    };

    request.send(JSON.stringify(data));
  }

  handleSelection = (selectedRows) => {
    if(selectedRows.length == 1) {
      this.setState({
        currentSelected: true,
        selectedNum: selectedRows[0],
        selectedId: this.state.filteredDataList[selectedRows].salesNumber,
      });
    } else {
      this.setState({
        currentSelected: false,
        selectedNum: -1,
        selectedId: '',
      });
    }
  }

  handleRowClick(rowId){
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
            onTouchTap={(e) => {e.preventDefault(); this.handleClose()}}
          />,
          <FlatButton
            label="Edit"
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.props.editClickHandler("edit", this.state.selectedId, "editSale")}}
          />,
        ];
    return (
      <div className="allCustomers">
        <Toolbar className="allCustomersToolbar">
          <ToolbarGroup>
            <ToolbarTitle text="View All Sales" className="mainFont" />
            {this.state.currentSelected ?
              <ToolbarGroup>
                <ToolbarSeparator />
                <RaisedButton
                  label="Edit"
                  primary={true}
                  onTouchTap={(e) => {e.preventDefault(); this.props.editClickHandler("edit", this.state.selectedId, "editSale")}}
                />
                <RaisedButton
                  label="Details"
                  primary={true}
                  onTouchTap={(e) => {e.preventDefault(); this.handleOpen()}}
                />
                <RaisedButton
                  label="Cancel"
                  primary={true}
                  onTouchTap={(e) => {e.preventDefault(); this.handleCancel()}}
                />
              </ToolbarGroup>
            : null }
          </ToolbarGroup>
        </Toolbar>
        <Table
          onRowSelection={this.handleSelection}
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow onCellClick={(event) => (this.sortRowsBy(event.target.childNodes[2].textContent))}>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }} tooltip="Customer's Name">Name</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }} tooltip="Product Sold">Product</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }} tooltip="Sale Date">Date</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }} tooltip="Customer's Address">Address</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }} tooltip="Sale Status">Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={false}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.filteredDataList? this.state.filteredDataList.map( (row, index) => (
              <TableRow selected={index == this.state.selectedNum ? true : false} key={index}>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }}>{row.name}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }}>{row.product}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }}>{row.date}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }} >{row.address}</TableRowColumn>
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
          {this.state.saleDetails ?
            <div>
              <strong>First Name</strong>: {this.state.saleDetails.firstName} <br />
              <strong>Last Name</strong>: {this.state.saleDetails.lastName} <br />
              <strong>Address</strong>: {this.state.saleDetails.address} <br />
              <strong>City</strong>: {this.state.saleDetails.city} <br />
              <strong>Province</strong>: {this.state.saleDetails.province} <br />
              <strong>Postal Code</strong>: {this.state.saleDetails.postalCode} <br />
              <strong>Enbridge Gas #</strong>: {this.state.saleDetails.enbridgeNum} <br />
              <strong>Email</strong>: {this.state.saleDetails.email} <br />
              <strong>Home Phone</strong>: {this.state.saleDetails.homePhone} <br />
              <strong>Cell Phone</strong>: {this.state.saleDetails.cellPhone} <br />
              <strong>Program</strong>: {this.state.saleDetails.product} <br />
              <strong>Installation Date</strong>: {this.state.installationDate} <br />
              <strong>Sales Representative</strong>: {this.state.saleDetails.salesRepId} <br />
              <strong>Notes</strong>: {this.state.saleDetails.notes} <br />
            </div> : null}
        </Dialog>
      </div>
    );
  }
}
