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
import ScheduleInstallation from './installations/ScheduleInstallation.jsx';
import AllInstallations from './installations/AllInstallations.jsx';
import NewEmployee from './management/NewEmployee.jsx';
import AllEmployees from './management/AllEmployees.jsx';
import AllCustomers from './management/AllCustomers.jsx';
import Documents from './management/Documents.jsx';

const defaultProps = {
  dashboard: Dashboard,
  newSale: NewSale,
  allSales: AllSales,
  documents: Documents,
  scheduleInstallation: ScheduleInstallation,
  allInstallations: AllInstallations,
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
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.menuClickHandler = this.menuClickHandler.bind(this);
    this.appBarClickHandler = this.appBarClickHandler.bind(this);
    this.editClickHandler = this.editClickHandler.bind(this);
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
  render() {
    var leftMenuStyles = this.state.leftMenuOpen ? {'' : ''} : { 'display': 'none' };
    var appBarStyles = {'backgroundColor': '#2F3C7D'};
    let CurrentContent = this.state.currentContent;
    return (
      <div style={{width: '100%', height: '100%'}}>
        <AppBar
          title='esit'
          titleStyle={{'fontFamily': 'Damion', 'fontSize': '60px'}}
          iconElementRight={this.getRightButtons()}
          onLeftIconButtonTouchTap={this.appBarClickHandler}
          style={appBarStyles}
        />
        <div className="contentContainer">
          <div className="leftPanel" style={leftMenuStyles}>
            <LeftMenu clickHandler={this.menuClickHandler}/>
          </div>
          <div className="mainContent">
            <CurrentContent editClickHandler={this.editClickHandler}  status={this.state.status} id={this.state.id}/>
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
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

App.defaultProps = defaultProps;
