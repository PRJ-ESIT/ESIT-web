import React from 'react';
import { IP } from '../../../../../config/config.js';
import InstallationTable from './InstallationTable.jsx';

export default class InstallationTableContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //an array to keep the data for all installations
      allInstallations: undefined,

      //installation details for the modal dialog
      installationDetails: undefined,
    }
  }

  componentWillMount() {
    this.getAllInstallations();
  }

  getAllInstallations = () => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let allInstallations = JSON.parse(httpRequest.responseText).installations;
        _this.setState({
          allInstallations: allInstallations,
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/installations/getall?id=" + this.props.userId, true);
    httpRequest.send(null);
  }

  getInstallationDetails = (installationId) => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let installation = JSON.parse(httpRequest.responseText).installation;

        // Format and save installation date for details modal
        var tempDateTime;
        if (installation.installationDateTime) {
          tempDateTime = new Date(installation.installationDateTime);
          tempDateTime = tempDateTime.toLocaleString();
        } else {
          tempDateTime = null;
        }

        installation.installationDate = tempDateTime;

        _this.setState({
          installationDetails: installation,
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/installations/getone?id=" + installationId, true);
    httpRequest.send(null);
  }

  cancelInstallation = (installationId) => {
    let data = {
      installationId: installationId,
    };

    var _this = this;
    var request = new XMLHttpRequest();
    request.open('PUT', 'http://' + IP + '/installations/cancel', true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        _this.getAllInstallations();
      }
    };

    request.send(JSON.stringify(data));
  }

  clearInstallationDetails = () => {
    this.setState({
      installationDetails: undefined,
    });
  }

  render() {
    var actions = {
      cancelInstallation: this.cancelInstallation,
      getInstallationDetails: this.getInstallationDetails,
      clearInstallationDetails: this.clearInstallationDetails,
    };
    return (
      <InstallationTable
        allInstallations={this.state.allInstallations}
        installationDetails={this.state.installationDetails}
        actions={actions}
        {...this.props}
      />
    );
  }
}
