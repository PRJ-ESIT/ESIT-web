import React from 'react';
import {
  Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator,
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  TextField, MenuItem, DropDownMenu, RaisedButton
} from 'material-ui';
import Search from 'material-ui/svg-icons/action/search';
import { IP } from '../../../../config/config.js';

const temporaryTableData = [
  {
    saleNum: 12345,
    name: 'John Doe',
    product: 'john.doe@example.com',
    date: '01/10/2016',
    address: '123 Jane Street',
    status: 'Complete'
  },
  {
    saleNum: 12345,
    name: 'John Doe',
    product: 'john.doe@example.com',
    date: '01/10/2016',
    address: '123 Jane Street',
    status: 'Complete'
  },
  {
    saleNum: 12345,
    name: 'John Doe',
    product: 'john.doe@example.com',
    date: '01/10/2016',
    address: '123 Jane Street',
    status: 'Complete'
  },
  {
    saleNum: 12345,
    name: 'John Doe',
    product: 'john.doe@example.com',
    date: '01/10/2016',
    address: '123 Jane Street',
    status: 'Complete'
  },
  {
    saleNum: 12345,
    name: 'John Doe',
    product: 'john.doe@example.com',
    date: '01/10/2016',
    address: '123 Jane Street',
    status: 'Complete'
  },
  {
    saleNum: 12345,
    name: 'John Doe',
    product: 'john.doe@example.com',
    date: '01/10/2016',
    address: '123 Jane Street',
    status: 'Complete'
  },
  {
    saleNum: 12345,
    name: 'John Doe',
    product: 'john.doe@example.com',
    date: '01/10/2016',
    address: '123 Jane Street',
    status: 'Complete'
  },
  {
    saleNum: 12345,
    name: 'John Doe',
    product: 'john.doe@example.com',
    date: '01/10/2016',
    address: '123 Jane Street',
    status: 'Complete'
  },
  {
    saleNum: 12345,
    name: 'John Doe',
    product: 'john.doe@example.com',
    date: '01/10/2016',
    address: '123 Jane Street',
    status: 'Complete'
  },
  {
    saleNum: 12345,
    name: 'John Doe',
    product: 'john.doe@example.com',
    date: '01/10/2016',
    address: '123 Jane Street',
    status: 'Complete'
  },
  {
    saleNum: 12345,
    name: 'John Doe',
    product: 'john.doe@example.com',
    date: '01/10/2016',
    address: '123 Jane Street',
    status: 'Complete'
  }
];


export default class AllInstallations extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //dropdown state variable
      dropdownValue: 1,
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

      //an array to keep the data for all installations
      allInstallations: undefined,
    }
    this.handleSelection = this.handleSelection.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount() {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let allInstallations = JSON.parse(httpRequest.responseText).installations;
        _this.setState({allInstallations: allInstallations});
      }
    };

    httpRequest.open('GET', "http://" + IP + "/allinstallations", true);
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
            <ToolbarTitle text="View All Installations" />
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
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }} tooltip="Customer's Name">Name</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }} tooltip="Product Installed">Product</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '70px' }} tooltip="Installation Date">Date</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '70px' }} tooltip="Customer's Address">Address</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '80px' }} tooltip="Installer's Name">Installer</TableHeaderColumn>
              <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }} tooltip="Installation Status">Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.allInstallations ? this.state.allInstallations.map( (row, index) => (
              <TableRow selected={index == this.state.selectedNum ? true : false} key={index} className={'trow'}>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }}>{row.customerName}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '100px' }}>{row.product}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '70px' }}>01.01.1900</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '70px' }}>{row.address}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '80px' }}>{row.installerName}</TableRowColumn>
                <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '75px' }}>No status</TableRowColumn>
              </TableRow>
              ))
            : null }
          </TableBody>
        </Table>
      </div>
    );
  }
}
