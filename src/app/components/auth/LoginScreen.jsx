import React from 'react';
import { TextField, FlatButton } from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { validateEmail, validations } from '../helpers/common.js';

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
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.loginStatus == true && nextProps.loginStatus == false) {
      this.setState({
        passwordErrorText: "Your login or password doesn't match our records",
      })
    }
  }

  //TODO - check if Chrome autofill works for the password without this workaround
  //once React 16 is released. If yes - remove refs from the username and password fields.
  //https://github.com/callemall/material-ui/issues/718
  componentDidMount() {
    setTimeout(() => {
      if(this.refs.username.getValue()) {
        this.refs.password.setState({...this.refs.password.state, hasValue: true})
      }
    }, 100)
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleLoginTextFieldChange = (e) => {
    this.setState({
      loginTxtField: e.target.value
    });
  }

  handlePasswordTextFieldChange = (e) => {
    this.setState({
      passwordTxtField: e.target.value
    });
  }

  login = () => {
    if(!validateEmail(this.state.loginTxtField)) {
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

      this.props.actions.login(data);
    }
  }

  enterHandler = (e) => {
    if (e.key == 'Enter') {
      this.login();
    }
  }

  render() {
    return (
      <div
        className="loginPage"
        onKeyUp={this.enterHandler}
      >
        <div className="mid">
          <div className="loginLogo">esit</div>
          <TextField
            ref="username"
            hintText="john_doe@email.com"
            hintStyle={{color: "white"}}
            floatingLabelText="Email"
            floatingLabelStyle={{color: "white"}}
            underlineStyle={{color: "white"}}
            underlineFocusStyle={{borderColor: "white"}}
            inputStyle={{color: "white"}}
            value={this.state.loginTxtField}
            onChange={this.handleLoginTextFieldChange}
            errorText={this.state.loginErrorText}
            maxLength="50"
          /><br />
          <TextField
            ref="password"
            hintText="<your_secure_password>"
            hintStyle={{color: "white"}}
            floatingLabelText="Password"
            floatingLabelStyle={{color: "white"}}
            type="password"
            underlineStyle={{color: "white"}}
            underlineFocusStyle={{borderColor: "white"}}
            inputStyle={{color: "white"}}
            value={this.state.passwordTxtField}
            onChange={this.handlePasswordTextFieldChange}
            errorText={this.state.passwordErrorText}
            maxLength="30"
          /><br />
          <FlatButton
            label="LOG IN"
            labelStyle={{color: "#2f3c7d"}}
            hoverColor="white"
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.login()}}
            backgroundColor="white"
            style={{marginTop: "20px"}}
          />
        </div>
      </div>
    );
  }
}

LoginScreen.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
