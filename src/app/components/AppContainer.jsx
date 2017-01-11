import React from 'react';
import App from './App.jsx';
import LoginScreen from './LoginScreen.jsx';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      role: undefined,
      userId: undefined,
      userName: undefined,
    };
    this.setCredentials = this.setCredentials.bind(this);
    this.clearCredentials = this.clearCredentials.bind(this);
  }

  componentDidMount() {
    var role = window.sessionStorage.getItem("role"); //Get item
    var userId = window.sessionStorage.getItem("userId"); //Get item

    if(role != undefined && userId != undefined) {
      this.setState({
        loggedIn: true,
      });
    }
  }

  componentWillUpdate() {
    if(this.state.loggedIn == false) {
      var role = window.sessionStorage.getItem("role"); //Get item
      var userId = window.sessionStorage.getItem("userId"); //Get item
      if(role != undefined && userId != undefined) {
        this.setState({
          loggedIn: true,
        });
      }
    }
  }

  setCredentials(userId, firstName, lastName, role) {
    window.sessionStorage.setItem("role", role); //Set item
    window.sessionStorage.setItem("userId", userId); //Set item
    this.setState({
      userId: userId,
      userName: firstName + lastName,
      role: role,
    });
  }

  clearCredentials() {
    window.sessionStorage.clear(); //Clear storage
    this.setState({
      loggedIn: false,
      userId: undefined,
      userName: undefined,
      role: undefined,
    });
  }

  render() {
      if(this.state.loggedIn) {
        return <App logout={this.clearCredentials} role={this.state.role}/>;
      } else {
        return <LoginScreen setCredentials={this.setCredentials}/>;
      }
  }
}

ReactDOM.render(
  <AppContainer />,
  document.getElementById('app')
);
