import React from 'react';
import {
  Toolbar, ToolbarTitle, TextField, MenuItem,
  RaisedButton, SelectField, DatePicker,
} from 'material-ui';
import { validations } from '../helpers/common.js';
import { IP } from '../../../../config/config.js';
import { dateHelpers } from '../helpers/common.js';

// Provinces for SelectField
const provinces = [
  <MenuItem key={1} value={"AB"} primaryText="Alberta" />,
  <MenuItem key={2} value={"BC"} primaryText="British Columbia" />,
  <MenuItem key={3} value={"MB"} primaryText="Manitoba" />,
  <MenuItem key={4} value={"NB"} primaryText="New Brunswick" />,
  <MenuItem key={5} value={"NL"} primaryText="Newfoundland and Labrador" />,
  <MenuItem key={6} value={"NS"} primaryText="Nova Scotia" />,
  <MenuItem key={7} value={"ON"} primaryText="Ontario" />,
  <MenuItem key={8} value={"PE"} primaryText="Prince Edward Island" />,
  <MenuItem key={9} value={"QC"} primaryText="Quebec" />,
  <MenuItem key={10} value={"SK"} primaryText="Saskatchewan" />,
  <MenuItem key={11} value={"NT"} primaryText="Northwest Territories" />,
  <MenuItem key={12} value={"YT"} primaryText="Yukon" />,
  <MenuItem key={13} value={"NU"} primaryText="Nunavut" />,
];

export default class NewEmployee extends React.Component {

  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    this.state = {
      //state variables below keep the values of each field
      employeeType: '',
      hireDate: {},
      minDate: minDate,
      maxDate: maxDate,
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
      isActive: true,

      //error messages for each input field
      employeeTypeErr: '',
      hireDateErr: '',
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

      // Validation fields
      employeeTypeValidated: false,
      hireDateValidated: false,
      fnameValidated: false,
      lnameValidated: false,
      addressValidated: false,
      unitValidated: false,
      cityValidated: false,
      proviceValidated: false,
      postalCodeValidated: false,
      emailValidated: false,
      homePhoneValidated: false,
      cellPhoneValidated: false,
      passwordValidated: false,
      passwordRepeatValidated: false,
    };
  }

  componentDidMount() {
    if(this.props.status == "edit"){
      var httpRequest = new XMLHttpRequest();
      let _this = this;
      httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let employee = JSON.parse(httpRequest.responseText).employee;
          // Format time
          var tempDateTime = new Date(employee.hireDate);

          _this.setState({
            employeeType: employee.role ? employee.role : '',
            hireDate: tempDateTime ? tempDateTime : '',
            fname: employee.firstName ? employee.firstName : '',
            lname: employee.lastName ? employee.lastName : '',
            email: employee.email ? employee.email : '',
            homePhone: employee.homePhone ? employee.homePhone : '',
            cellPhone: employee.cellPhone ? employee.cellPhone : '',
            address: employee.address ? employee.address : '',
            unitNum: employee.unit ? employee.unit : '',
            city: employee.city ? employee.city : '',
            province: employee.province ? employee.province : '',
            postalCode: employee.postalCode ? employee.postalCode : '',
          });
        }
      };

      httpRequest.open('GET', "http://" + IP + "/getoneemployee?id="
        + this.props.id, true);
      httpRequest.send(null);
    }
  }

  handleSelectChange(fieldname, event, index, value) {
    var obj = {};
    obj[fieldname + "Err"] = '';
    obj[fieldname + "Validated"] = true;
    obj[fieldname] = value;
    this.setState(obj);
  }

  handleDateChange(fieldname, event, date) {
    var obj = {};
    obj[fieldname + "Err"] = '';
    obj[fieldname + "Validated"] = true;
    obj[fieldname] = date;
    this.setState(obj);
  }

  handleTextChange(fieldname, event) {
    var obj = {};
    obj[fieldname] = event.target.value;
    this.setState(obj);
  }

  validateEmployeeType() {
    let employeeType = this.state.employeeType;
    if (validations.validateEmployeeType(employeeType)) {
      this.setState({
        employeeTypeErr: '',
        employeeType: employeeType,
        employeeTypeValidated: true,
      });
    } else {
      this.setState({
        employeeTypeErr: 'Must select Employee Type',
        employeeTypeValidated: false,
      });
    }
  }

  validateHireDate() {
    let hireDate = this.state.hireDate;
    if (validations.validateHireDate(hireDate)) {
      this.setState({
        hireDateErr: '',
        hireDateValidated: true,
      });
    } else {
      this.setState({
        hireDateErr: 'Must set a hire date',
        hireDateValidated: false,
      });
    }
  }

  validateFName() {
    let fname = this.state.fname.trim();
    if (validations.validateFName(fname)) {
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
    if (validations.validateLName(lname)) {
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
    if (validations.validateAddress(address)) {
      this.setState({
        addressErr: '',
        address: address,
        addressValidated: true,
      });
    } else {
      this.setState({
        addressErr: 'Only characters, numbers, spaces and hyphens',
        addressValidated: false,
      });
    }
  }

  validateUnit() {
    let unitNum = this.state.unitNum.trim();
    if (validations.validateUnit(unitNum)) {
      this.setState({
        unitNumErr: '',
        unitNum: unitNum,
        unitValidated: true,
      });
    } else {
      this.setState({
        unitNumErr: 'Has to be 1 word containing numbers/characters only',
        unitValidated: false,
      });
    }
  }

  validateCity() {
    let city = this.state.city.trim();
    if (validations.validateCity(city)) {
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
    if (validations.validateProvince(province)) {
      this.setState({
        provinceErr: '',
        province: province,
        provinceValidated: true,
      });
    } else {
      this.setState({
        provinceErr: 'Not a valid province name',
        provinceValidated: false,
      });
    }
  }

  validatePostalCode() {
    let postalCode = this.state.postalCode.trim();
    postalCode = postalCode.toUpperCase();
    if (validations.validatePostalCode(postalCode)) {
      this.setState({
        postalCodeErr: '',
        postalCode: postalCode,
        postalCodeValidated: true,
      });
    } else {
      this.setState({
        postalCodeErr: 'Not a valid postal code',
        postalCodeValidated: false,
      });
    }
  }

  validateEmail() {
    let email = this.state.email.trim();
    if (validations.validateEmail(email)) {
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
    if (validations.validateHomePhone(homePhone)) {
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
    if (validations.validateCellPhone(cellPhone)) {
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

  validatePassword() {
    if (validations.isPassword(this.state.password) &&
      validations.maxLength(this.state.password, 20)) {

      let repeatPswd = this.state.repeatPassword;
      let repeatPasswordErr = '';
      let validated = true;

      if (!(validations.isExisty(repeatPswd) &&
        !validations.isEmpty(repeatPswd) &&
        repeatPswd == this.state.password)) {

        repeatPasswordErr = 'Doesn\'t match the password entered';
        validated = false;
      }

      this.setState({
        passwordErr: '',
        repeatPasswordErr: repeatPasswordErr,
        passwordValidated: validated,
      });
    } else {
      this.setState({
        passwordErr: 'Minimum 8 characters and 1 character, 1 number, 1 special character (!@#$%^&*)',
        passwordValidated: false,
      });
    }
  }

  validatePasswordRepeat() {
    let repeatPswd = this.state.repeatPassword;
    if (validations.isExisty(repeatPswd) &&
      !validations.isEmpty(repeatPswd) &&
      repeatPswd == this.state.password) {

      this.setState({
        repeatPasswordErr: '',
        passwordRepeatValidated: true,
        passwordValidated: true,
      });
    } else {
      this.setState({
        repeatPasswordErr: 'Doesn\'t match the password entered',
        passwordRepeatValidated: false,
        passwordValidated: false,
      });
    }
  }

  validateAllFields() {
    if (this.state.employeeTypeValidated &&
        this.state.hireDateValidated &&
        this.state.fnameValidated &&
        this.state.lnameValidated &&
        this.state.addressValidated &&
        this.state.unitValidated &&
        this.state.cityValidated &&
        this.state.provinceValidated &&
        this.state.postalCodeValidated &&
        this.state.emailValidated &&
        this.state.homePhoneValidated &&
        this.state.cellPhoneValidated &&
        this.state.passwordValidated &&
        this.state.passwordRepeatValidated) {
      //everything is validated, creating a new Employee
      this.createNewEmployee();

    } else {
      this.validateEmployeeType();
      this.validateHireDate();
      this.validateFName();
      this.validateLName();
      this.validateAddress();
      this.validateUnit();
      this.validateCity();
      this.validateProvince();
      this.validatePostalCode();
      this.validateEmail();
      this.validateHomePhone();
      this.validateCellPhone();
      this.validatePassword();
      this.validatePasswordRepeat();
    }
  }

  createNewEmployee() {
    var date = this.state.hireDate;
    date = date.getFullYear()
      + "-" + dateHelpers.twoDigits(1 + date.getMonth())
      + "-" + dateHelpers.twoDigits(date.getDate());

    let data = {
      fname: this.state.fname,
      lname: this.state.lname,
      address: this.state.address,
      unitNum: this.state.unitNum,
      city: this.state.city,
      province: this.state.province,
      postalCode: this.state.postalCode,
      email: this.state.email,
      homePhone: this.state.homePhone,
      cellPhone: this.state.cellPhone,
      password: this.state.password,
      hireDate: date,
      isActive: true,
      employeeType: this.state.employeeType,
    };

    var _this = this;
    var request = new XMLHttpRequest();
    request.open('POST', "http://" + IP + '/newemployee', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 201) {
        _this.props.menuClickHandler("dashboard");
      }
      //#TODO add error check and display `Snackbar` in both success or fail cases
    };

    request.send(JSON.stringify(data));
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
                floatingLabelText="Employee Type"
                floatingLabelFixed={false}
                hintText="Select Employee Type"
                value={this.state.employeeType}
                onChange={this.handleSelectChange.bind(this, "employeeType")}
                errorText={this.state.employeeTypeErr}
                errorStyle={{float: "left"}}
              >
                <MenuItem key={1} value={"salesperson"} primaryText="Sales Agent" />
                <MenuItem key={2} value={"installer"} primaryText="Installer" />
                <MenuItem key={3} value={"admin"} primaryText="Administrator" />
              </SelectField>
              <DatePicker
                hintText="2017-08-20" container="inline"
                floatingLabelText="Hire Date"
                minDate={this.state.minDate}
                maxDate={this.state.maxDate}
                value={this.state.hireDate}
                onChange={this.handleDateChange.bind(this, "hireDate")}
                onBlur={this.validateHireDate.bind(this)}
                errorText={this.state.hireDateErr}
                errorStyle={{float: "left"}}
                onTouchTap={(e) => {e.preventDefault();}}
              />
              <br />
              <TextField
                floatingLabelText="First Name"
                hintText="John"
                maxLength="50"
                value={this.state.fname}
                onChange={this.handleTextChange.bind(this, 'fname')}
                onBlur={this.validateFName.bind(this)}
                errorText={this.state.fnameErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Last Name"
                hintText="Doe"
                maxLength="50"
                value={this.state.lname}
                onChange={this.handleTextChange.bind(this, 'lname')}
                onBlur={this.validateLName.bind(this)}
                errorText={this.state.lnameErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                floatingLabelText="Address"
                hintText="123 Main Street"
                maxLength="50"
                value={this.state.address}
                onChange={this.handleTextChange.bind(this, 'address')}
                onBlur={this.validateAddress.bind(this)}
                errorText={this.state.addressErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Unit #"
                hintText="7e"
                maxLength="10"
                value={this.state.unitNum}
                onChange={this.handleTextChange.bind(this, 'unitNum')}
                onBlur={this.validateUnit.bind(this)}
                errorText={this.state.unitNumErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                floatingLabelText="City"
                hintText="Toronto"
                maxLength="80"
                value={this.state.city}
                onChange={this.handleTextChange.bind(this, 'city')}
                onBlur={this.validateCity.bind(this)}
                errorText={this.state.cityErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <SelectField
                floatingLabelText="Province"
                floatingLabelFixed={false}
                hintText="Select a Province"
                value={this.state.province}
                onChange={this.handleSelectChange.bind(this, "province")}
                onBlur={this.validateProvince.bind(this)}
                errorText={this.state.provinceErr}
                errorStyle={{float: "left"}}
                tabIndex={0}
              >
                {provinces}
              </SelectField>
              <br />
              <TextField
                floatingLabelText="Postal Code"
                hintText="M4B 5V9"
                maxLength="7"
                value={this.state.postalCode}
                onChange={this.handleTextChange.bind(this, 'postalCode')}
                onBlur={this.validatePostalCode.bind(this)}
                errorText={this.state.postalCodeErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Email"
                hintText="name@domain.com"
                type="email"
                maxLength="50"
                value={this.state.email}
                onChange={this.handleTextChange.bind(this, 'email')}
                onBlur={this.validateEmail.bind(this)}
                errorText={this.state.emailErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                floatingLabelText="Home Phone"
                hintText="(123) 456-7890"
                type="tel"
                maxLength="14"
                value={this.state.homePhone}
                onChange={this.handleTextChange.bind(this, 'homePhone')}
                onBlur={this.validateHomePhone.bind(this)}
                errorText={this.state.homePhoneErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Cell Phone"
                hintText="(123) 456-7890"
                type="tel"
                maxLength="14"
                value={this.state.cellPhone}
                onChange={this.handleTextChange.bind(this, 'cellPhone')}
                onBlur={this.validateCellPhone.bind(this)}
                errorText={this.state.cellPhoneErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                floatingLabelText="Password"
                hintText=""
                type="password"
                maxLength="20"
                value={this.state.password}
                onChange={this.handleTextChange.bind(this, 'password')}
                onBlur={this.validatePassword.bind(this)}
                errorText={this.state.passwordErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
              &nbsp;
              <TextField
                floatingLabelText="Repeat Password"
                hintText=""
                type="password"
                maxLength="20"
                value={this.state.repeatPassword}
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
                onTouchTap={(e) => {e.preventDefault(); this.props.menuClickHandler("dashboard")}}
              />
              <RaisedButton
                onTouchTap={(e) => {e.preventDefault(); this.validateAllFields()}}
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
