import React from 'react';
import '../../client/styles/style.scss';
import { AppBar, FlatButton, Snackbar, } from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LeftMenu from './left-menu/LeftMenu.jsx';
import DashboardContainer from './dashboard/DashboardContainer.jsx';
import SaleStepper from './sales/create-sale/SaleStepper.jsx';
import SaleForm from './sales/create-sale/sale-form/SaleForm.jsx';
import SaleTableContainer from './sales/sale-table/SaleTableContainer.jsx';
import InstallationStepper from './installations/complete-installation/InstallationStepper.jsx';
import InstallationForm from './installations/complete-installation/installation-form/InstallationForm.jsx';
import InstallationTableContainer from './installations/installation-table/InstallationTableContainer.jsx';
import ScheduleInstallationContainer from './management/installation-schedule/ScheduleInstallationContainer.jsx';
import EmployeeForm from './management/employee-form/EmployeeForm.jsx';
import EmployeeTableContainer from './management/employee-table/EmployeeTableContainer.jsx';
import CustomerTableContainer from './management/customer-table/CustomerTableContainer.jsx';
import DocumentsContainer from './sales/documents/DocumentsContainer.jsx';

import { IP } from '../../../config/config.js';

const defaultProps = {
  dashboard: DashboardContainer,
  newSale: SaleStepper,
  editSale: SaleForm,
  allSales: SaleTableContainer,
  documents: DocumentsContainer,
  completeInstallation: InstallationStepper,
  editInstallation: InstallationForm,
  allInstallations: InstallationTableContainer,
  scheduleInstallation: ScheduleInstallationContainer,
  newEmployee: EmployeeForm,
  allEmployees: EmployeeTableContainer,
  allCustomers: CustomerTableContainer,
};

const styles = {
  greenSnackbar: {
    backgroundColor: 'teal',
    color: 'coral',
    textAlign: 'center',
  },

  redSnackbar: {
    backgroundColor: '#860e0e',
    color: 'coral',
    textAlign: 'center',
  }
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leftMenuOpen: false,
      currentContent: DashboardContainer,
      saleStepIndex: 0,
      installationStepIndex: 0,
      selectedInstallationId: undefined,

      status: "",
      formId: undefined,
      docuSignUrl: undefined,
      installationObj: undefined,
      saleObj: undefined,
      envelopeId: undefined,
      folderId: undefined,

      //snackbar state
      message: '',
      open: false,
    }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  //message - should be empty for errors, but should contain text for confirmations
  //error - boolean, true for red (error) snackbars, and false for green (confirmation) snackbars
  //statusCode - number, we should handle as many as possible
  handleSnackbar = (message, error, statusCode) => {
    if(message.length == 0) {
      //all error status codes are handled in here
      if(statusCode == 503) {
        this.setState({
          open: true,
          message: 'Internal server error :-(',
          error: error,
        });
      } else {
        this.setState({
          open: true,
          message: 'Couldn\'t connect to the server',
          error: error,
        });
      }
    } else {
      //display confirmation and custom error snackbars here (message shouldn't be empty)
      this.setState({
        open: true,
        message: message,
        error: error,
      });
    }
  }

  //Snackbar handler
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleLogout = () => {
    this.props.logout();
  }

  handleSaleNext = (obj) => {
    const {saleStepIndex} = this.state;
    if(obj == undefined) {
      var obj = {};
    }
    obj['saleStepIndex']=saleStepIndex + 1;

    this.setState(obj);
  }

  handleSalePrev = () => {
    const {saleStepIndex} = this.state;

    this.setState({saleStepIndex: saleStepIndex - 1});
  }

  handleInstallationNext = (obj) => {
    const {installationStepIndex} = this.state;
    if(obj == undefined) {
      var obj = {};
    }
    obj['installationStepIndex']=installationStepIndex + 1;

    this.setState(obj);
  }

  handleInstallationPrev = () => {
    const {installationStepIndex} = this.state;

    this.setState({installationStepIndex: installationStepIndex - 1});
  }

  resumeSale = (stepIndex, dataObject) => {
    if(stepIndex == 1) {
      dataObject["currentContent"] = this.props["newSale"];
      dataObject["saleStepIndex"] = 1;
    } else if(stepIndex == 2) {
      dataObject["currentContent"] = this.props["newSale"];
      dataObject["saleStepIndex"] = 2;
    }

    this.setState(dataObject);
  }

  resumeInstallation = (stepIndex, dataObject) => {
    console.log(dataObject);
    if(stepIndex == 2) {
      dataObject["currentContent"] = this.props["completeInstallation"];
      dataObject["installationStepIndex"] = 2;
      dataObject["status"] = "create";
    } else if(stepIndex == 3) {

    } else if(stepIndex == 4) {

    }

    this.setState(dataObject);
  }

  handleResetStepper = () => {
    this.setState({
      leftMenuOpen: false,
      saleStepIndex: 0,
      installationStepIndex: 0,
      selectedInstallationId: undefined,
      status: "",
      formId: undefined,
      docuSignUrl: undefined,
      installationObj: undefined,
      saleObj: undefined,
      envelopeId: undefined,
      folderId: undefined,
    })
  }

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
          onTouchTap={(e) => {e.preventDefault(); this.handleLogout()}}
          label="Logout"
        />
      </div>
    );
  }

  menuClickHandler = (contentName) => {
    this.setState({
      currentContent: this.props[contentName],
      leftMenuOpen: false,
      status: "",
    });
  }

  appBarClickHandler = () => {
    if(this.state.leftMenuOpen) {
      this.setState({leftMenuOpen: false});
    } else {
      this.setState({leftMenuOpen: true});
    }
  }

  editClickHandler = (status, id, contentName) => {
    this.setState({
      currentContent: this.props[contentName],
      status: status,
      id: id,
    });
  }

  // For Sales Forms
  getEmbeddedUrl = (data) => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let url = JSON.parse(httpRequest.responseText).url;
          _this.setState({
            docuSignURL: url,
          });
        } else {
          _this.handleSnackbar('', true, this.status);
        }
      }
    };

    httpRequest.open('POST', "http://" + IP + "/sales/getsaleembeddedurl", true);
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send(JSON.stringify(data));
  }

  // For customer
  getInstallationEmbeddedUrl = (data) => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let url = JSON.parse(httpRequest.responseText).url;
          let eId = JSON.parse(httpRequest.responseText).envelopeId;
          _this.setState({
            docuSignURL: url,
            envelopeId: eId,
          });
        } else {
          _this.handleSnackbar('', true, this.status);
        }
      }
    };

    httpRequest.open('POST', "http://" + IP + "/installations/getinstallationembeddedurl", true);
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send(JSON.stringify(data));
  }

  // For installer
  getInstallationEmbeddedUrl2 = (data) => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 201) {
          let url = JSON.parse(httpRequest.responseText).url;
          _this.setState({
            docuSignURL: url,
          });
        } else {
          _this.handleSnackbar('', true, this.status);
        }
      }
    };

    httpRequest.open('POST', "http://" + IP + "/installations/getinstallationembeddedurl2", true);
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send(JSON.stringify(data));
  }

  closeIframe = (message) => {
    if(message == "Sale forms are signed") {
      this.setState({
        docuSignURL: undefined,
        saleStepIndex: this.state.saleStepIndex + 1,
      });
    } else if(message == "First Installation form is signed") {
      this.setState({
        docuSignURL: undefined,
        installationStepIndex: this.state.installationStepIndex + 1,
      });
    } else if(message == "Second Installation form is signed") {
      this.setState({
        docuSignURL: undefined,
        envelopeId: undefined,
        installationStepIndex: this.state.installationStepIndex + 1,
      });
    }
  }

  componentDidMount() {
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    var _this = this;
    eventer(messageEvent,function(e) {
      var key = e.message ? "message" : "data";
      var data = e[key];
      _this.closeIframe(data);
    },false);
  }

  componentWillUnmount() {
    var eventMethod = window.addEventListener ? "removeEventListener" : "detachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "detachEvent" ? "onmessage" : "message";
    var _this = this;
    eventer(messageEvent,function(e) {
      var key = e.message ? "message" : "data";
      var data = e[key];
      _this.closeIframe(data);
    },false);
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
          onLeftIconButtonTouchTap={(e) => {e.preventDefault(); this.appBarClickHandler()}}
          style={appBarStyles}
        />
        <div className="contentContainer">
          <div className="leftPanel" style={leftMenuStyles}>
            <LeftMenu clickHandler={this.menuClickHandler} role={this.props.role}/>
          </div>
          <div className="mainContent">
            <CurrentContent getEmbeddedUrl={this.getEmbeddedUrl} editClickHandler={this.editClickHandler}
              status={this.state.status} id={this.state.id} menuClickHandler={this.menuClickHandler}
              saleStepIndex={this.state.saleStepIndex} installationStepIndex={this.state.installationStepIndex}
              handleSaleNext={this.handleSaleNext} handleSalePrev={this.handleSalePrev}
              handleInstallationNext={this.handleInstallationNext} handleInstallationPrev={this.handleInstallationPrev}
              selectedInstallationId={this.state.selectedInstallationId} installationObj={this.state.installationObj}
              getInstallationEmbeddedUrl={this.getInstallationEmbeddedUrl} envelopeId={this.state.envelopeId}
              getInstallationEmbeddedUrl2={this.getInstallationEmbeddedUrl2} saleObj={this.state.saleObj}
              folderId={this.state.folderId} userId={this.props.userId} userName={this.props.userName} role={this.props.role}
              handleResetStepper={this.handleResetStepper} handleSnackbar={this.handleSnackbar} resumeSale={this.resumeSale} resumeInstallation={this.resumeInstallation}/>
          </div>
        </div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          contentStyle={{fontSize: '18px'}}
          bodyStyle={this.state.error ? styles.redSnackbar : styles.greenSnackbar}
        />
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
