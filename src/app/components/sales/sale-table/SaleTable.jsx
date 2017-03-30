import React from 'react';
import {
  Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator,
  Table, TableBody, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn, RaisedButton
} from 'material-ui';

import { camelize } from '../../helpers/common.js';
import SaleDetailsDialog from './SaleDetailsDialog.jsx';

export default class SaleTable extends React.Component {

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

      // Modal state variable
      open: false,

      // Sorting variables
      filteredDataList: undefined,
      sortBy: 'id',
      sortDir: null,

      //this variable keeps the state of a current selected row
      //depends on filteredDataList
      currentSelected: false,
      selectedNum: -1,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.state.filteredDataList && this.props.allSales) {
      this.setState({
        filteredDataList: this.getSortedRows(),
      });
    }
  }

  handleOpen = () => {
    //fetch sale details
    this.props.actions.getSaleDetails(this.state.selectedId);
    //open a modal
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.props.actions.clearSaleDetails();
    this.setState({
      open: false
    });
  }

  handleCancel = () => {
    this.props.actions.cancelSale(this.state.selectedId);
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

  handleResume = (status) => {
    console.log('in handle resume');
    console.log(status);
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
    if(this.props.allSales) {
      //if they are undefined - means this func was called from render, using variables from the state
      if(!sortBy && !sortDir) {
        var sortBy = this.state.sortBy;
        var sortDir = this.state.sortDir;
      }

      var rows = this.props.allSales.slice();
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

  getToolbarActionButtons = () => {
    let status = this.state.filteredDataList[this.state.selectedNum].status;
    return (
      <ToolbarGroup>
        <ToolbarSeparator />
        { status == "Created" || status == "Signed" ?
        <RaisedButton
          label="Resume"
          secondary={true}
          onTouchTap={(e) => {e.preventDefault(); this.handleResume(status)}}
        />
        : null }
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
        { status == "Cancelled" ?
          null
        :
          <RaisedButton
            label="Cancel"
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.handleCancel()}}
          />
        }
      </ToolbarGroup>
    );
  }

  render() {
    return (
      <div className="allCustomers">
        <Toolbar className="allCustomersToolbar">
          <ToolbarGroup>
            <ToolbarTitle text="View All Sales" className="mainFont" />
            {this.state.currentSelected ?
              this.getToolbarActionButtons()
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
            <TableRow className={'headerRow'} onCellClick={(event) => (this.sortClickHandler(event.target.childNodes[2].textContent))}>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }} tooltip="Customer's Name">Name</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }} tooltip="Product Sold">Product</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }} tooltip="Sale Date">Date</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }} tooltip="Customer's Address">Address</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }} tooltip="Sale Status">Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={true}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.getSortedRows().map((row, index) => (
              <TableRow selected={index == this.state.selectedNum ? true : false} key={index}>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }}>{row.name}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }}>{row.product}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }}>{row.date}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '125px' }} >{row.address}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }}>{row.status}</TableRowColumn>
              </TableRow>
              ))
            }
          </TableBody>
        </Table>
        { this.state.open ?
          <SaleDetailsDialog
            saleDetails={this.props.saleDetails}
            handleClose={this.handleClose}
            editClickHandler={this.props.editClickHandler} />
        : null }
      </div>
    );
  }
}
