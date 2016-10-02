import React from 'react';
import {Tabs, Tab, TextField, Divider, RadioButton,
  RadioButtonGroup, RaisedButton, Card, CardActions,
  CardHeader, CardMedia, CardTitle, CardText, FlatButton,
  DatePicker, TimePicker, Toggle, Checkbox} from 'material-ui';

const styles = {
headline: {
  fontSize: 24,
  paddingTop: 16,
  marginBottom: 12,
  fontWeight: 400,
},
};

export default class NewSale extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      saleNumber: "",
      fname: '',
      lname: '',
      address: '',
      unit: '',
      city: '',
      prov: '',
      postalCode: '',
      enbridgeNum: '',
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
    };
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    return (
      <div>
        <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        >
        <Tab label="Rental Agreement Form" value="a" >
          <div>
            <TextField
              hintText="123-4567"
              errorText="This field is required"
              floatingLabelText="Sale Number"
              value={this.state.saleNumber}
              onChange={this.handleTextChange.bind(this, "saleNumber")}
            />
            <br />
            <br />
            <Divider />
            <br />
            <TextField
              hintText="John"
              errorText="This field is required"
              floatingLabelText="First Name"
              value={this.state.fname}
              onChange={this.handleTextChange.bind(this, "fname")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Doe"
              errorText="This field is required"
              floatingLabelText="Last Name"
              value={this.state.lname}
              onChange={this.handleTextChange.bind(this, "lname")}
            />
            <br />
            <TextField
              hintText="123 Fake Street"
              errorText="This field is required"
              floatingLabelText="Address"
              value={this.state.address}
              onChange={this.handleTextChange.bind(this, "address")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="77"
              errorText="This field is required"
              floatingLabelText="Unit #"
              value={this.state.unit}
              onChange={this.handleTextChange.bind(this, "unit")}
            />
            <br />
            <TextField
              hintText="Toronto"
              errorText="This field is required"
              floatingLabelText="City"
              value={this.state.city}
              onChange={this.handleTextChange.bind(this, "city")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Ontario"
              errorText="This field is required"
              floatingLabelText="Province"
              value={this.state.provinces}
              onChange={this.handleTextChange.bind(this, "provinces")}
            />
            <br />
            <TextField
              hintText="M4B 5V9"
              errorText="This field is required"
              floatingLabelText="Postal Code"
              value={this.state.postalCode}
              onChange={this.handleTextChange.bind(this, "postalCode")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="1234567890"
              errorText="This field is required"
              floatingLabelText="Enbridge Gas Number"
              value={this.state.enbridgeNum}
              onChange={this.handleTextChange.bind(this, "enbridgeNum")}
            />
            <br />
            <TextField
              hintText="(416) 123-4567"
              errorText="This field is required"
              floatingLabelText="Home Phone"
              value={this.state.homePhone}
              onChange={this.handleTextChange.bind(this, "homePhone")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="(416) 123-4567"
              errorText="This field is required"
              floatingLabelText="Cell Phone"
              value={this.state.cellPhone}
              onChange={this.handleTextChange.bind(this, "cellPhone")}
            />
            <br />
            <TextField
              hintText="name@domain.com"
              errorText="This field is required"
              floatingLabelText="Email"
              value={this.state.email}
              onChange={this.handleTextChange.bind(this, "email")}
            />
            <br />
            <br />
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
            <Divider />
            <br />
            <DatePicker
              hintText="2010-08-20" container="inline"
              errorText="This field is required"
              floatingLabelText="Installation Date"
              // value={this.state.installationDate}
              // onChange={this.handleTextChange.bind(this, "installationDate")}
            />
            <TimePicker
              hintText="Installation Time"
              errorText="This field is required"
              floatingLabelText="Installation Time"
              // value={this.state.installationTime}
            />
            <br />
            <TextField
              hintText="Notes"
              multiLine={true}
              rows={5}
              // errorText="This field is required"
              floatingLabelText="Notes"
              value={this.state.notes}
              onChange={this.handleTextChange.bind(this, "notes")}
            />
            <br />
            <br />
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
              onCheck = {this.handleTextChange.bind(this, "homeownerSignature")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <DatePicker
              hintText="2010-08-20"
              container="inline"
              errorText="This field is required"
              floatingLabelText="Signature Date"
              // value={this.state.installationDate}
              // onChange={this.handleTextChange.bind(this, "installationDate")}
            />
            <br />
            <Checkbox
              label="Sales Rep Signature"
              style={styles.checkbox}
              labelPosition="left"
              checked={true}
              disabled={true}
              value={this.state.salesRepSignature}
              onCheck = {this.handleTextChange.bind(this, "salesRepSignature")}
            />
            <TextField
              hintText="123-4567"
              errorText="This field is required"
              floatingLabelText="Sales Rep ID"
              value={this.state.salesRepId}
              onChange={this.handleTextChange.bind(this, "salesRepId")}
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
        </Tab>
        <Tab label="Pre-Authorized Debit Form" value="b">
          <div>
            <br />
            <TextField
              hintText="123-4567"
              errorText="This field is required"
              floatingLabelText="Sale Number"
              value={this.state.saleNumber}
              onChange={this.handleTextChange.bind(this, "saleNumber")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="123-4567"
              errorText="This field is required"
              floatingLabelText="Application Number"
              value={this.state.applicationNumber}
              onChange={this.handleTextChange.bind(this, "applicationNumber")}
            />
            <br />
            <DatePicker
              hintText="2010-08-20" container="inline"
              errorText="This field is required"
              floatingLabelText="Date"
              // value={this.state.installationDate}
              // onChange={this.handleTextChange.bind(this, "installationDate")}
            />
            <br />
            <br />
            <Divider />
            <br />
            <TextField
              hintText="John"
              errorText="This field is required"
              floatingLabelText="First Name"
              value={this.state.fname}
              onChange={this.handleTextChange.bind(this, "fname")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Doe"
              errorText="This field is required"
              floatingLabelText="Last Name"
              value={this.state.lname}
              onChange={this.handleTextChange.bind(this, "lname")}
            />
            <br />
            <TextField
              hintText="123 Fake Street"
              errorText="This field is required"
              floatingLabelText="Address"
              value={this.state.address}
              onChange={this.handleTextChange.bind(this, "address")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="77"
              errorText="This field is required"
              floatingLabelText="Unit #"
              value={this.state.unit}
              onChange={this.handleTextChange.bind(this, "unit")}
            />
            <br />
            <TextField
              hintText="Toronto"
              errorText="This field is required"
              floatingLabelText="City"
              value={this.state.city}
              onChange={this.handleTextChange.bind(this, "city")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Ontario"
              errorText="This field is required"
              floatingLabelText="Province"
              value={this.state.provinces}
              onChange={this.handleTextChange.bind(this, "provinces")}
            />
            <br />
            <TextField
              hintText="M4B 5V9"
              errorText="This field is required"
              floatingLabelText="Postal Code"
              value={this.state.postalCode}
              onChange={this.handleTextChange.bind(this, "postalCode")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="1234567890"
              errorText="This field is required"
              floatingLabelText="Enbridge Gas Number"
              value={this.state.enbridgeNum}
              onChange={this.handleTextChange.bind(this, "enbridgeNum")}
            />
            <br />
            <TextField
              hintText="(416) 123-4567"
              errorText="This field is required"
              floatingLabelText="Home Phone"
              value={this.state.homePhone}
              onChange={this.handleTextChange.bind(this, "homePhone")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="(416) 123-4567"
              errorText="This field is required"
              floatingLabelText="Cell Phone"
              value={this.state.cellPhone}
              onChange={this.handleTextChange.bind(this, "cellPhone")}
            />
            <br />
            <TextField
              hintText="name@domain.com"
              errorText="This field is required"
              floatingLabelText="Email"
              value={this.state.email}
              onChange={this.handleTextChange.bind(this, "email")}
            />
            <br />
            <br />
            <Divider />
            <br />
            <Card>
              <CardHeader
                title="URL Avatar"
                subtitle="Subtitle"
                avatar="http://www.mymusclesinmotion.com/wp-content/uploads/headshot-placeholder.gif"
              />
              <CardMedia
                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
              >
                <img src="http://dc466.4shared.com/img/L8gcz3sL/s23/135ac1260a0/bbf_void_cheque" />
              </CardMedia>
              <CardTitle title="Card title" subtitle="Card subtitle" />
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions>
                <FlatButton label="Download" />
                //<FlatButton label="Action2" />
              </CardActions>
            </Card>
            <br />
            <br />
            <Divider />
            <br />
            <Checkbox
              label="Homeowner Signature"
              style={styles.checkbox}
              labelPosition="left"
              checked={true}
              disabled={true}
              value={this.state.homeownerSignature}
              onCheck = {this.handleTextChange.bind(this, "homeownerSignature")}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <DatePicker
              hintText="2010-08-20" container="inline"
              errorText="This field is required"
              floatingLabelText="Installation Date"
              // value={this.state.installationDate}
              // onChange={this.handleTextChange.bind(this, "installationDate")}
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
        </Tab>
      </Tabs>
      </div>
    );
  }
}
