import React from 'react';
import {
  Tabs, Tab, TextField, SelectField, MenuItem, RadioButton, RadioButtonGroup,
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  Checkbox, Divider, DatePicker, RaisedButton
} from 'material-ui';
import { validations } from '../helpers/common.js';


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
      unitNum: '',
      city: '',
      postalCode: '',
      enbridge: '',
      email: '',
      homePhone: '',
      cellPhone: '',
      sqft: '',
      bathrooms: '',
      residents: '',

      //error messages for each input field
      fnameErr: '',
      lnameErr: '',
      addressErr: '',
      unitNumErr: '',
      cityErr: '',
      provinceErr: '',
      postalCodeErr: '',
      enbridgeErr: '',
      emailErr: '',
      homePhoneErr: '',
      cellPhoneErr: '',
      sqftErr: '',
      bathroomsErr: '',
      residentsErr: '',

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

  validateFName() {
    let fname = this.state.fname.trim();
    if(validations.isAlphaSpacesHyphens(fname) &&
      validations.minLength(fname, 2) &&
      validations.maxLength(fname, 25)) {

      this.setState({
        fnameErr: '',
        fname: fname,
      });
    } else {
      this.setState({
        fnameErr: '2 to 25 characters, spaces and hyphens only'
      });
    }
  }

  validateLName() {
    let lname = this.state.lname.trim();
    if(validations.isAlphaSpacesHyphens(lname) &&
      validations.minLength(lname, 2) &&
      validations.maxLength(lname, 25)) {

      this.setState({
        lnameErr: '',
        lname: lname,
      });
    } else {
      this.setState({
        lnameErr: '2 to 25 characters, spaces and hyphens only'
      });
    }
  }

  validateAddress() {
    let address = this.state.address.trim();
    if(validations.isAlphanumericSpacesHyphens(address) && validations.maxLength(address, 50)) {
      this.setState({
        addressErr: '',
        address: address,
      });
    } else {
      this.setState({
        addressErr: 'Can contain characters, numbers, spaces and hyphens only'
      });
    }
  }

  validateUnit() {
    let unitNum = this.state.unitNum.trim();
    if(validations.isAlphanumeric(unitNum) && validations.maxLength(unitNum, 10)) {
      this.setState({
        unitNumErr: '',
        unitNum: unitNum,
      });
    } else {
      this.setState({
        unitNumErr: 'Has to be 1 word containing numbers/characters only'
      });
    }
  }

  validateCity() {
    let city = this.state.city.trim();
    if(validations.isAlphaSpacesHyphens(city) && validations.maxLength(city, 25)) {
      this.setState({
        cityErr: '',
        city: city,
      });
    } else {
      this.setState({
        cityErr: 'Up to 25 characters, spaces and hyphens only'
      });
    }
  }

  validatePostalCode() {
    let postalCode = this.state.postalCode.trim();
    if(validations.isPostalCode(postalCode)) {
      this.setState({
        postalCodeErr: '',
        postalCode: postalCode.toUpperCase(),
      });
    } else {
      this.setState({
        postalCodeErr: 'Not a valid postal code'
      });
    }
  }

  validateEnbridge() {
    let enbridge = this.state.enbridge.trim();
    if(validations.isNumeric(enbridge)) {
      this.setState({
        enbridgeErr: '',
        enbridge: enbridge,
      });
    } else {
      this.setState({
        enbridgeErr: 'Must only consist of numbers'
      });
    }
  }

  validateEmail() {
    let email = this.state.email.trim();
    if(validations.isEmail(email) && validations.maxLength(email, 50)) {
      this.setState({
        emailErr: '',
        email: email,
      });
    } else {
      this.setState({
        emailErr: 'Not a valid email'
      });
    }
  }

  validateHomePhone() {
    let homePhone = this.state.homePhone.trim();
    if(validations.isPhoneNumber(homePhone) && validations.maxLength(homePhone, 12)) {
      this.setState({
        homePhoneErr: '',
        homePhone: homePhone,
      });
    } else {
      this.setState({
        homePhoneErr: 'Not a valid phone number'
      });
    }
  }

  validateCellPhone() {
    let cellPhone = this.state.cellPhone.trim();
    if(validations.isPhoneNumber(cellPhone) && validations.maxLength(cellPhone, 12)) {
      this.setState({
        cellPhoneErr: '',
        cellPhone: cellPhone,
      });
    } else {
      this.setState({
        cellPhoneErr: 'Not a valid phone number'
      });
    }
  }

  validateSqft() {
    let sqft = this.state.sqft.trim();
    if(validations.isNumeric(sqft) && validations.maxLength(sqft, 6)) {
      this.setState({
        sqftErr: '',
        sqft: sqft,
      });
    } else {
      this.setState({
        sqftErr: 'Must only consist of numbers'
      });
    }
  }

  validateBathrooms() {
    let bathrooms = this.state.bathrooms.trim();
    if(validations.isNumeric(bathrooms) && validations.maxLength(bathrooms, 3)) {
      this.setState({
        bathroomsErr: '',
        bathrooms: bathrooms,
      });
    } else {
      this.setState({
        bathroomsErr: 'Must only consist of numbers'
      });
    }
  }

  validateResidents() {
    let residents = this.state.residents.trim();
    if(validations.isNumeric(residents) && validations.maxLength(residents, 3)) {
      this.setState({
        residentsErr: '',
        residents: residents,
      });
    } else {
      this.setState({
        residentsErr: 'Must only consist of numbers'
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
        <div className="newEmployeeFormContainer">
          <div className="newEmployeeForm">
            <div className="newEmployeeFormBox">
              <Divider /><h2>Homeowner Information</h2><Divider />
              <TextField
                floatingLabelText="First Name"
                hintText="John"
                maxLength="25"
                onChange={this.handleTextChange.bind(this, "fname")}
                onBlur={this.validateFName.bind(this)}
                errorText={this.state.fnameErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Last Name"
                hintText="Doe"
                maxLength="25"
                onChange={this.handleTextChange.bind(this, "lname")}
                onBlur={this.validateLName.bind(this)}
                errorText={this.state.lnameErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                floatingLabelText="Address"
                hintText="123 Fake Street"
                maxLength="50"
                onChange={this.handleTextChange.bind(this, "address")}
                onBlur={this.validateAddress.bind(this)}
                errorText={this.state.addressErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Unit #"
                hintText="77"
                type="number"
                maxLength="10"
                onChange={this.handleTextChange.bind(this, "unitNum")}
                onBlur={this.validateUnit.bind(this)}
                errorText={this.state.unitNumErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                floatingLabelText="City"
                hintText="Toronto"
                maxLength="25"
                onChange={this.handleTextChange.bind(this, "city")}
                onBlur={this.validateCity.bind(this)}
                errorText={this.state.cityErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <SelectField
                value={this.state.selectValue}
                onChange={this.handleSelectChange}
                floatingLabelText="Province"
                floatingLabelFixed={false}
                hintText="Select a Province"
              >
                {provinces}
              </SelectField><br />
              <TextField
                floatingLabelText="Postal Code"
                hintText="M4B 5V9"
                maxLength="7"
                onChange={this.handleTextChange.bind(this, "postalCode")}
                onBlur={this.validatePostalCode.bind(this)}
                errorText={this.state.postalCodeErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Enbridge Gas #"
                hintText="1234567890"
                maxLength="15"
                onChange={this.handleTextChange.bind(this, "enbridge")}
                onBlur={this.validateEnbridge.bind(this)}
                errorText={this.state.enbridgeErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                floatingLabelText="Email"
                hintText="name@domain.com"
                type="email"
                maxLength="50"
                onChange={this.handleTextChange.bind(this, "email")}
                onBlur={this.validateEmail.bind(this)}
                errorText={this.state.emailErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Home Phone"
                hintText="(416) 123-4567"
                type="tel"
                maxLength="12"
                onChange={this.handleTextChange.bind(this, "homePhone")}
                onBlur={this.validateHomePhone.bind(this)}
                errorText={this.state.homePhoneErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                floatingLabelText="Cell Phone"
                hintText="(416) 123-4567"
                type="tel"
                maxLength="12"
                onChange={this.handleTextChange.bind(this, "cellPhone")}
                onBlur={this.validateCellPhone.bind(this)}
                errorText={this.state.cellPhoneErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="SQ Footage"
                hintText="3000"
                type="number"
                maxLength="6"
                onChange={this.handleTextChange.bind(this, "sqft")}
                onBlur={this.validateSqft.bind(this)}
                errorText={this.state.sqftErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                floatingLabelText="Bathrooms"
                hintText="3"
                type="number"
                maxLength="3"
                onChange={this.handleTextChange.bind(this, "bathrooms")}
                onBlur={this.validateBathrooms.bind(this)}
                errorText={this.state.bathroomsErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Residents"
                hintText="4"
                type="number"
                maxLength="3"
                onChange={this.handleTextChange.bind(this, "residents")}
                onBlur={this.validateResidents.bind(this)}
                errorText={this.state.residentsErr}
                errorStyle={{float: "left"}}
              /><br />
              <div className="radioActionText">
                <p className="radioRow">Pool</p>
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

              <Divider /><h2>Program Installation</h2><Divider />
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

              <Divider /><h2>Installation Checklist</h2><Divider />
              <div className="radioActionText">
                <p className="radioRow">Bypass Installed</p>
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
              <div className="radioActionText">
                <p className="radioRow">Leak Check Equipment</p>
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
              <div className="radioActionText">
                <p className="radioRow">System Flushed</p>
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
              <div className="radioActionText">
                <p className="radioRow">Conservation System Explanation</p>
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
              <div className="radioActionText">
                <p className="radioRow">Shut-off Valve Explanation</p>
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
              <div className="radioActionText">
                <p className="radioRow">Filter Replacement Explanation</p>
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

              <Divider /><h2>Customer Acknowledgement</h2><Divider />
              <div>
                <p>I hereby confirm the following statements:</p>
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
                &nbsp;
                &nbsp;
                <TextField
                  floatingLabelText="Technician's Signature"
                />
                &nbsp;
                &nbsp;
                <TextField
                  floatingLabelText="Greenlife Water Rep. Name"
                />
                &nbsp;
                &nbsp;
                <DatePicker
                  hintText="Date"
                  container="inline"
                />
              </div>
              <div>
                <RaisedButton label="Cancel" />
                &nbsp;
                &nbsp;
                <RaisedButton label="Save" />
                &nbsp;
                &nbsp;
                <RaisedButton label="Submit" />
              </div>
            </div>
          </div>
        </div>
        : null }
        { this.state.tabB ?
          <div>
            <h2>Installation Pictures</h2>
            <p>
              Pictures go here.
            </p>
          </div>
        : null }
      </div>
    );
  }
}
