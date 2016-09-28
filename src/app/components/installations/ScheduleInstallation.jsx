import React from 'react';
import {Tabs, Tab, FontIcon} from 'material-ui';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

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

export default class ScheduleInstallation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 'a',
      fname: '',
      lname: '',
      address: '',
      unit: '',
      city: '',
      prov: '',
      postalCode: '',
      enbridge: '',
      email: '',
      homePhone: '',
      cellPhone: '',
      sqft: '',
      bathrooms: '',
      residents: '',
      pool: '',
    };
      this.handleChange = this.handleChange.bind(this);
      // this.handleTextChange = this.handleTextChange.bind(this);
  }


  handleChange(value) {
    this.setState({
      value: value,
    });
  };

  handleTextChange(fieldname, event) {
    event.stopPropagation();
    console.log(fieldname);
    this.setState({
      fname: event.target.value,
      lname: event.target.value,
      address: event.target.value,
      unit: event.target.value,
      city: event.target.value,
      prov: event.target.value,
      postalCode: event.target.value,
      enbridge: event.target.value,
      email: event.target.value,
      homePhone: event.target.value,
      cellPhone: event.target.value,
      sqft: event.target.value,
      bathrooms: event.target.value,
      residents: event.target.value,
      pool: event.target.value,

    });
  };

  render() {
    return (
      <div>
        <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        >
          <Tab label="Installation Completion Certificate" value="a" >
            <div>
              <form>
                <h2 style={styles.headline}>Homeowner Information</h2><Divider />
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
                  value={this.state.value}
                  onChange={this.handleChange}
                  floatingLabelText="Province"
                  value={this.state.prov}
                  onChange={this.handleTextChange.bind(this, "prov")}
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
                <TextField
                  hintText="Yes"
                  errorText="This field is required"
                  floatingLabelText="Pool"
                  value={this.state.pool}
                  onChange={this.handleTextChange.bind(this, "pool")}
                /><br />

                <h2 style={styles.headline}>Program Installation</h2><Divider />
                <h2 style={styles.headline}>Installation Checklist</h2><Divider />
                <h2 style={styles.headline}>Customer Acknowledgement</h2><Divider />
              </form>
            </div>
          </Tab>
          <Tab label="Installation Pictures" value="b">
            <div>
              <h2 style={styles.headline}>Controllable Tab B</h2>
              <p>
                This is another example of a controllable tab. Remember, if you
                use controllable Tabs, you need to give all of your tabs values or else
                you wont be able to select them.
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
