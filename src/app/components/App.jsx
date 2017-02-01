import React from 'react';
import '../../client/styles/style.scss';
import { AppBar, FlatButton  } from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LeftMenu from './LeftMenu.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import SaleContainer from './sales/SaleContainer.jsx';
import NewSale from './sales/NewSale.jsx';
import AllSales from './sales/AllSales.jsx';
import InstallationContainer from './installations/InstallationContainer.jsx';
import CompleteInstallation from './installations/CompleteInstallation.jsx';
import AllInstallations from './installations/AllInstallations.jsx';
import ScheduleInstallation from './management/ScheduleInstallation.jsx';
import NewEmployee from './management/NewEmployee.jsx';
import AllEmployees from './management/AllEmployees.jsx';
import AllCustomers from './management/AllCustomers.jsx';
import Documents from './sales/Documents.jsx';

import { IP } from '../../../config/config.js';

const defaultProps = {
  dashboard: Dashboard,
  newSale: SaleContainer,
  editSale: NewSale,
  allSales: AllSales,
  documents: Documents,
  completeInstallation: InstallationContainer,
  editInstallation: CompleteInstallation,
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
      leftMenuOpen: false,
      currentContent: Dashboard,
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
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.menuClickHandler = this.menuClickHandler.bind(this);
    this.appBarClickHandler = this.appBarClickHandler.bind(this);
    this.editClickHandler = this.editClickHandler.bind(this);
    this.getEmbeddedUrl = this.getEmbeddedUrl.bind(this);
    this.getInstallationEmbeddedUrl = this.getInstallationEmbeddedUrl.bind(this);
    this.getInstallationEmbeddedUrl2 = this.getInstallationEmbeddedUrl2.bind(this);
    this.closeIframe = this.closeIframe.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleLogout() {
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

  // For Sales Forms
  getEmbeddedUrl(data) {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let url = JSON.parse(httpRequest.responseText).url;
        _this.setState({
          docuSignURL: url,
        });
      }
    };

    httpRequest.open('POST', "http://" + IP + "/sales/getsaleembeddedurl", true);
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send(JSON.stringify(data));
  }

  // For customer
  getInstallationEmbeddedUrl(data) {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let url = JSON.parse(httpRequest.responseText).url;
        let eId = JSON.parse(httpRequest.responseText).envelopeId;
        _this.setState({
          docuSignURL: url,
          envelopeId: eId,
        });
      }
    };

    httpRequest.open('POST', "http://" + IP + "/installations/getinstallationembeddedurl", true);
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send(JSON.stringify(data));
  }

  // For installer
  getInstallationEmbeddedUrl2(data) {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let url = JSON.parse(httpRequest.responseText).url;
        _this.setState({
          docuSignURL: url,
        });
      }
    };

    httpRequest.open('POST', "http://" + IP + "/installations/getinstallationembeddedurl2", true);
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send(JSON.stringify(data));
  }

  closeIframe(message) {
    console.log(message);
    console.log('I  AM HERE');
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
              folderId={this.state.folderId} userId={this.props.userId} userName={this.props.userName} role={this.props.role}/>
          </div>
        </div>
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
