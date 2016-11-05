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
            <ToolbarTitle text="View All Sales" />
            <Search
              style={{
                height: '100%',
                paddingTop: '5px'
              }}
            />
            <TextField
              style={{
                height: '100%',
                width: '180px'
              }}
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
              <TableHeaderColumn tooltip="Sale #">Sale #</TableHeaderColumn>
              <TableHeaderColumn tooltip="Customer's Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Product Sold">Product</TableHeaderColumn>
              <TableHeaderColumn tooltip="Sale Date">Date</TableHeaderColumn>
              <TableHeaderColumn tooltip="Customer's Address">Address</TableHeaderColumn>
              <TableHeaderColumn tooltip="Sale Status">Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.allSales? this.state.allSales.map( (row, index) => (
              <TableRow selected={index == this.state.selectedNum ? true : false}
                key={index}>
                <TableRowColumn>{row.salesNumber}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.product}</TableRowColumn>
                <TableRowColumn>01.01.1900</TableRowColumn>
                <TableRowColumn>{row.address}</TableRowColumn>
                <TableRowColumn>No status</TableRowColumn>
              </TableRow>
              ))
            : null }
          </TableBody>
        </Table>
      </div>
    );
  }
}
