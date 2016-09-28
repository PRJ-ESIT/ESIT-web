import React from 'react';
import {Tabs, Tab, TextField, Divider, RadioButton,
  RadioButtonGroup, RaisedButton, Card, CardActions,
  CardHeader, CardMedia, CardTitle, CardText, FlatButton,
  DatePicker} from 'material-ui';

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
      email: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value){
    this.setState({
      value: value,
    });
  };

  handleTextFieldChange(id, value){
    console.log(id, value);
    this.setState({
      value: value,
      //this.state[id]: value,
    });
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
              hintText="Sale Number"
              //type = "saleNumber"
              //onChange = {this.handleTextFieldChange.bind(this, "saleNumber", value)}
            />
            <br />
            <br />
            <Divider />
            <br />
            <TextField
              hintText="First Name"
              //type = "email"
              //onChange = {this.handleTextFieldChange.bind(this, "email", value)}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Last Name"
            />
            <br />
            <TextField
              hintText="Address"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Unit #"
            />
            <br />
            <TextField
              hintText="City"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Province"
            />
            <br />
            <TextField
              hintText="Postal Code"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Enbridge #"
            />
            <br />
            <TextField
              hintText="Home Phone"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Cell Phone"
            />
            <br />
            <TextField
              hintText="Email"
            />
            <br />
            <br />
            <Divider />
            <br />
            <RadioButtonGroup name="programType">
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
              hintText="Installation Date" container="inline"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Installation Time"
            />
            <br />
            <TextField
              hintText="Notes"
              multiLine={true}
              rows={5}
            />
            <br />
            <br />
            <Divider />
            <br />
            <br />
            <TextField
              hintText="Homeowner's Signature"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Date"
            />
            <br />
            <TextField
              hintText="Sales Rep Signature"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Sales Rep ID"
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
              hintText="Sale Number"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Application Number"
            />
            <br />
            <TextField
              hintText="Date"
            />
            <br />
            <br />
            <Divider />
            <br />
            <TextField
              hintText="First Name"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Last Name"
            />
            <br />
            <TextField
              hintText="Address"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Unit #"
            />
            <br />
            <TextField
              hintText="City"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Province"
            />
            <br />
            <TextField
              hintText="Postal Code"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Enbridge #"
            />
            <br />
            <TextField
              hintText="Home Phone"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Cell Phone"
            />
            <br />
            <TextField
              hintText="Email"
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
            <TextField
              hintText="Homeowner Signature"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              hintText="Date"
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
