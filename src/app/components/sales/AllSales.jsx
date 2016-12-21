import React from 'react';
import {
  Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator,
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  TextField, MenuItem, DropDownMenu, RaisedButton
} from 'material-ui';
import Search from 'material-ui/svg-icons/action/search';
import { IP } from '../../../../config/config.js';


export default class AllSales extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //dropdown state variable
      dropdownValue: 1,
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
    }
    this.handleSelection = this.handleSelection.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount() {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let allSales = JSON.parse(httpRequest.responseText).sales;
        _this.setState({allSales: allSales});

      }
    };

    httpRequest.open('GET', "http://" + IP + "/allsales", true);
    httpRequest.send(null);
  }

  handleDropdownChange(event, index, value) {
    this.setState({dropdownValue: value});
  }

  handleSelection(selectedRows) {
    if(selectedRows.length == 1) {
      this.setState({
        currentSelected: true,
        selectedNum: selectedRows[0],
        selectedId: this.state.allSales[selectedRows].salesNumber,
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

  render() {
    return (
      <div className="allCustomers">
        <Toolbar className="allCustomersToolbar">
          <ToolbarGroup>
            <ToolbarTitle text="View All Sales" className="mainFont" />
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
                <RaisedButton label="Edit" primary={true}
                  onClick={this.props.editClickHandler.bind(null,
                    "edit", this.state.selectedId, "editSale")}/>
                <RaisedButton label="Details" primary={true} />
                <RaisedButton label="Delete" primary={true} />
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
            <TableRow>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '30px' }} tooltip="Sale Number">#</TableHeaderColumn>
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
            {this.state.allSales? this.state.allSales.map( (row, index) => (
              <TableRow selected={index == this.state.selectedNum ? true : false} key={index}>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '30px' }}>{row.salesNumber}</TableRowColumn>
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
      </div>
    );
  }
}
