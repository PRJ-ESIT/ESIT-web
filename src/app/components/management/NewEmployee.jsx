import React from 'react';
import { Toolbar, ToolbarTitle, TextField, DropDownMenu, MenuItem, RaisedButton, SelectField } from 'material-ui';
import { validations } from '../helpers/common.js';
import { IP } from '../../../../config/config.js';

const styles = {
  customWidth: {
    width: 280,
  },
  menuStyle: {
    width: '200px'
  }
};

const provinces = [
  <MenuItem key={1} value={"Alberta"} primaryText="Alberta" />,
  <MenuItem key={2} value={"British Columbia"} primaryText="British Columbia" />,
  <MenuItem key={3} value={"Manitoba"} primaryText="Manitoba" />,
  <MenuItem key={4} value={"New Brunswick"} primaryText="New Brunswick" />,
  <MenuItem key={5} value={"Newfoundland and Labrador"} primaryText="Newfoundland and Labrador" />,
  <MenuItem key={6} value={"Nova Scotia"} primaryText="Nova Scotia" />,
  <MenuItem key={7} value={"Ontario"} primaryText="Ontario" />,
  <MenuItem key={8} value={"Prince Edward Island"} primaryText="Prince Edward Island" />,
  <MenuItem key={9} value={"Quebec"} primaryText="Quebec" />,
  <MenuItem key={10} value={"Saskatchewan"} primaryText="Saskatchewan" />,
  <MenuItem key={11} value={"Northwest Territories"} primaryText="Northwest Territories" />,
  <MenuItem key={12} value={"Yukon"} primaryText="Yukon" />,
  <MenuItem key={13} value={"Nunavut"} primaryText="Nunavut" />,
];

export default class NewEmployee extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      employeeId: '',
      employeeType: '',
      //state variables below keep the values of each input field
      fname: '',
      lname: '',
      address: '',
      unitNum: '',
      city: '',
      province: '',
      postalCode: '',
      email: '',
      homePhone: '',
      cellPhone: '',
      password: '',
      repeatPassword: '',

      //error messages for each input field
      employeeTypeErr: '',
      fnameErr: '',
      lnameErr: '',
      addressErr: '',
      unitNumErr: '',
      cityErr: '',
      provinceErr: '',
      postalCodeErr: '',
      emailErr: '',
      homePhoneErr: '',
      cellPhoneErr: '',
      passwordErr: '',
      repeatPasswordErr: '',
      validated: false,
    };
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.validateAndSubmit = this.validateAndSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    if(this.props.status == "edit"){
      var httpRequest = new XMLHttpRequest();
      let _this = this;
      httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let employee = JSON.parse(httpRequest.responseText).employee;

          _this.setState({
            employeeId: employee.employeeId ? employee.employeeId : '',
            employeeType: employee.role ? employee.role : '',
            fname: employee.firstName ? employee.firstName : '',
            lname: employee.lastName ? employee.lastName : '',
            email: employee.email ? employee.email : '',
            homePhone: employee.homePhone ? employee.homePhone : '',
            cellPhone: employee.cellPhone ? employee.cellPhone : '',
          });
        }
      };

      httpRequest.open('GET', "http://" + IP + "/getoneemployee?id="
        + this.props.id, true);
      httpRequest.send(null);
    }
  }

  handleDropDownChange(event, index, value){
    console.log(value);
    this.setState({employeeType: value});
  }

  handleSelectChange(event, index, value) {
    console.log(value);
    this.setState({province: value});
  }

  handleTextChange(fieldname, event) {
    var obj = {};
    obj[fieldname] = event.target.value;
    this.setState(obj);
  };

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

  validateEmployeeType() {
    let empType = this.state.employeeType.trim();
    if(validations.isWords(empType) && validations.maxLength(empType, 30)) {
      this.setState({
        employeeTypeErr: '',
        employeeType: empType,
        validated: true,
      });
      return true;
    } else {
      this.setState({
        employeeTypeErr: 'Not a valid province name',
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

  validatePassword() {
    if(validations.isPassword(this.state.password) &&
      validations.maxLength(this.state.password, 20)) {

      let repeatPswd = this.state.repeatPassword;
      let repeatPasswordErr = '';
      let validated = true;

      if(!(validations.isExisty(repeatPswd) &&
        !validations.isEmpty(repeatPswd) &&
        repeatPswd == this.state.password)) {

        repeatPasswordErr = 'Doesn\'t match the password entered';
        validated = false;
      }

      this.setState({
        passwordErr: '',
        repeatPasswordErr: repeatPasswordErr,
        validated: validated,
      });
    } else {
      this.setState({
        passwordErr: 'At least 1 character, 1 number, one of the special characters !@#$%^&* and have at least 8 characters',
        validated: false,
      });
    }
  }

  validatePasswordRepeat() {
    let repeatPswd = this.state.repeatPassword;
    if(validations.isExisty(repeatPswd) &&
      !validations.isEmpty(repeatPswd) &&
      repeatPswd == this.state.password) {

      this.setState({
        repeatPasswordErr: '',
        validated: true,
      });
    } else {
      this.setState({
        repeatPasswordErr: 'Doesn\'t match the password entered',
        validated: false,
      });
    }
  }

  validateAndSubmit() {
    if(!validations.isEmpty(this.state.fname) &&
      !validations.isEmpty(this.state.lname) &&
      !validations.isEmpty(this.state.address) &&
      !validations.isEmpty(this.state.unitNum) &&
      !validations.isEmpty(this.state.city) &&
      !validations.isEmpty(this.state.province) &&
      !validations.isEmpty(this.state.postalCode) &&
      !validations.isEmpty(this.state.email) &&
      !validations.isEmpty(this.state.homePhone) &&
      !validations.isEmpty(this.state.cellPhone) &&
      !validations.isEmpty(this.state.password) &&
      !validations.isEmpty(this.state.repeatPassword) &&
      this.state.validated) {

      console.log('everything is fine, we will be sending an http post request here');
    } else {
      console.log('it didn\'t work');
    }
  }

  render() {
    return (
      <div className="newEmployee">
        <Toolbar className="newEmployeeToolBar">
          <ToolbarTitle text="Create New Employee" />
        </Toolbar>
        <div className="newEmployeeFormContainer">
          <div className="newEmployeeForm">
            <div className="newEmployeeFormBox">
              <SelectField
                errorText={this.state.provinceErr}
                errorStyle={{float: "left"}}
                value={this.state.employeeType}
                onChange={this.handleDropDownChange}
                floatingLabelText="Employee"
                floatingLabelFixed={false}
                hintText="Select Employee Type"
                maxHeight={150}
              >
                <MenuItem value={"salesperson" } primaryText="Sales Agent" />
                <MenuItem value={"installer"} primaryText="Installation Agent" />
                <MenuItem value={"admin"} primaryText="Administrator" />
              </SelectField>
              &nbsp;
              &nbsp;
              <TextField
                disabled={true}
                value={this.state.employeeId}
                floatingLabelText="Employee ID"
              /><br />
              <TextField
                hintText="John"
                floatingLabelText="First Name"
                maxLength="25"
                value={this.state.fname}
                onChange={this.handleTextChange.bind(this, 'fname')}
                onBlur={this.validateFName.bind(this)}
                errorText={this.state.fnameErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                hintText="Smith"
                floatingLabelText="Last Name"
                maxLength="25"
                value={this.state.lname}
                onChange={this.handleTextChange.bind(this, 'lname')}
                onBlur={this.validateLName.bind(this)}
                errorText={this.state.lnameErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                hintText="Street"
                floatingLabelText="Address"
                maxLength="50"
                onChange={this.handleTextChange.bind(this, 'address')}
                onBlur={this.validateAddress.bind(this)}
                errorText={this.state.addressErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                hintText="Unit #"
                floatingLabelText="Unit #"
                maxLength="10"
                onChange={this.handleTextChange.bind(this, 'unitNum')}
                onBlur={this.validateUnit.bind(this)}
                errorText={this.state.unitNumErr}
                errorStyle={{float: "left"}}
              /><br />

              <TextField
                hintText="City"
                floatingLabelText="City"
                maxLength="60"
                onChange={this.handleTextChange.bind(this, 'city')}
                onBlur={this.validateCity.bind(this)}
                errorText={this.state.cityErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                hintText="Postal Code"
                floatingLabelText="Postal Code"
                maxLength="7"
                onChange={this.handleTextChange.bind(this, 'postalCode')}
                onBlur={this.validatePostalCode.bind(this)}
                errorText={this.state.postalCodeErr}
                errorStyle={{float: "left"}}
              /><br />
              <SelectField
                errorText={this.state.provinceErr}
                errorStyle={{float: "left"}}
                value={this.state.province}
                onChange={this.handleSelectChange}
                floatingLabelText="Province"
                floatingLabelFixed={false}
                hintText="Select a Province"
                maxHeight={150}
              >
                {provinces}
              </SelectField><br />
              <TextField
                hintText="john@example.com"
                floatingLabelText="Email"
                type="email"
                maxLength="50"
                value={this.state.email}
                onChange={this.handleTextChange.bind(this, 'email')}
                onBlur={this.validateEmail.bind(this)}
                errorText={this.state.emailErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                hintText="555-555-1234"
                floatingLabelText="Home Phone"
                type="tel"
                maxLength="12"
                value={this.state.homePhone}
                onChange={this.handleTextChange.bind(this, 'homePhone')}
                onBlur={this.validateHomePhone.bind(this)}
                errorText={this.state.homePhoneErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                hintText="555-555-1234"
                floatingLabelText="Cell Phone"
                type="tel"
                maxLength="12"
                value={this.state.cellPhone}
                onChange={this.handleTextChange.bind(this, 'cellPhone')}
                onBlur={this.validateCellPhone.bind(this)}
                errorText={this.state.cellPhoneErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                hintText=""
                floatingLabelText="Password"
                type="password"
                maxLength="20"
                onChange={this.handleTextChange.bind(this, 'password')}
                onBlur={this.validatePassword.bind(this)}
                errorText={this.state.passwordErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                hintText=""
                floatingLabelText="Repeat Password"
                type="password"
                maxLength="20"
                onChange={this.handleTextChange.bind(this, 'repeatPassword')}
                onBlur={this.validatePasswordRepeat.bind(this)}
                errorText={this.state.repeatPasswordErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <br />
              <br />
              <RaisedButton
                style={{float: 'left'}}
                label="Cancel"
                secondary={true}
              />
              <RaisedButton
                onClick={this.validateAndSubmit}
                style={{float: 'right'}}
                label="Create"
                primary={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
