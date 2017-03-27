import React from 'react';
import { IP } from '../../../../../config/config.js';
import ScheduleInstallation from './ScheduleInstallation.jsx';

export default class ScheduleInstallationContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //an array to keep all unscheduled sales
      allSales: undefined,

      //an array to keep the list of installers
      allInstallers: undefined,
    }
  }

  componentWillMount() {
    this.getInstallationInfo();
  }

  getInstallationInfo = () => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let allSales = JSON.parse(httpRequest.responseText).data.sales;
          let allInstallers = JSON.parse(httpRequest.responseText).data.installers;

          _this.setState({
            allSales: allSales,
            allInstallers: allInstallers,
          });
        } else {
          _this.props.handleSnackbar('', true, this.status);
        }
      }
    };

    httpRequest.open('GET', "http://" + IP + "/management/getunscheduled", true);
    httpRequest.send(null);
  }

  createNewInstallation = (data) => {
    var _this = this;
    var request = new XMLHttpRequest();
    request.open('POST', "http://" + IP + '/installations/create', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 201) {
          _this.getInstallationInfo();
          _this.props.handleSnackbar('Installation has been scheduled', false);
        } else {
          _this.props.handleSnackbar('', true, this.status);
        }
      }
      //#TODO receive Sale number and add it to the state
    };

    request.send(JSON.stringify(data));
  }

  render() {
    var actions = {
      createNewInstallation: this.createNewInstallation,
    };
    return (
      <ScheduleInstallation
        allSales={this.state.allSales}
        allInstallers={this.state.allInstallers}
        actions={actions}
        {...this.props}
      />
    );
  }
}
