import React from 'react';
import LoginScreen from './LoginScreen.jsx';
import { IP } from '../../../../config/config.js';

export default class LoginScreenContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loginSucceeded: true,
    }
  }

  login = (data) => {
    var _this = this;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "http://" + IP + "/auth/login", true);
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if(this.status == 200) {
          let token = JSON.parse(httpRequest.responseText);
          var userInfo = token.token.split("_");
          _this.props.setCredentials(userInfo[0], userInfo[1], userInfo[2], userInfo[3]);
        } else{
          _this.setState({
            loginSucceeded: false,
          });
        }
      }
    };
    httpRequest.send(JSON.stringify(data));

    _this.setState({
      loginSucceeded: true,
    });
  }

  render() {
    var actions = {
      login: this.login,
    };

    return (
      <LoginScreen
        actions={actions}
        loginStatus={this.state.loginSucceeded}
      />
    );
  }
}
