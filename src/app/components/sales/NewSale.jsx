import React from 'react';
import {Tabs, Tab, TextField, Divider, RadioButton,
  RadioButtonGroup, RaisedButton, Card, CardActions,
  CardHeader, CardMedia, CardTitle, CardText, FlatButton,
  DatePicker, TimePicker, Toggle, Checkbox, SelectField,
  MenuItem} from 'material-ui';

import { validations } from '../helpers/common.js';

const styles = {
headline: {
  fontSize: 24,
  paddingTop: 16,
  marginBottom: 12,
  fontWeight: 400,
},
};

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
      value: 'a',
      saleNumber: "",
      fname: '',
      lname: '',
      address: '',
      unitNum: '',
      city: '',
      province: '',
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
      homeownerSignature:'',
      programType:'',
      salesRepSignature:'',

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
      validated: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(value){
    this.setState({
      value: value,
    });
  };

  handleTextChange(fieldname, event) {
    event.stopPropagation();
    var obj = {};
    obj[fieldname] = event.target.value;
    this.setState(obj);
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
        validated: true,
      });
    } else {
      this.setState({
        fnameErr: '2 to 25 characters, spaces and hyphens only',
        validated: false,
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
        validated: true,
      });
    } else {
      this.setState({
        lnameErr: '2 to 25 characters, spaces and hyphens only',
        validated: false,
      });
    }
  }

  validateAddress() {
    let address = this.state.address.trim();
    if(validations.isAlphanumericSpacesHyphens(address) && validations.maxLength(address, 50)) {
      this.setState({
        addressErr: '',
        address: address,
        validated: true,
      });
    } else {
      this.setState({
        addressErr: 'Can contain characters, numbers, spaces and hyphens only',
        validated: false,
      });
    }
  }

  validateUnit() {
    let unitNum = this.state.unitNum.trim();
    if(validations.isAlphanumeric(unitNum) && validations.maxLength(unitNum, 10)) {
      this.setState({
        unitNumErr: '',
        unitNum: unitNum,
        validated: true,
      });
    } else {
      this.setState({
        unitNumErr: 'Has to be 1 word containing numbers/characters only',
        validated: false,
      });
    }
  }

  validateCity() {
    let city = this.state.city.trim();
    if(validations.isAlphaSpacesHyphens(city) && validations.maxLength(city, 60)) {
      this.setState({
        cityErr: '',
        city: city,
        validated: true,
      });
    } else {
      this.setState({
        cityErr: 'Up to 60 characters, spaces and hyphens only',
        validated: false,
      });
    }
  }

  validateProvince() {
    let province = this.state.province.trim();
    if(validations.isWords(province) && validations.maxLength(province, 30)) {
      this.setState({
        provinceErr: '',
        province: province,
        validated: true,
      });
      return true;
    } else {
      this.setState({
        provinceErr: 'Not a valid province name',
        validated: false,
      });
      return false;
    }
  }

  validatePostalCode() {
    let postalCode = this.state.postalCode.trim();
    if(validations.isPostalCode(postalCode)) {
      this.setState({
        postalCodeErr: '',
        postalCode: postalCode.toUpperCase(),
        validated: true,
      });
    } else {
      this.setState({
        postalCodeErr: 'Not a valid postal code',
        validated: false,
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

  validateSalesRepId() {
    let salesRepId = this.state.salesRepId.trim();
    if(validations.isNumeric(salesRepId)) {
      this.setState({
        salesRepIdErr: '',
        salesRepId: salesRepId,
      });
    } else {
      this.setState({
        salesRepIdErr: 'Must only consist of numbers'
      });
    }
  }

  validateApplicationNumber() {
    let applicationNumber = this.state.applicationNumber.trim();
    if(validations.isNumeric(applicationNumber)) {
      this.setState({
        applicationNumberErr: '',
        applicationNumber: applicationNumber,
      });
    } else {
      this.setState({
        applicationNumberErr: 'Must only consist of numbers'
      });
    }
  }

  validateEmail() {
    let email = this.state.email.trim();
    if(validations.isEmail(email) && validations.maxLength(email, 50)) {
      this.setState({
        emailErr: '',
        email: email,
        validated: true,
      });
    } else {
      this.setState({
        emailErr: 'Not a valid email',
        validated: false,
      });
    }
  }

  validateHomePhone() {
    let homePhone = this.state.homePhone.trim();
    if(validations.isPhoneNumber(homePhone) && validations.maxLength(homePhone, 12)) {
      this.setState({
        homePhoneErr: '',
        homePhone: homePhone,
        validated: true,
      });
    } else {
      this.setState({
        homePhoneErr: 'Not a valid phone number',
        validated: false,
      });
    }
  }

  validateCellPhone() {
    let cellPhone = this.state.cellPhone.trim();
    if(validations.isPhoneNumber(cellPhone) && validations.maxLength(cellPhone, 12)) {
      this.setState({
        cellPhoneErr: '',
        cellPhone: cellPhone,
        validated: true,
      });
    } else {
      this.setState({
        cellPhoneErr: 'Not a valid phone number',
        validated: false,
      });
    }
  }

  handleSelectChange(event, index, value) {
    this.setState({selectValue: value});
  };

  render() {
    return (
      <div>
        <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        >
        <Tab label="Rental Agreement Form" value="a" >
        <div className="newEmployeeFormContainer">
          <div className="newEmployeeForm">
            <div className="newEmployeeFormBox">
              <TextField
                // hintText="123-4567"
                //errorText="This field is required"
                floatingLabelText="Sale Number"
                defaultValue="123-4567"
                //value={this.state.saleNumber}
                disabled={true}
                //onChange={this.handleTextChange.bind(this, "saleNumber")}
              />
              <br />
              <br />
              <h2>Homeowner Information</h2>
              <Divider />
              <br />
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
                value={this.state.selectValue}
                onChange={this.handleSelectChange}
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
              <br />
              <br />
              <h2>Program Type</h2>
              <Divider />
              <br />
              <RadioButtonGroup name="programType"
                valueSelected={this.state.programType}
                onChange={this.handleTextChange.bind(this, "programType")}>
                <RadioButton
                  value="1"
                  label="Whole Home Filter"
                  style={styles.radioButton}
                />
                <RadioButton
                  value="2"
                  label="Whole Home Descaler"
                  style={styles.radioButton}
                />
                <RadioButton
                  value="3"
                  label="Whole Home Combo"
                  style={styles.radioButton}
                />
              </RadioButtonGroup>
              <br />
              <br />
              <h2>Installation & Delivery</h2>
              <Divider />
              <br />
              <DatePicker
                hintText="2010-08-20" container="inline"
                floatingLabelText="Installation Date"
                style={{ display: 'inline-block' }}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <TimePicker
                hintText="Installation Time"
                floatingLabelText="Installation Time"
                style={{ display: 'inline-block' }}
              />
              <br />
              <TextField
                hintText="Notes"
                multiLine={true}
                rows={5}
                floatingLabelText="Notes"
                value={this.state.notes}
                onChange={this.handleTextChange.bind(this, "notes")}
                style={{ width: '100%' }}
              />
              <br />
              <br />
              <h2>Authorization</h2>
              <Divider />
              <br />
              <br />
              <Checkbox
                label="Homeowner Signature"
                style={styles.checkbox}
                labelPosition="left"
                checked={true}
                disabled={true}
                value={this.state.homeownerSignature}
                onCheck={this.handleTextChange.bind(this, "homeownerSignature")}
              />
              <TextField
                floatingLabelText="Date Signed"
                defaultValue="10/13/2016"
                disabled={true}
              />
              <br />
              <br />
              <Checkbox
                label="Sales Rep Signature"
                style={styles.checkbox}
                labelPosition="left"
                checked={true}
                disabled={true}
                value={this.state.salesRepSignature}
                onCheck={this.handleTextChange.bind(this, "salesRepSignature")}
              />
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
              <RaisedButton label="Save" />
              &nbsp;
              &nbsp;
              &nbsp;
              <RaisedButton label="Submit" primary={true} />
              <br />
            </div>
          </div>
        </div>
        </Tab>
        <Tab label="Pre-Authorized Debit Form" value="b">
          <div className="newEmployeeFormContainer">
            <div className="newEmployeeForm">
              <div className="newEmployeeFormBox">
                <br />
                <TextField
                  disabled={true}
                  defaultValue="123-4567"
                  floatingLabelText="Sale Number"
                  //value={this.state.saleNumber}
                  //onChange={this.handleTextChange.bind(this, "saleNumber")}
                />
                &nbsp;
                &nbsp;
                &nbsp;
                <TextField
                  hintText="1234567"
                  floatingLabelText="Application Number"
                  value={this.state.applicationNumber}
                  onChange={this.handleTextChange.bind(this, "applicationNumber")}
                  onBlur={this.validateApplicationNumber.bind(this)}
                  errorText={this.state.applicationNumberErr}
                  errorStyle={{float: "left"}}
                />
                <br />
                <DatePicker
                  hintText="2010-08-20" container="inline"
                  //errorText="This field is required"
                  floatingLabelText="Date"
                  // value={this.state.installationDate}
                  // onChange={this.handleTextChange.bind(this, "installationDate")}
                />
                <br />
                <br />
                <h2>Homeowner Information</h2>
                <Divider />
                <br />
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
                  value={this.state.unit}
                  onChange={this.handleTextChange.bind(this, "unit")}
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
                  value={this.state.selectValue}
                  onChange={this.handleSelectChange}
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
                <br />
                <br />
                <h2>Void Cheque</h2>
                <Divider />
                <br />
                <Card>
                  <CardMedia>
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
                <br />
                <br />
                <h2>Authorization</h2>
                <Divider />
                <br />
                <Checkbox
                  label="Homeowner Signature"
                  style={styles.checkbox}
                  labelPosition="left"
                  checked={true}
                  disabled={true}
                  value={this.state.homeownerSignature}
                  onCheck={this.handleTextChange.bind(this, "homeownerSignature")}
                />
                &nbsp;
                &nbsp;
                &nbsp;
                <DatePicker
                  hintText="2010-08-20" container="inline"
                  floatingLabelText="Installation Date"
                />
                <br />
                <br />
                <Divider />
                <br />
                <RaisedButton label="Cancel" secondary={true} />
                &nbsp;
                &nbsp;
                &nbsp;
                <RaisedButton label="Save" />
                &nbsp;
                &nbsp;
                &nbsp;
                <RaisedButton label="Submit" primary={true} />
                </div>
              </div>
          </div>
        </Tab>
      </Tabs>
      </div>
    );
  }
}
