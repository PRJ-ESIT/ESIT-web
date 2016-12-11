import React from 'react';
import '../../client/styles/style.scss';
import { AppBar, FlatButton  } from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LoginDialog from './modals/LoginDialog.jsx';
import LeftMenu from './LeftMenu.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import NewSale from './sales/NewSale.jsx';
import AllSales from './sales/AllSales.jsx';
import InstallationContainer from './installations/InstallationContainer.jsx';
import CompleteInstallation from './installations/CompleteInstallation.jsx';
import AllInstallations from './installations/AllInstallations.jsx';
import ScheduleInstallation from './management/ScheduleInstallation.jsx';
import NewEmployee from './management/NewEmployee.jsx';
import AllEmployees from './management/AllEmployees.jsx';
import AllCustomers from './management/AllCustomers.jsx';
import Documents from './management/Documents.jsx';

import { IP } from '../../../config/config.js';

const defaultProps = {
  dashboard: Dashboard,
  newSale: NewSale,
  allSales: AllSales,
  documents: Documents,
  completeInstallation: InstallationContainer,
  allInstallations: AllInstallations,
  scheduleInstallation: ScheduleInstallation,
  newEmployee: NewEmployee,
  allEmployees: AllEmployees,
  allCustomers: AllCustomers
};


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginDialog: false,
      leftMenuOpen: false,
      currentContent: Dashboard,

      status: "",
      formId: undefined,
      docuSignUrl: undefined,
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.menuClickHandler = this.menuClickHandler.bind(this);
    this.appBarClickHandler = this.appBarClickHandler.bind(this);
    this.editClickHandler = this.editClickHandler.bind(this);
    this.getEmbeddedUrl = this.getEmbeddedUrl.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  closeHandler() {
    this.setState({
      loginDialog: false,
    });
  }

  handleLogin() {
    console.log('handle login');
    this.setState({
      loginDialog: true,
    });
  };

  getRightButtons() {
    var rightButtonsStyle = {
      'height': '40px',
      'marginRight': '5px',
      'marginLeft': '5px',
      'marginTop': '4px',
      'marginBottom': '4px',
    };
    return (
      <div className="navBarButtonsContainer">
        <FlatButton
          labelStyle={{ color: "#2f3c7d" }}
          backgroundColor="white"
          hoverColor="$light-gray"
          style={rightButtonsStyle}
          onTouchTap={this.handleLogin}
          label="Logout"
        />
      </div>
    );
  }

  menuClickHandler(contentName) {
    this.setState({
      currentContent: this.props[contentName],
      leftMenuOpen: false,
      status: "",
    });
  }

  appBarClickHandler() {
    if(this.state.leftMenuOpen) {
      this.setState({leftMenuOpen: false});
    } else {
      this.setState({leftMenuOpen: true});
    }
  }
  editClickHandler(status, id, contentName) {
    console.log(status);
    console.log(id);
    console.log(contentName);
    this.setState({
      currentContent: this.props[contentName],
      status: status,
      id: id,
    });
  }

  getEmbeddedUrl(data) {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(httpRequest.responseText);
        let url = JSON.parse(httpRequest.responseText).url;
        console.log(url);

        _this.setState({
          docuSignURL: url,
        });
      }
    };

    httpRequest.open('POST', "http://" + IP + "/getembeddedurl", true);
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send(JSON.stringify(data));
  }
  getIframe() {
    return (
      <iframe id='docusignIframe' src={this.state.docuSignURL} frameBorder="0"
        style={{ overflow: "hidden", height: "100%", width: "100%", position: "absolute" }}
        height="100%" width="100%">
      </iframe>
    );
  }

  getApp() {
    var leftMenuStyles = this.state.leftMenuOpen ? {'' : ''} : { 'display': 'none' };
    var appBarStyles = {'backgroundColor': '#2F3C7D'};
    let CurrentContent = this.state.currentContent;
    return (
      <div style={{width: '100%', height: '100%'}}>
        <AppBar
          title='esit'
          iconElementRight={this.getRightButtons()}
          onLeftIconButtonTouchTap={this.appBarClickHandler}
          style={appBarStyles}
        />
        <div className="contentContainer">
          <div className="leftPanel" style={leftMenuStyles}>
            <LeftMenu clickHandler={this.menuClickHandler}/>
          </div>
          <div className="mainContent">
            <CurrentContent getEmbeddedUrl={this.getEmbeddedUrl} editClickHandler={this.editClickHandler}  status={this.state.status} id={this.state.id}/>
          </div>
        </div>
        { this.state.loginDialog ?
          <LoginDialog
            closeHandler={this.closeHandler}
            open={this.state.loginDialog}
          />
        : null }
      </div>
    );
  }

  render() {
    if (this.state.docuSignURL) {
      return this.getIframe();
    }
    else {
      return this.getApp();
    }
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

App.defaultProps = defaultProps;
