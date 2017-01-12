import React from 'react';
import { TextField, FlatButton } from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { validateEmail, validations } from './helpers/common.js';
import { IP } from './../../../config/config.js';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loginTxtField: '',
      passwordTxtField: '',
      loginTxtField: '',
      passwordTxtField: '',
      loginErrorText: '',
      passwordErrorText: ''
    }

    this.login = this.login.bind(this);
    this.handleLoginTextFieldChange = this.handleLoginTextFieldChange.bind(this);
    this.handlePasswordTextFieldChange = this.handlePasswordTextFieldChange.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleLoginTextFieldChange(e) {
    this.setState({
      loginTxtField: e.target.value
    });
  }

  handlePasswordTextFieldChange(e) {
    this.setState({
      passwordTxtField: e.target.value
    });
  }

  login() {
    if(!validateEmail(this.state.loginTxtField)) {
      console.log('login validated, its incorrect');
      if(!validations.isPassword(this.state.passwordTxtField)) {
        this.setState({
          loginErrorText: 'Only haracters and numbers are allowed. Must be > 6 characters long',
          passwordErrorText: 'Must include at least 1 character, 1 number, one of the special characters !@#$%^&* and have at least 8 characters',
        });
      } else {
        this.setState({
          loginErrorText: 'Only haracters and numbers are allowed. Must be > 6 characters long',
          passwordErrorText: '',
        });
      }
    } else if(!validations.isPassword(this.state.passwordTxtField)) {
      console.log('password validated, its incorrect');
      this.setState({
        loginErrorText: '',
        passwordErrorText: 'Must include at least 1 character, 1 number, one of the special characters !@#$%^&* and have at least 8 characters',
      });
    } else if (this.state.loginErrorText.length > 0 && this.state.passwordErrorText.length > 0) {
      this.setState({
        loginErrorText: '',
        passwordErrorText: '',
      });
    } else {
      let data = {
        email: this.state.loginTxtField,
        password: this.state.passwordTxtField,
      };

      var _this = this;
      var httpRequest = new XMLHttpRequest();
      httpRequest.open('POST', "http://" + IP + "/login", true);
      httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      httpRequest.onreadystatechange = function() {
        if (this.readyState == 4) {
          if(this.status == 200) {
            console.log('everything worked');
            let token = JSON.parse(httpRequest.responseText);
            var userInfo = token.token.split("_");
            console.log(userInfo);
            _this.props.setCredentials(userInfo[0], userInfo[1], userInfo[2], userInfo[3]);
          } else{
            _this.setState({
              passwordErrorText: "Your login or password doesn't match our records",
            });
          }
        }
      };
      httpRequest.send(JSON.stringify(data));
    }
  }

  render() {
    return (
      <div className="loginPage">
        <div className="mid">
          <div className="loginLogo">esit</div>
          <TextField
            hintText="john_doe@email.com"
            hintStyle={{color: "white"}}
            floatingLabelText="Email"
            floatingLabelStyle={{color: "white"}}
            underlineStyle={{color: "white"}}
            underlineFocusStyle={{borderColor: "white"}}
            value={this.state.loginTxtField}
            onChange={this.handleLoginTextFieldChange}
            errorText={this.state.loginErrorText}
          /><br />
          <TextField
            hintText="<your_secure_password>"
            hintStyle={{color: "white"}}
            floatingLabelText="Password"
            floatingLabelStyle={{color: "white"}}
            type="password"
            underlineStyle={{color: "white"}}
            underlineFocusStyle={{borderColor: "white"}}
            value={this.state.passwordTxtField}
            onChange={this.handlePasswordTextFieldChange}
            errorText={this.state.passwordErrorText}
          /><br />
          <FlatButton
            label="LOG IN"
            labelStyle={{color: "#2f3c7d"}}
            hoverColor={{color: "grey"}}
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.login()}}
            backgroundColor="white"
            style={{float: "right"}}
          />
        </div>
      </div>
    );
  }
}

LoginScreen.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
