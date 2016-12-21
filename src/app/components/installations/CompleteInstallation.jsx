import React from 'react';
import {
  TextField, SelectField, MenuItem, RadioButton, RadioButtonGroup,
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  Checkbox, Divider, DatePicker, RaisedButton,
} from 'material-ui';
import { validations } from '../helpers/common.js';
import { IP } from '../../../../config/config.js';

// Provinces for SelectField
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

export default class CompleteInstallation extends React.Component {

  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    this.state = {
      // form data
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
      sqft: '',
      bathrooms: '',
      residents: '',
      pool: '',
      checklist1: '',
      checklist2: '',
      checklist3: '',
      checklist4: '',
      checklist5: '',
      checklist6: '',
      notes: '',
      acknowledgement1: false,
      acknowledgement2: false,
      acknowledgement3: false,
      acknowledgement4: false,
      installedDate: {},
      installerId: '',
      installer: '',
      minDate: minDate,
      maxDate: maxDate,

      // Error messages for each field
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
      poolErr: '',
      checklistErr: '',
      acknowledgementErr: '',
      installerErr: '',
      installedDateErr: '',

      // Validation fields
      fnameValidated: false,
      lnameValidated: false,
      addressValidated: false,
      unitValidated: false,
      cityValidated: false,
      proviceValidated: false,
      postalCodeValidated: false,
      enbridgeValidated: false,
      emailValidated: false,
      homePhoneValidated: false,
      cellPhoneValidated: false,
      sqftValidated: false,
      bathroomsValidated: false,
      residentsValidated: false,
      poolValidated: false,
      checklistValidated: false,
      acknowledgementValidated: false,
      installerValidated: false,
      installedDateValidated: false,

      allInstallers: undefined,

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

      // This variable keeps the state of a current selected row
      selectedNum: -1,
    };
      this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount() {
    if(this.props.status == "edit" || this.props.status == "create"){
      var httpRequest = new XMLHttpRequest();
      let _this = this;
      httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let installation = JSON.parse(httpRequest.responseText).installation;
          // Format time
          var tempDateTime = new Date(installation.installationDateTime);
          var minDate = new Date(2000, 0, 1);

          var httpReq = new XMLHttpRequest();
          httpReq.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              let allInstallers = JSON.parse(httpReq.responseText).employees;

              _this.setState({
                // salesNumber: sale.salesNumber,
                fname: installation.customerFirstName ? installation.customerFirstName : '',
                lname: installation.customerLastName ? installation.customerLastName : '',
                address: installation.address ? installation.address : '',
                unitNum: installation.unit ? installation.unit : '',
                city: installation.city ? installation.city : '',
                province: installation.province ? installation.province : '',
                postalCode: installation.postalCode ? installation.postalCode : '',
                enbridge: installation.enbridgeNum ? installation.enbridgeNum : '',
                email: installation.email ? installation.email : '',
                homePhone: installation.homePhone ? installation.homePhone : '',
                cellPhone: installation.cellPhone ? installation.cellPhone : '',
                sqft: installation.sqFootage ? installation.sqFootage : '',
                residents: installation.residents ? installation.residents : '',
                pool: installation.hasPool ? installation.hasPool : '',
                bathrooms: installation.bathrooms ? installation.bathrooms : '',
                installedDate: tempDateTime ? tempDateTime : '',
                installerId: installation.installerId ? installation.installerId : '',
                installer: installation.installer ? installation.installer : '',
                minDate: minDate,
                allInstallers: allInstallers,
              });
            }
          };

          httpReq.open('GET', "http://" + IP + "/allemployeesbyrole?role=installer", true);
          httpReq.send(null);
        }
      };

      httpRequest.open('GET', "http://" + IP + "/getoneinstallation?id="
        + this.props.id, true);
      httpRequest.send(null);
    }
  }

  handleTextChange(fieldname, event) {
    var obj = {};
    obj[fieldname] = event.target.value;
    this.setState(obj);
  };

  handleSelectChange(fieldname, event, index, value) {
    var obj = {};
    obj[fieldname + "Err"] = '';
    obj[fieldname + "Validated"] = true;
    obj[fieldname] = value;
    this.setState(obj);
  }

  handleRadioChange(fieldname, event, value) {
    var obj = {};
    obj[fieldname + "Err"] = '';
    obj[fieldname + "Validated"] = true;
    obj[fieldname] = value;
    this.setState(obj);
  }

  handleCheckboxChange(fieldname, event, isInputChecked) {
    var obj = {};
    obj[fieldname] = isInputChecked;
    this.setState(obj);
  }

  handleDateChange(fieldname, event, date) {
    var obj = {};
    obj[fieldname + "Err"] = '';
    obj[fieldname + "Validated"] = true;
    obj[fieldname] = date;
    this.setState(obj);
  }

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
    if(validations.validateFName(fname)) {
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
    if(validations.validateLName(lname)) {
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
    if(validations.validateAddress(address)) {
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
    if(validations.validateUnit(unitNum)) {
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
    if(validations.validateCity(city)) {
      this.setState({
        cityErr: '',
        city: city,
        cityValidated: true,
      });
    } else {
      this.setState({
        cityErr: 'Up to 25 characters, spaces and hyphens only',
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
        provinceErr: 'Province not selected',
        provinceValidated: false,
      });
    }
  }

  validatePostalCode() {
    let postalCode = this.state.postalCode.trim();
    postalCode = postalCode.toUpperCase();
    if(validations.validatePostalCode(postalCode)) {
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

  validateEnbridge() {
    let enbridge = this.state.enbridge.trim();
    if(validations.validateEnbridge(enbridge)) {
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

  validateEmail() {
    let email = this.state.email.trim();
    if(validations.validateEmail(email)) {
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
    if(validations.validateHomePhone(homePhone)) {
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
    if(validations.validateCellPhone(cellPhone)) {
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

  validateSqft() {
    let sqft = this.state.sqft.trim();
    if(validations.validateSqft(sqft)) {
      this.setState({
        sqftErr: '',
        sqft: sqft,
        sqftValidated: true,
      });
    } else {
      this.setState({
        sqftErr: 'Must only consist of numbers',
        sqftValidated: false,
      });
    }
  }

  validateBathrooms() {
    let bathrooms = this.state.bathrooms.trim();
    if(validations.validateBathrooms(bathrooms)) {
      this.setState({
        bathroomsErr: '',
        bathrooms: bathrooms,
        bathroomsValidated: true,
      });
    } else {
      this.setState({
        bathroomsErr: 'Must only consist of numbers',
        bathroomsValidated: false,
      });
    }
  }

  validateResidents() {
    let residents = this.state.residents.trim();
    if(validations.validateResidents(residents)) {
      this.setState({
        residentsErr: '',
        residents: residents,
        residentsValidated: true,
      });
    } else {
      this.setState({
        residentsErr: 'Must only consist of numbers',
        residentsValidated: false,
      });
    }
  }

  validatePool() {
    let pool = this.state.pool;
    if (validations.validatePool(pool)) {
      this.setState({
        poolErr: '',
        poolValidated: true,
      });
    } else {
      this.setState({
        poolErr: 'Pool option must be selected',
        poolValidated: false,
      });
    }
  }

  validateChecklist() {
    let checklist1 = this.state.checklist1;
    let checklist2 = this.state.checklist2;
    let checklist3 = this.state.checklist3;
    let checklist4 = this.state.checklist4;
    let checklist5 = this.state.checklist5;
    let checklist6 = this.state.checklist6;
    if (validations.validateChecklist(checklist1) &&
        validations.validateChecklist(checklist2) &&
        validations.validateChecklist(checklist3) &&
        validations.validateChecklist(checklist4) &&
        validations.validateChecklist(checklist5) &&
        validations.validateChecklist(checklist6)) {
      this.setState({
        checklistErr: '',
        checklistValidated: true,
      });
    } else {
      this.setState({
        checklistErr: 'All options must be checked Yes',
        checklistValidated: false,
      });
    }
  }

  validateAcknowledgement() {
    let acknowledgement1 = this.state.acknowledgement1;
    let acknowledgement2 = this.state.acknowledgement2;
    let acknowledgement3 = this.state.acknowledgement3;
    let acknowledgement4 = this.state.acknowledgement4;
    if (validations.validateAcknowledgement(acknowledgement1) &&
        validations.validateAcknowledgement(acknowledgement2) &&
        validations.validateAcknowledgement(acknowledgement3) &&
        validations.validateAcknowledgement(acknowledgement4)) {
      this.setState({
        acknowledgementErr: '',
        acknowledgementValidated: true,
      });
    } else {
      this.setState({
        acknowledgementErr: 'Customer must acknowledge all fields',
        acknowledgementValidated: false,
      });
    }
  }

  validateInstaller() {
    let installer = this.state.installer;
    if (validations.validateInstaller(installer)) {
      this.setState({
        installerErr: '',
        installer: installer,
        installerValidated: true,
      });
    } else {
      this.setState({
        installerErr: 'Must select an installer',
        installerValidated: false,
      });
    }
  }

  validateInstalledDate() {
    let installedDate = this.state.installedDate;
    if (validations.validateInstallationDate(installedDate)) {
      this.setState({
        installedDateErr: '',
        installedDateValidated: true,
      });
    } else {
      this.setState({
        installedDateErr: 'Must select an installation date',
        installedDateValidated: false,
      });
    }
  }


  validateAllFields() {
    if (this.state.fnameValidated &&
        this.state.lnameValidated &&
        this.state.addressValidated &&
        this.state.unitValidated &&
        this.state.cityValidated &&
        this.state.provinceValidated &&
        this.state.postalCodeValidated &&
        this.state.enbridgeValidated &&
        this.state.emailValidated &&
        this.state.homePhoneValidated &&
        this.state.cellPhoneValidated &&
        this.state.sqftValidated &&
        this.state.bathroomsValidated &&
        this.state.residentsValidated &&
        this.state.poolValidated &&
        this.state.checklistValidated &&
        this.state.acknowledgementValidated &&
        this.state.installerValidated &&
        this.state.installedDateValidated) {
      //everything was validated, send an httpRequest to create a new sale
      return true;
      //FIXME this.createNewInstallation();
      //TODO handle the case when users click 'Submit' multiple times

    } else {
      this.validateFName();
      this.validateLName();
      this.validateAddress();
      this.validateUnit();
      this.validateCity();
      this.validateProvince();
      this.validatePostalCode();
      this.validateEnbridge();
      this.validateEmail();
      this.validateHomePhone();
      this.validateCellPhone();
      this.validateSqft();
      this.validateBathrooms();
      this.validateResidents();
      this.validatePool();
      this.validateChecklist();
      this.validateAcknowledgement();
      this.validateInstaller();
      this.validateInstalledDate();

      return false;
    }
  }

  validateForm() {
    if (this.validateAllFields()) {
      this.props.handleNext();
    }
  }

  createNewInstallation() {
    let data = {
      fname: this.state.fname,
      lname: this.state.lname,
      address: this.state.address,
      unitNum: this.state.unitNum,
      city: this.state.city,
      province: this.state.province,
      postalCode: this.state.postalCode,
      enbridge: this.state.enbridge,
      email: this.state.email,
      homePhone: this.state.homePhone,
      cellPhone: this.state.cellPhone,
      sqft: this.state.sqft,
      bathrooms: this.state.bathrooms,
      residents: this.state.residents,
      pool: this.state.pool,
      notes: this.state.notes,
      installedDate: this.state.installedDate,
      installerId: this.state.installerId,
    };

    var request = new XMLHttpRequest();
    request.open('PUT', 'http://' + IP + '/updateinstallation', true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.onreadystatechange = function() {
      //#TODO recieve Installation number and add it to the state
    };

    request.send(JSON.stringify(data));
  }

  render() {
    return (
      <div>
        <div className="newEmployeeFormContainer">
          <div className="newEmployeeForm">
            <div className="newEmployeeFormBox">
              <h2 className="headings">Homeowner Information</h2>
              <TextField
                floatingLabelText="First Name"
                hintText="John"
                maxLength="50"
                value={this.state.fname}
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
                maxLength="50"
                value={this.state.lname}
                onChange={this.handleTextChange.bind(this, "lname")}
                onBlur={this.validateLName.bind(this)}
                errorText={this.state.lnameErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                floatingLabelText="Address"
                hintText="123 Main Street"
                maxLength="50"
                value={this.state.address}
                onChange={this.handleTextChange.bind(this, "address")}
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
                onChange={this.handleTextChange.bind(this, "unitNum")}
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
                onChange={this.handleTextChange.bind(this, "city")}
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
                errorText={this.state.provinceErr}
                errorStyle={{float: "left"}}
              >
                {provinces}
              </SelectField>
              <br />
              <TextField
                floatingLabelText="Postal Code"
                hintText="M4B 5V9"
                maxLength="7"
                value={this.state.postalCode}
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
                maxLength="20"
                value={this.state.enbridge}
                onChange={this.handleTextChange.bind(this, "enbridge")}
                onBlur={this.validateEnbridge.bind(this)}
                errorText={this.state.enbridgeErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                floatingLabelText="Email"
                hintText="name@domain.com"
                type="email"
                maxLength="50"
                value={this.state.email}
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
                maxLength="14"
                value={this.state.homePhone}
                onChange={this.handleTextChange.bind(this, "homePhone")}
                onBlur={this.validateHomePhone.bind(this)}
                errorText={this.state.homePhoneErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                floatingLabelText="Cell Phone"
                hintText="(416) 123-4567"
                type="tel"
                maxLength="14"
                value={this.state.cellPhone}
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
                maxLength="5"
                min="0"
                max="99999"
                value={this.state.sqft}
                onChange={this.handleTextChange.bind(this, "sqft")}
                onBlur={this.validateSqft.bind(this)}
                errorText={this.state.sqftErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <TextField
                floatingLabelText="Bathrooms"
                hintText="3"
                type="number"
                maxLength="2"
                min="0"
                max="99"
                value={this.state.bathrooms}
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
                maxLength="2"
                min="0"
                max="99"
                value={this.state.residents}
                onChange={this.handleTextChange.bind(this, "residents")}
                onBlur={this.validateResidents.bind(this)}
                errorText={this.state.residentsErr}
                errorStyle={{float: "left"}}
              />
              <br />
              <div className="radioActionText">
                <p className="radioRow">Pool</p>
                <RadioButtonGroup name="pool" className="radioGroup"
                valueSelected={this.state.pool}
                onChange={this.handleRadioChange.bind(this, "pool")}>
                  <RadioButton
                    className="radio"
                    value="1"
                    label="Yes"
                  />
                  <RadioButton
                    className="radio"
                    value="0"
                    label="No"
                  />
                </RadioButtonGroup>
                <br />
                <div style={{color:"red", float: "left"}}>{this.state.poolErr}</div>
              </div>
              <br />

              <h2 className="headings">Program Installation</h2>
              <Table
                onRowSelection={this.handleSelection}
                onCellClick={this.handleCellClick}
                height={this.state.height}
                fixedHeader={this.state.fixedHeader}
                fixedFooter={this.state.fixedFooter}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable}
                style={{ maxWidth: '700px' }}
              >
                <TableHeader
                  displaySelectAll={this.state.showCheckboxes}
                  adjustForCheckbox={this.state.showCheckboxes}
                  enableSelectAll={this.state.enableSelectAll}
                >
                  <TableRow className={'programTableRow'}>
                    <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '35%' }} tooltip="Product Name">Product</TableHeaderColumn>
                    <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '15%' }} tooltip="Product Number">Number</TableHeaderColumn>
                    <TableHeaderColumn className={'tableRowHeaderColumn'} style={{ width: '50%' }} tooltip="Product Details">Details</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={this.state.showCheckboxes}
                  deselectOnClickaway={this.state.deselectOnClickaway}
                  showRowHover={this.state.showRowHover}
                  stripedRows={this.state.stripedRows}
                >
                  {tableData.map( (row, index) => (
                    <TableRow className={'programTableRow'} selected={index == this.state.selectedNum ? true : false}
                    key={index}>
                      <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '35%' }}>{row.name}</TableRowColumn>
                      <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '15%' }}>{row.number}</TableRowColumn>
                      <TableRowColumn className={'tableRowHeaderColumn'} style={{ width: '50%' }}>{row.details}</TableRowColumn>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>

              <h2 className="headings">Installation Checklist</h2>
              <div className="radioActionText">
                <p className="radioRow">Bypass Installed</p>
                <RadioButtonGroup name="installationCheck" className="radioGroup"
                onChange={this.handleTextChange.bind(this, "checklist1")}>
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
                onChange={this.handleTextChange.bind(this, "checklist2")}>
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
                onChange={this.handleTextChange.bind(this, "checklist3")}>
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
                onChange={this.handleTextChange.bind(this, "checklist4")}>
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
                onChange={this.handleTextChange.bind(this, "checklist5")}>
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
                onChange={this.handleTextChange.bind(this, "checklist6")}>
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
                hintText="Additional Notes"
                floatingLabelText="Notes"
                maxLength="300"
                multiLine={true}
                rows={1}
                rowsMax={10}
                value={this.state.notes}
                onChange={this.handleTextChange.bind(this, "notes")}
                className="full-width"
                errorText={this.state.checklistErr}
                errorStyle={{float: "left"}}
              />

              <h2 className="headings">Customer Acknowledgement</h2>
              <div>
                <p>I hereby confirm the following statements:</p>
                <Checkbox
                  label="Installation was completed to my satisfaction."
                  value={this.state.acknowledgement1}
                  onCheck={this.handleCheckboxChange.bind(this, "acknowledgement1")}
                />
                <Checkbox
                  label="The technician explained how to by-pass the filter and change the pre-filter."
                  value={this.state.acknowledgement2}
                  onCheck={this.handleCheckboxChange.bind(this, "acknowledgement2")}
                />
                <Checkbox
                  label="I recieved the bottling kit."
                  value={this.state.acknowledgement3}
                  onCheck={this.handleCheckboxChange.bind(this, "acknowledgement3")}
                />
                <Checkbox
                  label="My savings are not guaranteed."
                  value={this.state.acknowledgement4}
                  onCheck={this.handleCheckboxChange.bind(this, "acknowledgement4")}
                />
              </div>
              <div style={{color:"red"}}>{this.state.acknowledgementErr}</div>
              <TextField
                floatingLabelText="Homeowner's Signature"
                hintText="Tap to add signature"
                className="full-width"
              />
              <div>
                <SelectField
                  floatingLabelText="Installer"
                  floatingLabelFixed={false}
                  hintText="Select a Installer"
                  value={this.state.installer}
                  onChange={this.handleSelectChange.bind(this, "installer")}
                  errorText={this.state.installerErr}
                  errorStyle={{float: "left"}}
                >
                  {this.state.allInstallers ? this.state.allInstallers.map((installer, index) => (
                    <MenuItem key={index} value={installer.employeeNumber} primaryText={installer.name} />
                  ))
                  : null }
                </SelectField>
                &nbsp;
                &nbsp;
                <DatePicker
                  floatingLabelText="Installation Date"
                  hintText="2017-08-20"
                  container="inline"
                  value={this.state.installedDate}
                  onChange={this.handleDateChange.bind(this, "installedDate")}
                  minDate={this.state.minDate}
                  maxDate={this.state.maxDate}
                  errorText={this.state.installedDateErr}
                  errorStyle={{float: "left"}}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <RaisedButton
            label={this.props.status === 'create' ? 'Back' : 'Cancel'}
            secondary={this.props.status === 'create' ? false : true}
            onTouchTap={this.props.handlePrev}
          />
          <RaisedButton
            label={this.props.status === 'create' ? 'Next' : 'Update'}
            primary={true}
            onTouchTap={this.validateForm.bind(this)}
          />
        </div>
      </div>
    );
  }
}
