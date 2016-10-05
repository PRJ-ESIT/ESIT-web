import React from 'react';
import {
  Tabs, Tab, TextField, SelectField, MenuItem, RadioButton, RadioButtonGroup,
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  Checkbox, Divider, DatePicker, RaisedButton
} from 'material-ui';


const provinces = [
  <MenuItem key={1} value={1} primaryText="Alberta" />,
  <MenuItem key={2} value={2} primaryText="British Columbia" />,
  <MenuItem key={3} value={3} primaryText="Manitoba" />,
  <MenuItem key={4} value={4} primaryText="New Brunswick" />,
  <MenuItem key={5} value={5} primaryText="Newfoundland and Labrador" />,
  <MenuItem key={6} value={6} primaryText="Nova Scotia" />,
  <MenuItem key={7} value={7} primaryText="Ontario" />,
  <MenuItem key={8} value={8} primaryText="Prince Edward Island" />,
  <MenuItem key={9} value={9} primaryText="Quebec" />,
  <MenuItem key={10} value={10} primaryText="Saskatchewan" />,
  <MenuItem key={11} value={11} primaryText="Northwest Territories" />,
  <MenuItem key={12} value={12} primaryText="Yukon" />,
  <MenuItem key={13} value={13} primaryText="Nunavut" />,
];

const tableData = [
  {
    name: 'Whole Home Filter',
    number: '012345',
    details: 'The water filter',
    selected: false,
  },
  {
    name: 'Whole Home D-Scaler',
    number: '012345',
    details: 'The descaler',
    selected: false,
  },
  {
    name: 'Whole Home Combo',
    number: '012345',
    details: 'The water filter and descaler as a package',
    selected: false,
  },
  {
    name: 'Water Conservation System',
    number: '012345',
    details: 'Some product that conserves water',
    selected: false,
  },
  {
    name: 'Installation Kit',
    number: '012345',
    details: 'The kit required to install other products',
    selected: false,
  },
  {
    name: 'Bottling Kit',
    number: '012345',
    details: 'Water bottling kit for customer',
    selected: false,
  },
];

export default class ScheduleInstallation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tabA: true,
      tabB: false,
      tabValue: 'a',
      fname: '',
      lname: '',
      address: '',
      unit: '',
      city: '',
      postalCode: '',
      enbridge: '',
      email: '',
      homePhone: '',
      cellPhone: '',
      sqft: '',
      bathrooms: '',
      residents: '',
      // table properties
      fixedHeader: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: true,
      height: 'calc(40%)',
      //this variable keeps the state of a current selected row
      selectedNum: -1,
    };
      this.handleTabChange = this.handleTabChange.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.handleRadioChange = this.handleRadioChange.bind(this);
      this.handleSelection = this.handleSelection.bind(this);
  }

  handleTabChange(value) {
    if (value == 'a') {
      this.setState({
        tabValue: value,
        tabA: true,
        tabB: false,
      });
    }
    else if (value == 'b') {
      this.setState({
        tabValue: value,
        tabA: false,
        tabB: true,
      });
    }
  };

  handleTextChange(fieldname, event) {
    var obj = {};
    obj[fieldname] = event.target.value;
    this.setState(obj);
  };

  handleSelectChange(event, index, value) {
    this.setState({selectValue: value});
  }

  handleRadioChange(event, value) {
    this.setState({radioValue: value});
  };

  handleSelection(selectedRows) {
    if(selectedRows.length == 1) {
      this.setState({
        selectedNum: selectedRows[0],
      });
    } else {
      this.setState({
        selectedNum: -1,
      });
    }
  }


  render() {
    return (
      <div>
        <Tabs
        value={this.state.tabValue}
        onChange={this.handleTabChange}
        >
          <Tab label="Installation Completion Certificate" value="a" >
          </Tab>
          <Tab label="Installation Pictures" value="b">
          </Tab>
        </Tabs>
        { this.state.tabA ?
          <div>
            <h2>Homeowner Information</h2><Divider />
            <TextField
              hintText="John"
              errorText="This field is required"
              floatingLabelText="First Name"
              value={this.state.fname}
              onChange={this.handleTextChange.bind(this, "fname")}
            />
            <TextField
              hintText="Doe"
              errorText="This field is required"
              floatingLabelText="Last Name"
              value={this.state.lname}
              onChange={this.handleTextChange.bind(this, "lname")}
            /><br />
            <TextField
              hintText="123 Fake Street"
              errorText="This field is required"
              floatingLabelText="Address"
              value={this.state.address}
              onChange={this.handleTextChange.bind(this, "address")}
            /><br />
            <TextField
              hintText="77"
              errorText="This field is required"
              floatingLabelText="Unit #"
              value={this.state.unit}
              onChange={this.handleTextChange.bind(this, "unit")}
            />
            <TextField
              hintText="Toronto"
              errorText="This field is required"
              floatingLabelText="City"
              value={this.state.city}
              onChange={this.handleTextChange.bind(this, "city")}
            /><br />
            <SelectField
              value={this.state.selectValue}
              onChange={this.handleSelectChange}
              floatingLabelText="Province"
              floatingLabelFixed={true}
              hintText="Select a Province"
            >
              {provinces}
            </SelectField>
            <TextField
              hintText="M4B 5V9"
              errorText="This field is required"
              floatingLabelText="Postal Code"
              value={this.state.postalCode}
              onChange={this.handleTextChange.bind(this, "postalCode")}
            /><br />
            <TextField
              hintText="1234567890"
              errorText="This field is required"
              floatingLabelText="Enbridge Gas #"
              value={this.state.enbridge}
              onChange={this.handleTextChange.bind(this, "enbridge")}
            />
            <TextField
              hintText="name@domain.com"
              errorText="This field is required"
              floatingLabelText="Email"
              value={this.state.email}
              onChange={this.handleTextChange.bind(this, "email")}
            /><br />
            <TextField
              hintText="(416) 123-4567"
              errorText="This field is required"
              floatingLabelText="Home Phone"
              value={this.state.homePhone}
              onChange={this.handleTextChange.bind(this, "homePhone")}
            />
            <TextField
              hintText="(416) 123-4567"
              errorText="This field is required"
              floatingLabelText="Cell Phone"
              value={this.state.cellPhone}
              onChange={this.handleTextChange.bind(this, "cellPhone")}
            /><br />
            <TextField
              hintText="3000"
              errorText="This field is required"
              floatingLabelText="SQ Footage"
              value={this.state.sqft}
              onChange={this.handleTextChange.bind(this, "sqft")}
            />
            <TextField
              hintText="3"
              errorText="This field is required"
              floatingLabelText="Bathrooms"
              value={this.state.bathrooms}
              onChange={this.handleTextChange.bind(this, "bathrooms")}
            /><br />
            <TextField
              hintText="4"
              errorText="This field is required"
              floatingLabelText="Residents"
              value={this.state.residents}
              onChange={this.handleTextChange.bind(this, "residents")}
            />
            <div className="radioActionText">Pool
              <RadioButtonGroup name="hasPool" className="radioGroup"
              onChange={this.handleRadioChange}>
                <RadioButton
                  className="radio"
                  value="yes"
                  label="Yes"
                />
                <RadioButton
                  className="radio"
                  value="no"
                  label="No"
                />
              </RadioButtonGroup>
            </div><br />

            <h2>Program Installation</h2><Divider />
            <Table
              onRowSelection={this.handleSelection}
              onCellClick={this.handleCellClick}
              height={this.state.height}
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
                  <TableHeaderColumn colSpan="3" tooltip="Products Used" style={{textAlign: 'center'}}>
                    Products Used
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn tooltip="Product Name">Product</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Number">Number</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Product Details">Details</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
              >
                {tableData.map( (row, index) => (
                  <TableRow selected={index == this.state.selectedNum ? true : false}
                  key={index}>
                    <TableRowColumn>{row.name}</TableRowColumn>
                    <TableRowColumn>{row.number}</TableRowColumn>
                    <TableRowColumn>{row.details}</TableRowColumn>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>

            <h2>Installation Checklist</h2><Divider />
              <div className="radioActionText">Bypass Installed
                <RadioButtonGroup name="installationCheck" className="radioGroup"
                onChange={this.handleRadioChange}>
                  <RadioButton
                    className="radio"
                    value="yes"
                    label="Yes"
                  />
                  <RadioButton
                    className="radio"
                    value="no"
                    label="No"
                  />
                </RadioButtonGroup>
              </div>
              <div className="radioActionText">Leak Check Equipment
                <RadioButtonGroup name="installationCheck" className="radioGroup"
                onChange={this.handleRadioChange}>
                  <RadioButton
                    className="radio"
                    value="yes"
                    label="Yes"
                  />
                  <RadioButton
                    className="radio"
                    value="no"
                    label="No"
                  />
                </RadioButtonGroup>
              </div>
              <div className="radioActionText">System Flushed
                <RadioButtonGroup name="installationCheck" className="radioGroup"
                onChange={this.handleRadioChange}>
                  <RadioButton
                    className="radio"
                    value="yes"
                    label="Yes"
                  />
                  <RadioButton
                    className="radio"
                    value="no"
                    label="No"
                  />
                </RadioButtonGroup>
              </div>
              <div className="radioActionText">Conservation System Explanation
                <RadioButtonGroup name="installationCheck" className="radioGroup"
                onChange={this.handleRadioChange}>
                  <RadioButton
                    className="radio"
                    value="yes"
                    label="Yes"
                  />
                  <RadioButton
                    className="radio"
                    value="no"
                    label="No"
                  />
                </RadioButtonGroup>
              </div>
              <div className="radioActionText">Shut-off Valve Explanation
                <RadioButtonGroup name="installationCheck" className="radioGroup"
                onChange={this.handleRadioChange}>
                  <RadioButton
                    className="radio"
                    value="yes"
                    label="Yes"
                  />
                  <RadioButton
                    className="radio"
                    value="no"
                    label="No"
                  />
                </RadioButtonGroup>
              </div>
              <div className="radioActionText">Filter Replacement Explanation
                <RadioButtonGroup name="installationCheck" className="radioGroup"
                onChange={this.handleRadioChange}>
                  <RadioButton
                    className="radio"
                    value="yes"
                    label="Yes"
                  />
                  <RadioButton
                    className="radio"
                    value="no"
                    label="No"
                  />
                </RadioButtonGroup>
              </div>
              <TextField
                hintText="Additional installation notes"
                floatingLabelText="Notes"
                multiLine={true}
                rows={1}
                rowsMax={10}
              />

            <h2>Customer Acknowledgement</h2><Divider />
              <div>I hereby confirm the following statements:
                <Checkbox
                  label="Installation was completed to my satisfaction."
                />
                <Checkbox
                  label="The technician explained how to by-pass the filter and change the pre-filter."
                />
                <Checkbox
                  label="I recieved the bottling kit."
                />
                <Checkbox
                  label="My savings are not guaranteed."
                />
              </div>
              <TextField
                floatingLabelText="Homeowner's Signature"
                hintText="Tap to add signature"
              />
              <div>
                <Divider />
                <TextField
                  floatingLabelText="Contractor ID"
                />
                <TextField
                  floatingLabelText="Technician's Signature"
                />
                <DatePicker hintText="Date" container="inline" />
                <TextField
                  floatingLabelText="Greenlife Water Rep. Name"
                />
              </div>
              <div>
                <RaisedButton label="Cancel" />
                <RaisedButton label="Save" />
                <RaisedButton label="Submit" />
              </div>
          </div>
        : null }
        { this.state.tabB ?
          <div>
            <h2>Controllable Tab B</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        : null }
      </div>
    );
  }
}
