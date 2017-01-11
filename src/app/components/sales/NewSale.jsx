import React from 'react';
import {
  TextField, Divider, RadioButton, RadioButtonGroup,
  RaisedButton, FlatButton, DatePicker, TimePicker,
  Toggle, Checkbox, SelectField, MenuItem
} from 'material-ui';
import { validations, dateHelpers } from '../helpers/common.js';
import { IP } from '../../../../config/config.js';

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

export default class NewSale extends React.Component {

  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    this.state = {
      // Form data
      saleNumber: '',
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
      installationDate: {},
      installationTime: {},
      notes: '',
      salesRepId: '',
      salesRepName: '',
      applicationNumber: '',
      programType: '',
      dateSigned: new Date(),
      minDate: minDate,
      maxDate: maxDate,

      // DocuSign
      baseUrl: '',
      envelopeId: '',
      embeddedUrl: '',

      // Unknown data
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
      salesRepErr: '',
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
      salesRepIdValidated: false,
      applicationNumberValidated: false,
      programTypeValidated: false,
      installationDateValidated: false,
      installationTimeValidated: false,

      allSalesReps: undefined,
    };
  }

  componentDidMount() {
    if(this.props.status == "edit"){
      var httpRequest = new XMLHttpRequest();
      let _this = this;
      httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let sale = JSON.parse(httpRequest.responseText).sale;
          var httpReq = new XMLHttpRequest();
          httpReq.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              let allSalesReps = JSON.parse(httpReq.responseText).employees;
              // Create employee object, indexed by employeeNumber
              var allEmployees = {};
              for (var employee in allSalesReps) {
                allEmployees[allSalesReps[employee].employeeNumber] = allSalesReps[employee].name;
              }
              // Format time
              var t = sale.installationDateTime.split(/[- :]/);
              var tempDateTime = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
              var minDate = new Date(2000, 0, 1);

              _this.setState({
                fname: sale.firstName ? sale.firstName : '',
                lname: sale.lastName ? sale.lastName : '',
                address: sale.address ? sale.address : '',
                unitNum: sale.unit ? sale.unit : '',
                city: sale.city ? sale.city : '',
                province: sale.province ? sale.province : '',
                postalCode: sale.postalCode ? sale.postalCode : '',
                enbridge: sale.enbridgeNum ? sale.enbridgeNum : '',
                email: sale.email ? sale.email : '',
                programType: sale.programId ? sale.programId : '',
                homePhone: sale.homePhone ? sale.homePhone : '',
                cellPhone: sale.cellPhone ? sale.cellPhone : '',
                installationDate: tempDateTime ? tempDateTime : '',
                installationTime: tempDateTime ? tempDateTime : '',
                notes: sale.notes ? sale.notes : '',
                salesRepId: sale.salesRepId ? sale.salesRepId : '',
                salesRepName: sale.salesRepId ? allEmployees[sale.salesRepId] : '',
                minDate: minDate,
                allSalesReps: allSalesReps,
              });
            }
          };
            httpReq.open('GET', "http://" + IP + "/allemployeesbyrole?role=salesperson", true);
          httpReq.send(null);
        }
      };
      httpRequest.open('GET', "http://" + IP + "/existingsale?id="
        + _this.props.id, true);
      httpRequest.send(null);
    } else if (this.props.status == 'create') {
      var httpRequest = new XMLHttpRequest();
      let _this = this;
      httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let allSalesReps = JSON.parse(httpRequest.responseText).employees;

          _this.setState({
            allSalesReps: allSalesReps,
          });
        }
      };

      httpRequest.open('GET', "http://" + IP + "/allemployeesbyrole?role=salesperson", true);
      httpRequest.send(null);
    }
  }

  handleTextChange(fieldname, event) {
    var obj = {};
    obj[fieldname] = event.target.value;
    this.setState(obj);
  }

  handleSelectChange(fieldname, event, index, value) {
    var obj = {};
    if(fieldname == "salesRepId") {
      obj["salesRepName"] = this.state.allSalesReps[index].name;
    }
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

  handleDateChange(fieldname, event, date) {
    var obj = {};
    obj[fieldname + "Err"] = '';
    obj[fieldname + "Validated"] = true;
    obj[fieldname] = date;
    this.setState(obj);
  }

  handleTimeChange(fieldname, event, time) {
    var obj = {};
    obj[fieldname + "Err"] = '';
    obj[fieldname + "Validated"] = true;
    obj[fieldname] = time;
    this.setState(obj);
  }

  updateCharges(programType) {
    if (programType == "3") {
      var totalCharges = parseInt(this.state.deliveryCharges) + 550;
      this.setState({
        installationCharges : 550,
        totalCharges : totalCharges
      });
    } else if (programType == "1" || programType == "2") {
      var totalCharges = parseInt(this.state.deliveryCharges) + 450;
      this.setState({
        installationCharges : 450,
        totalCharges: totalCharges
      });
    }
  }

  // Validation
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
        addressErr: 'Only characters, numbers, spaces and hyphens',
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
        unitNumErr: 'Can contain 2-10 numbers/characters only.',
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
        cityErr: 'Up to 60 characters, spaces and hyphens only',
        cityValidated: false,
      });
    }
  }

  validateProvince() {
    let province = this.state.province;
    if(validations.validateProvince(province)) {
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

  validateProgramType() {
    let programType = this.state.programType;
    if(validations.validateProgram(programType)) {
      this.setState({
        programTypeErr: '',
        programTypeValidated: true,
      });
    } else {
      this.setState({
        programTypeErr: 'Program type not selected',
        programTypeValidated: false,
      });
    }
  }

  validateInstallationDate() {
    let installationDate = this.state.installationDate;
    if (validations.validateInstallationDate(installationDate)) {
      this.setState({
        installationDateErr: '',
        installationDateValidated: true,
      });
    } else {
      this.setState({
        installationDateErr: 'Must select an installation date',
        installationDateValidated: false,
      });
    }
  }

  validateInstallationTime() {
    let installationTime = this.state.installationTime;
    if (validations.validateInstallationTime(installationTime)) {
      this.setState({
        installationTimeErr: '',
        installationTimeValidated: true,
      });
    } else {
      this.setState({
        installationTimeErr: 'Must select an installation time',
        installationTimeValidated: false,
      });
    }
  }

  validateSalesRep() {
    let salesRepId = this.state.salesRepId;
    if (validations.validateSalesRep(salesRepId)) {
      this.setState({
        salesRepErr: '',
        salesRepId: salesRepId,
        salesRepIdValidated: true,
      });
    } else {
      this.setState({
        salesRepErr: 'Must select a salesperson',
        salesRepIdValidated: false,
      });
    }
  }

  validateApplicationNumber() {
    let applicationNumber = this.state.applicationNumber.trim();
    if(validations.validateApplicationNumber(applicationNumber)) {
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

  validateRentalAgreement() {
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
        this.state.installationTimeValidated &&
        this.state.salesRepIdValidated) {
      //everything was validated, send an httpRequest to create a new sale
      this.createNewSale();
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
      this.validateHomePhone();
      this.validateCellPhone();
      this.validateEmail();
      this.validateProgramType();
      this.validateInstallationDate();
      this.validateInstallationTime();
      this.validateSalesRep();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.programType !== this.state.programType) {
       this.updateCharges(nextState.programType);
    }
  }

  createNewSale() {
    //combining the date and time objects and converting them to MySQL DATETIME format
    var finalDate = new Date(this.state.installationDate);
    var hours = this.state.installationTime.getHours();
    var minutes = this.state.installationTime.getMinutes();
    finalDate.setHours(hours);
    finalDate.setMinutes(minutes);

    //correcting the dateSigned field for the MySQL DATE format
    var dateSigned = this.state.dateSigned;
    dateSigned = dateSigned.getFullYear()
      + "-" + dateHelpers.twoDigits(1 + dateSigned.getMonth())
      + "-" + dateHelpers.twoDigits(dateSigned.getDate());

    let data = {
      // Homeowner Information
      fname: this.state.fname,
      lname: this.state.lname, //customer table
      address: this.state.address, //address table
      unitNum: this.state.unitNum,//address table
      city: this.state.city,//address table
      province: this.state.province,//address table
      postalCode: this.state.postalCode.replace(/\s/g,''),//address table
      enbridge: this.state.enbridge, //customer table
      homePhone: this.state.homePhone, //customer table
      cellPhone: this.state.cellPhone, //customer table
      email: this.state.email, //customer table
      dateSigned: dateSigned,

      // Program
      programType: this.state.programType, //sale table

      // Installation & Delivery
      installationDateTime: dateHelpers.toMysqlFormat(finalDate), //sale table
      notes: this.state.notes, //sale table

      // The rest
      salesRepId: this.state.salesRepId
    };

    let _this = this;
    var request = new XMLHttpRequest();
    request.open('POST', "http://" + IP + '/newsale', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 201) {
        let saleObject = {
            saleObj: JSON.parse(request.responseText).sale
        }
        // Alternatively return sales rep name in newly created sale object
        saleObject.saleObj["salesRepName"] = _this.state.salesRepName;
        // Passing the new sale object to the next component (DocuSign form)
        _this.props.handleSaleNext(saleObject);
      }
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
                hintText="123 Fake Street"
                maxLength="50"
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
                onChange={this.handleTextChange.bind(this, "postalCode")}
                onBlur={this.validatePostalCode.bind(this)}
                errorText={this.state.postalCodeErr}
                errorStyle={{float: "left"}}
              />
              &nbsp;
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
                floatingLabelText="Home Phone"
                hintText="416-123-4567"
                type="tel"
                maxLength="14"
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
                floatingLabelText="Cell Phone"
                hintText="416-123-4567"
                type="tel"
                maxLength="14"
                value={this.state.cellPhone}
                onChange={this.handleTextChange.bind(this, "cellPhone")}
                onBlur={this.validateCellPhone.bind(this)}
                errorText={this.state.cellPhoneErr}
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
                <TextField
                  floatingLabelText=" "
                  disabled={true}
                  className="full-width"
                  errorText={this.state.programTypeErr}
                  errorStyle={{float: "left"}}
                  style={{height: '25px'}}
                />
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
                  minDate={this.state.minDate}
                  maxDate={this.state.maxDate}
                  value={this.state.installationDate}
                  onChange={this.handleDateChange.bind(this, "installationDate")}
                  onBlur={this.validateInstallationDate.bind(this)}
                  errorText={this.state.installationDateErr}
                  errorStyle={{float: "left"}}
                  onTouchTap={(e) => {e.preventDefault();}}
                />
              </div>
              &nbsp;
              &nbsp;
              &nbsp;
              <div style={{ display: 'inline-block' }}>
                <TimePicker
                  hintText="Installation Time"
                  floatingLabelText="Installation Time"
                  value={this.state.installationTime}
                  onChange={this.handleTimeChange.bind(this, "installationTime")}
                  onBlur={this.validateInstallationTime.bind(this)}
                  errorText={this.state.installationTimeErr}
                  errorStyle={{float: "left"}}
                />
              </div>
              <br />
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
              />
              <h2 className="headings">Authorization</h2>
              <TextField
                floatingLabelText="Date Signed"
                value={
                  this.state.dateSigned.getMonth() + 1 + '/' +
                  this.state.dateSigned.getDate() + '/' +
                  this.state.dateSigned.getFullYear()
                }
                disabled={true}
              />
              &nbsp;
              &nbsp;
              &nbsp;
              <SelectField
                floatingLabelText="Sales Representative"
                floatingLabelFixed={false}
                hintText="Select a Sales Representative"
                value={this.state.salesRepId}
                onChange={this.handleSelectChange.bind(this, "salesRepId")}
                errorText={this.state.salesRepErr}
                errorStyle={{float: "left"}}
              >
                {this.state.allSalesReps ? this.state.allSalesReps.map((salesRep, index) => (
                  <MenuItem key={index} value={salesRep.employeeNumber} primaryText={salesRep.name} />
                ))
                : null }
              </SelectField>
            </div>
          </div>
        </div>
        <div style={{margin: '50px'}}>
          <RaisedButton
            label={'Cancel'}
            secondary={true}
            onTouchTap={(e) => {e.preventDefault(); this.props.menuClickHandler("dashboard")}}
          />
          <RaisedButton
            label={this.props.status === 'create' ? 'Next' : 'Update'}
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.validateRentalAgreement()}}
          />
        </div>
      </div>
    );
  }
}
