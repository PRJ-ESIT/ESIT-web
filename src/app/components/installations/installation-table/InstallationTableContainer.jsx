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
      if (this.readyState == 4) {
        if (this.status == 200) {
          let allInstallations = JSON.parse(httpRequest.responseText).installations;
          _this.setState({
            allInstallations: allInstallations,
          });
        } else {
          _this.props.handleSnackbar('', true, this.status);
        }
      }
    };

    httpRequest.open('GET', "http://" + IP + "/installations/getall?id=" + this.props.userId, true);
    httpRequest.send(null);
  }

  getInstallationDetails = (installationId) => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
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
        } else {
          _this.props.handleSnackbar('', true, this.status);
        }
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
      if (this.readyState == 4) {
        if (this.status == 200) {
          _this.getAllInstallations();
          _this.props.handleSnackbar('Installation has been cancelled', false, this.status);
        } else {
          _this.props.handleSnackbar('', true, this.status);
        }
      }
    };

    request.send(JSON.stringify(data));
  }

  clearInstallationDetails = () => {
    this.setState({
      installationDetails: undefined,
    });
  }

  resumeInstallationFormStep = (installationId) => {
    let data = {
      selectedInstallationId: installationId,
    };

    this.props.resumeInstallation(2, data);
  }

  resumeDocuSignCustomerStep = (installationId) => {


    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
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

          var docuSignObj = {
            installationObj: {
              installationId: installationId,
              customerFirstName: installation.customerFirstName,
              customerLastName: installation.customerLastName,
              address: installation.address,
              unitNum: installation.unit,
              city: installation.city,
              province: installation.province,
              postalCode: installation.postalCode,
              enbridge: installation.enbridgeNum,
              email: installation.email,
              homePhone: installation.homePhone,
              cellPhone: installation.cellPhone,
              sqft: installation.sqFootage,
              bathrooms: installation.bathrooms,
              residents: installation.residents,
              pool: installation.hasPool,

              program1: installation.product == "Whole Home Filter" ? true : false,
              program2: installation.product == "Whole Home D-Scaler" ? true : false,
              program3: installation.product == "Whole Home Combo" ? true : false,
              program4: true,
              program5: true,
              program6: true,
              checklist1: 'yes',
              checklist2: 'yes',
              checklist3: 'yes',
              checklist4: 'yes',
              checklist5: 'yes',
              checklist6: 'yes',
              acknowledgement1: true,
              acknowledgement2: true,
              acknowledgement3: true,
              acknowledgement4: true,
              notes: installation.notes,
              installedDate: new Date(installation.installationDateTime),
              installerId: installation.installerId,
              installerName: installation.installerName,
              installerEmail: installation.installerEmail,
            }
          };

          console.log(docuSignObj);
          _this.props.resumeInstallation(3, docuSignObj);
        } else {
          _this.props.handleSnackbar('', true, this.status);
        }
      }
    };

    httpRequest.open('GET', "http://" + IP + "/installations/getone?id=" + installationId, true);
    httpRequest.send(null);

  }

  resumeDocuSignInstallerStep = (installationId) => {

  }

  render() {
    var actions = {
      cancelInstallation: this.cancelInstallation,
      getInstallationDetails: this.getInstallationDetails,
      clearInstallationDetails: this.clearInstallationDetails,
      resumeInstallationFormStep: this.resumeInstallationFormStep,
      resumeDocuSignCustomerStep: this.resumeDocuSignCustomerStep,
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
