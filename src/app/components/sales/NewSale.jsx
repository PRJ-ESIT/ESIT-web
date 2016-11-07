import React from 'react';
import {Tabs, Tab, TextField, Divider, RadioButton,
  RadioButtonGroup, RaisedButton, Card, CardActions,
  CardHeader, CardMedia, CardTitle, CardText, FlatButton,
  DatePicker, TimePicker, Toggle, Checkbox, SelectField,
  MenuItem} from 'material-ui';
import { validations } from '../helpers/common.js';

// Provinces for SelectField
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

export default class NewSale extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabA: true,
      tabB: false,
      tabValue: 'a',
      saleNumber: "",
      fname: '',
      lname: '',
      address: '',
      unitNum: '',
      city: '',
      province: -1,
      postalCode: '',
      enbridge: '',
      email: '',
      homePhone: '',
      cellPhone: '',
      installationDate: '',
      installationTime: '',
      notes: '',
      salesRepId: '',
      applicationNumber: '',
      homeownerSignature: '',
      programType: '',
      salesRepSignature: '',
      deliveryCharges: '150',
      installationCharges: '',
      totalCharges: '',

      // Error for fields
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
      salesRepIdErr: '',
      applicationNumberErr: '',
      programTypeErr: '',
      installationDateErr: '',
      installationTimeErr: '',

      // Validation fields
      fnameValidated: false,
      lnameValidated: false,
      addressValidated: false,
      unitValidated: false,
      cityValidated: false,
      provinceValidated: false,
      postalCodeValidated: false,
      enbridgeValidated: false,
      emailValidated: false,
      homePhoneValidated: false,
      cellPhoneValidated: false,
      salesRepIdValidatd: false,
      applicationNumberValidated: false,
      programTypeValidated: false,
      installationDateValidated: false,
      installationTimeValidated: false,

      allValidated: false,
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
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
    event.stopPropagation();
    var obj = {};
    obj[fieldname] = event.target.value;
    this.setState(obj);
  };

  handleRadioChange(fieldname, event) {
    event.stopPropagation();
    var obj = {};
    obj[fieldname] = event.target.value;
    this.setState(obj);

    // Change the installationCharges and totalCharges
    // depending on the Program chosen.
    if (event.target.value == "3") {
      this.state.installationCharges = 550;
    } else {
      this.state.installationCharges = 450;
    }

    this.state.totalCharges =
    parseInt(this.state.deliveryCharges) +
    parseInt(this.state.installationCharges);
  };

  // Validation

  validateFName() {
    let fname = this.state.fname.trim();
    if(validations.isAlphaSpacesHyphens(fname) &&
      validations.minLength(fname, 2) &&
      validations.maxLength(fname, 25)) {

      this.setState({
        fnameErr: '',
        fname: fname,
        fnameValidated: true,
      });
    } else {
      this.setState({
        fnameErr: '2 to 25 characters, spaces and hyphens only',
        fnameValidated: false,
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
        lnameValidated: true,
      });
    } else {
      this.setState({
        lnameErr: '2 to 25 characters, spaces and hyphens only',
        lnameValidated: false,
      });
    }
  }

  validateAddress() {
    let address = this.state.address.trim();
    if(validations.isAlphanumericSpacesHyphens(address) && validations.maxLength(address, 50)) {
      this.setState({
        addressErr: '',
        address: address,
        addressValidated: true,
      });
    } else {
      this.setState({
        addressErr: 'Can contain characters, numbers, spaces and hyphens only',
        addressValidated: false,
      });
    }
  }

  validateUnit() {
    let unitNum = this.state.unitNum.trim();
    if(unitNum === '' || (validations.isAlphanumeric(unitNum) && validations.maxLength(unitNum, 10))) {
      this.setState({
        unitNumErr: '',
        unitNum: unitNum,
        unitValidated: true,
      });
    } else {
      this.setState({
        unitNumErr: 'Can contain numbers/characters only',
        unitValidated: false,
      });
    }
  }

  validateCity() {
    let city = this.state.city.trim();
    if(validations.isAlphaSpacesHyphens(city) && validations.maxLength(city, 60)) {
      this.setState({
        cityErr: '',
        city: city,
        cityValidated: true,
      });
    } else {
      this.setState({
        cityErr: 'Up to 60 characters, spaces and hyphens only',
        cityValidated: false,
      });
    }
  }

  validateProvince() {
    let province = this.state.province;
    if(province < 0) {
      this.setState({
        provinceErr: 'Province not selected',
        provinceValidated: false,
      });
    } else {
      this.setState({
        provinceErr: '',
        provinceValidated: true,
      });
    }
  }

  validatePostalCode() {
    let postalCode = this.state.postalCode.trim();
    if(validations.isPostalCode(postalCode)) {
      this.setState({
        postalCodeErr: '',
        postalCode: postalCode.toUpperCase(),
        postalCodeValidated: true,
      });
    } else {
      this.setState({
        postalCodeErr: 'Not a valid postal code',
        postalCodeValidated: false,
      });
    }
  }

  validateEnbridge() {
    let enbridge = this.state.enbridge.trim();
    if(validations.isNumeric(enbridge)) {
      this.setState({
        enbridgeErr: '',
        enbridge: enbridge,
        enbridgeValidated: true,
      });
    } else {
      this.setState({
        enbridgeErr: 'Must only consist of numbers',
        enbridgeValidated: false,
      });
    }
  }

  validateSalesRepId() {
    let salesRepId = this.state.salesRepId.trim();
    if(validations.isNumeric(salesRepId)) {
      this.setState({
        salesRepIdErr: '',
        salesRepId: salesRepId,
        salesRepIdValidatd: true,
      });
    } else {
      this.setState({
        salesRepIdErr: 'Must only consist of numbers',
        salesRepIdValidatd: false,
      });
    }
  }

  validateApplicationNumber() {
    let applicationNumber = this.state.applicationNumber.trim();
    if(validations.isNumeric(applicationNumber)) {
      this.setState({
        applicationNumberErr: '',
        applicationNumber: applicationNumber,
        applicationNumberValidated: true,
      });
    } else {
      this.setState({
        applicationNumberErr: 'Must only consist of numbers',
        applicationNumberValidated: false,
      });
    }
  }

  validateEmail() {
    let email = this.state.email.trim();
    if(validations.isEmail(email) && validations.maxLength(email, 50)) {
      this.setState({
        emailErr: '',
        email: email,
        emailValidated: true,
      });
    } else {
      this.setState({
        emailErr: 'Not a valid email',
        emailValidated: false,
      });
    }
  }

  validateHomePhone() {
    let homePhone = this.state.homePhone.trim();
    if(validations.isPhoneNumber(homePhone) && validations.maxLength(homePhone, 12)) {
      this.setState({
        homePhoneErr: '',
        homePhone: homePhone,
        homePhoneValidated: true,
      });
    } else {
      this.setState({
        homePhoneErr: 'Not a valid phone number',
        homePhoneValidated: false,
      });
    }
  }

  validateCellPhone() {
    let cellPhone = this.state.cellPhone.trim();
    if(validations.isPhoneNumber(cellPhone) && validations.maxLength(cellPhone, 12)) {
      this.setState({
        cellPhoneErr: '',
        cellPhone: cellPhone,
        cellPhoneValidated: true,
      });
    } else {
      this.setState({
        cellPhoneErr: 'Not a valid phone number',
        cellPhoneValidated: false,
      });
    }
  }

  handleProvinceChange(event, index, value) {
    this.setState({province: value});
  };

  handleDateChange(event, date) {
    this.setState({installationDate: date});
  }

  handleTimeChange(event, time) {
    this.setState({installationTime: time});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.province !== this.state.province) {
      this.validateProvince();
    }

    if (prevState.programType !== this.state.programType) {
      this.validateProgramType();
    }

    if (prevState.installationDate !== this.state.installationDate) {
      this.validateInstallationDate();
    }

    if (prevState.installationTime !== this.state.installationTime) {
      this.validateInstallationTime();
    }
  }

  validateProgramType() {
    let programType = this.state.programType;
    if(programType === '') {
      this.setState({
        programTypeErr: 'Must select a program type',
        programTypeValidated: false,
      });
    } else {
      this.setState({
        programTypeErr: '',
        programTypeValidated: true,
      });
    }
  }

  validateInstallationDate() {
    let installationDate = this.state.installationDate;

    if (installationDate === '') {
      this.setState({
        installationDateErr: 'Must select an installation date',
        installationDateValidated: false,
      });
    } else {
      this.setState({
        installationDateErr: '',
        installationDateValidated: true,
      });
    }
  }

  validateInstallationTime() {
    let installationTime = this.state.installationTime;

    if (installationTime === '') {
      this.setState({
        installationTimeErr: 'Must select an installation time',
        installationTimeValidated: false,
      });
    } else {
      this.setState({
        installationTimeErr: '',
        installationTimeValidated: true,
      });
    }
  }

  validateAllFields() {
    console.log("validateAllFields");
    this.validateFName();
    this.validateLName();
    this.validateAddress();
    this.validateUnit();
    this.validateCity();
    this.validateProvince();
    this.validatePostalCode();
    this.validateEnbridge();
    this.validateHomePhone();
    this.validateCellPhone();
    this.validateEmail();
    this.validateProgramType();
    this.validateInstallationDate();
    this.validateInstallationTime();

    if (this.state.fnameValidated &&
        this.state.lnameValidated &&
        this.state.addressValidated &&
        this.state.unitValidated &&
        this.state.cityValidated &&
        this.state.provinceValidated &&
        this.state.postalCodeValidated &&
        this.state.enbridgeValidated &&
        this.state.homePhoneValidated &&
        this.state.cellPhoneValidated &&
        this.state.emailValidated &&
        this.state.programTypeValidated &&
        this.state.installationDateValidated &&
        this.state.installationTimeValidated) {
      this.setState({allValidated: true});
    } else {
      this.setState({allValidated: false});
    }
  }

  render() {
    return (
      <div>
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleTabChange}
          inkBarStyle={{ backgroundColor: "yellow" }}
        >
        <Tab label="Rental Agreement Form" value="a" className="tabs">
        </Tab>
        <Tab label="Pre-Authorized Debit Form" value="b" className="tabs">
        </Tab>
      </Tabs>
      { this.state.tabA ?
        <div className="newEmployeeFormContainer">
          <div className="newEmployeeForm">
            <div className="newEmployeeFormBox">
              <TextField
                floatingLabelText="Sale Number"
                defaultValue="123-4567"
                disabled={true}
              />
              <h2 className="headings">Homeowner Information</h2>
              <TextField
                hintText="John"
                floatingLabelText="First Name"
                value={this.state.fname}
                onChange={this.handleTextChange.bind(this, "fname")}
                onBlur={this.validateFName.bind(this)}
                errorText={this.state.fnameErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                hintText="Doe"
                floatingLabelText="Last Name"
                value={this.state.lname}
                onChange={this.handleTextChange.bind(this, "lname")}
                onBlur={this.validateLName.bind(this)}
                errorText={this.state.lnameErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                hintText="123 Fake Street"
                floatingLabelText="Address"
                value={this.state.address}
                onChange={this.handleTextChange.bind(this, "address")}
                onBlur={this.validateAddress.bind(this)}
                errorText={this.state.addressErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                hintText="77"
                floatingLabelText="Unit #"
                value={this.state.unitNum}
                onChange={this.handleTextChange.bind(this, "unitNum")}
                onBlur={this.validateUnit.bind(this)}
                errorText={this.state.unitNumErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                hintText="Toronto"
                floatingLabelText="City"
                value={this.state.city}
                onChange={this.handleTextChange.bind(this, "city")}
                onBlur={this.validateCity.bind(this)}
                errorText={this.state.cityErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <SelectField
                value={this.state.province}
                onChange={this.handleProvinceChange}
                floatingLabelText="Province"
                floatingLabelFixed={true}
                hintText="Select a Province"
                errorText={this.state.provinceErr}
                errorStyle={{float: "left"}}
              >
                {provinces}
              </SelectField>
              <br />
              <TextField
                hintText="M4B 5V9"
                floatingLabelText="Postal Code"
                value={this.state.postalCode}
                onChange={this.handleTextChange.bind(this, "postalCode")}
                onBlur={this.validatePostalCode.bind(this)}
                errorText={this.state.postalCodeErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                hintText="1234567890"
                floatingLabelText="Enbridge Gas Number"
                value={this.state.enbridge}
                onChange={this.handleTextChange.bind(this, "enbridge")}
                onBlur={this.validateEnbridge.bind(this)}
                errorText={this.state.enbridgeErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                hintText="(416) 123-4567"
                floatingLabelText="Home Phone"
                value={this.state.homePhone}
                onChange={this.handleTextChange.bind(this, "homePhone")}
                onBlur={this.validateHomePhone.bind(this)}
                errorText={this.state.homePhoneErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                hintText="(416) 123-4567"
                floatingLabelText="Cell Phone"
                value={this.state.cellPhone}
                onChange={this.handleTextChange.bind(this, "cellPhone")}
                onBlur={this.validateCellPhone.bind(this)}
                errorText={this.state.cellPhoneErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                hintText="name@domain.com"
                floatingLabelText="Email"
                value={this.state.email}
                onChange={this.handleTextChange.bind(this, "email")}
                onBlur={this.validateEmail.bind(this)}
                errorText={this.state.emailErr}
                errorStyle={{float: "left"}}
              />
              <h2 className="headings">Program Type</h2>
              <div>
                <RadioButtonGroup name="programType"
                  valueSelected={this.state.programType}
                  onChange={this.handleRadioChange.bind(this, "programType")}>
                  <RadioButton
                    value="1"
                    label="Whole Home Filter"
                  />
                  <RadioButton
                    value="2"
                    label="Whole Home Descaler"
                  />
                  <RadioButton
                    value="3"
                    label="Whole Home Combo"
                  />
                </RadioButtonGroup>
                <div style={{color:"red"}}>{this.state.programTypeErr}</div>
              </div>
              <h2 className="headings">Installation & Delivery</h2>
              <TextField
                floatingLabelText="Delivery Charges"
                value={this.state.deliveryCharges}
                disabled={true}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Installation Charges"
                value={this.state.installationCharges}
                disabled={true}
              />
              <br />
              <TextField
                floatingLabelText="Total Charges"
                value={this.state.totalCharges}
                disabled={true}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <div>*plus applicable taxes</div>
              <br />
              <div style={{ display: 'inline-block' }}>
                <DatePicker
                  hintText="2017-08-20" container="inline"
                  floatingLabelText="Installation Date"
                  value={this.state.installationDate}
                  onChange={this.handleDateChange.bind(this)}
                />
                <div style={{color:"red", float: "left"}}>
                  {this.state.installationDateErr}
                </div>
              </div>
              &nbsp;
              &nbsp;
              &nbsp;
              <div style={{ display: 'inline-block' }}>
                <TimePicker
                  hintText="Installation Time"
                  floatingLabelText="Installation Time"
                  value={this.state.installationTime}
                  onChange={this.handleTimeChange.bind(this)}
                />
                <div style={{color:"red", float: "left"}}>
                  {this.state.installationTimeErr}
                </div>
              </div>
              <br />
              <TextField
                hintText="Additional Notes"
                floatingLabelText="Notes"
                multiLine={true}
                rows={1}
                rowsMax={10}
                value={this.state.notes}
                onChange={this.handleTextChange.bind(this, "notes")}
                className="full-width"
              />
              <h2 className="headings">Authorization</h2>
              <Checkbox
                label="Homeowner Signature"
                labelPosition="left"
                labelStyle={{width:"auto"}}
                style={{display:"inline-block", width:"256px"}}
                checked={true}
                disabled={true}
                value={this.state.homeownerSignature}
                onCheck={this.handleTextChange.bind(this, "homeownerSignature")}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Date Signed"
                defaultValue="10/13/2016"
                disabled={true}
              />
              <br />
              <Checkbox
                label="Sales Rep Signature&nbsp;&nbsp;&nbsp;"
                labelPosition="left"
                labelStyle={{width:"auto"}}
                style={{display:"inline-block", width:"256px"}}
                checked={true}
                disabled={true}
                value={this.state.salesRepSignature}
                onCheck={this.handleTextChange.bind(this, "salesRepSignature")}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                hintText="1234567"
                floatingLabelText="Sales Rep ID"
                value={this.state.salesRepId}
                onChange={this.handleTextChange.bind(this, "salesRepId")}
                onBlur={this.validateSalesRepId.bind(this)}
                errorText={this.state.salesRepIdErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <br />
              <Divider />
              <br />
              <RaisedButton label="Cancel" secondary={true} />
              &nbsp;
              &nbsp;
              &nbsp;
              <RaisedButton label="Save" onClick={this.validateAllFields.bind(this)} />
              &nbsp;
              &nbsp;
              &nbsp;
              { this.state.allValidated ?
              <RaisedButton label="Submit" primary={true} />
              : null }
              <br />
            </div>
          </div>
        </div>
      : null }
      { this.state.tabB ?
        <div className="newEmployeeFormContainer">
          <div className="newEmployeeForm">
            <div className="newEmployeeFormBox">
              <TextField
                disabled={true}
                defaultValue="123-4567"
                floatingLabelText="Sale Number"
              />
              <br />
              <TextField
                hintText="1234567"
                floatingLabelText="Application Number"
                value={this.state.applicationNumber}
                onChange={this.handleTextChange.bind(this, "applicationNumber")}
                onBlur={this.validateApplicationNumber.bind(this)}
                errorText={this.state.applicationNumberErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <DatePicker
                hintText="2010-08-20"
                container="inline"
                floatingLabelText="Date"
                style={{ display: "inline-block" }}
                // value={this.state.installationDate}
                // onChange={this.handleTextChange.bind(this, "installationDate")}
              />
              <h2 className="headings">Homeowner Information</h2>
              <TextField
                hintText="John"
                floatingLabelText="First Name"
                value={this.state.fname}
                onChange={this.handleTextChange.bind(this, "fname")}
                onBlur={this.validateFName.bind(this)}
                errorText={this.state.fnameErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                hintText="Doe"
                floatingLabelText="Last Name"
                value={this.state.lname}
                onChange={this.handleTextChange.bind(this, "lname")}
                onBlur={this.validateLName.bind(this)}
                errorText={this.state.lnameErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                hintText="123 Fake Street"
                floatingLabelText="Address"
                value={this.state.address}
                onChange={this.handleTextChange.bind(this, "address")}
                onBlur={this.validateAddress.bind(this)}
                errorText={this.state.addressErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                hintText="77"
                floatingLabelText="Unit #"
                value={this.state.unitNum}
                onChange={this.handleTextChange.bind(this, "unitNum")}
                onBlur={this.validateUnit.bind(this)}
                errorText={this.state.unitNumErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                hintText="Toronto"
                floatingLabelText="City"
                value={this.state.city}
                onChange={this.handleTextChange.bind(this, "city")}
                onBlur={this.validateCity.bind(this)}
                errorText={this.state.cityErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <SelectField
                value={this.state.province}
                onChange={this.handleProvinceChange}
                floatingLabelText="Province"
                floatingLabelFixed={true}
                hintText="Select a Province"
                errorText={this.state.provinceErr}
                errorStyle={{float: "left"}}
              >
                {provinces}
              </SelectField>
              <br />
              <TextField
                hintText="M4B 5V9"
                floatingLabelText="Postal Code"
                value={this.state.postalCode}
                onChange={this.handleTextChange.bind(this, "postalCode")}
                onBlur={this.validatePostalCode.bind(this)}
                errorText={this.state.postalCodeErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                hintText="1234567890"
                floatingLabelText="Enbridge Gas Number"
                value={this.state.enbridge}
                onChange={this.handleTextChange.bind(this, "enbridge")}
                onBlur={this.validateEnbridge.bind(this)}
                errorText={this.state.enbridgeErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                hintText="(416) 123-4567"
                floatingLabelText="Home Phone"
                value={this.state.homePhone}
                onChange={this.handleTextChange.bind(this, "homePhone")}
                onBlur={this.validateHomePhone.bind(this)}
                errorText={this.state.homePhoneErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TextField
                hintText="(416) 123-4567"
                floatingLabelText="Cell Phone"
                value={this.state.cellPhone}
                onChange={this.handleTextChange.bind(this, "cellPhone")}
                onBlur={this.validateCellPhone.bind(this)}
                errorText={this.state.cellPhoneErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                hintText="name@domain.com"
                floatingLabelText="Email"
                value={this.state.email}
                onChange={this.handleTextChange.bind(this, "email")}
                onBlur={this.validateEmail.bind(this)}
                errorText={this.state.emailErr}
                errorStyle={{float: "left"}}
              />
              <h2 className="headings">Void Cheque</h2>
              <Card>
                <CardMedia style={{maxWidth:"550px"}}>
                  <img src="http://dc466.4shared.com/img/L8gcz3sL/s23/135ac1260a0/bbf_void_cheque" />
                </CardMedia>
                <CardTitle title="Void Cheque" subtitle="Customer Number: 123-4567" />
                <CardText>
                  Void cheque provided by customer.
                </CardText>
                <CardActions>
                  <FlatButton label="Download" />
                </CardActions>
              </Card>
              <h2 className="headings">Authorization</h2>
              <Checkbox
                label="Homeowner Signature"
                labelPosition="left"
                labelStyle={{width:"auto"}}
                style={{display:"inline-block", width:"256px"}}
                checked={true}
                disabled={true}
                value={this.state.homeownerSignature}
                onCheck={this.handleTextChange.bind(this, "homeownerSignature")}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <div style={{ display: 'inline-block' }}>
                <DatePicker
                  hintText="2017-08-20" container="inline"
                  floatingLabelText="Installation Date"
                  value={this.state.installationDate}
                  onChange={this.handleDateChange.bind(this)}
                />
                <div style={{color:"red", float: "left"}}>
                  {this.state.installationDateErr}
                </div>
              </div>
              <br />
              <br />
              <Divider />
              <br />
              <RaisedButton label="Cancel" secondary={true} />
              &nbsp;
              &nbsp;
              &nbsp;
              <RaisedButton label="Save" onClick={this.validateAllFields.bind(this)} />
              &nbsp;
              &nbsp;
              &nbsp;
              { this.state.allValidated ?
              <RaisedButton label="Submit" primary={true} />
              : null }
            </div>
          </div>
        </div>
      : null }
      </div>
    );
  }
}
