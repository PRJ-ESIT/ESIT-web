import React from 'react';
import { Toolbar, ToolbarTitle, TextField, DropDownMenu, MenuItem, RaisedButton } from 'material-ui';
import { validations } from '../helpers/common.js';

const styles = {
  customWidth: {
    width: 280,
  },
  dropdownUnderline: {
    marginLeft: '0px'
  },
  dropdownLabel: {
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  menuStyle: {
    width: '200px'
  }
};

export default class NewEmployee extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      employeeType: 1,
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

      //enable submit button when all validations are passed
      createDisabled: true
    };
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
  }

  handleDropDownChange(event, index, value){
    console.log(value);
    this.setState({employeeType: value});
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
    if(validations.isAlphaSpacesHyphens(city) && validations.maxLength(city, 60)) {
      this.setState({
        cityErr: '',
        city: city,
      });
    } else {
      this.setState({
        cityErr: 'Up to 60 characters, spaces and hyphens only'
      });
    }
  }

  validateProvince() {
    let province = this.state.province.trim();
    if(validations.isWords(province) && validations.maxLength(province, 30)) {
      this.setState({
        provinceErr: '',
        province: province,
      });
    } else {
      this.setState({
        provinceErr: 'Not a valid province name'
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
        postalCodeErr: 'Not a valid postal code',
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

  validatePassword() {
    if(validations.isPassword(this.state.password) &&
      validations.maxLength(this.state.password, 20)) {

      let repeatPswd = this.state.repeatPassword;
      let repeatPasswordErr = '';
      if(!(validations.isExisty(repeatPswd) &&
        !validations.isEmpty(repeatPswd) &&
        repeatPswd == this.state.password)) {

        repeatPasswordErr = 'Doesn\'t match the password entered';
      }

      this.setState({
        passwordErr: '',
        repeatPasswordErr: repeatPasswordErr,
      });
    } else {
      this.setState({
        passwordErr: 'At least 1 character, 1 number, one of the special characters !@#$%^&* and have at least 8 characters'
      });
    }
  }

  validatePasswordRepeat() {
    let repeatPswd = this.state.repeatPassword;
    if(validations.isExisty(repeatPswd) &&
      !validations.isEmpty(repeatPswd) &&
      repeatPswd == this.state.password) {

      this.setState({
        repeatPasswordErr: ''
      });
    } else {
      this.setState({
        repeatPasswordErr: 'Doesn\'t match the password entered'
      });
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
              <TextField
                disabled={true}
                defaultValue="555-555-555"
                floatingLabelText="Employee ID"
              />
              &nbsp;
              &nbsp;
              <DropDownMenu
                value={this.state.employeeType}
                onChange={this.handleDropDownChange}
                autoWidth={false}
                style={styles.customWidth}
                labelStyle={styles.dropdownLabel}
                underlineStyle={styles.dropdownUnderline}
                menuStyle={styles.menuStyle}
              >
                <MenuItem value={1} primaryText="<Employee Type>" />
                <MenuItem value={2} primaryText="Sales Agent" />
                <MenuItem value={3} primaryText="Installation Agent" />
                <MenuItem value={4} primaryText="Administrator" />
              </DropDownMenu><br />
              <TextField
                hintText="John"
                floatingLabelText="First Name"
                maxLength="25"
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
                hintText="Province"
                floatingLabelText="Province"
                maxLength="30"
                onChange={this.handleTextChange.bind(this, 'province')}
                onBlur={this.validateProvince.bind(this)}
                errorText={this.state.provinceErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                hintText="Postal Code"
                floatingLabelText="Postal Code"
                maxLength="7"
                onChange={this.handleTextChange.bind(this, 'postalCode')}
                onBlur={this.validatePostalCode.bind(this)}
                errorText={this.state.postalCodeErr}
                errorStyle={{float: "left"}}
              /><br />
              <TextField
                hintText="john@example.com"
                floatingLabelText="Email"
                type="email"
                maxLength="50"
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
              <RaisedButton style={{float: 'left'}} label="Cancel" secondary={true} />
              <RaisedButton style={{float: 'right'}} label="Create" primary={true} disabled={this.state.createDisabled} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
