import React from 'react';
import Dashboard from './Dashboard.jsx';
import { IP } from '../../../../config/config.js';

export default class DashboardContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allSales: undefined,
      allInstallations: undefined,
    };
  }

  componentWillMount() {
    this.getDashboardInfo();
  }

  getDashboardInfo = () => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        let allSales = JSON.parse(httpRequest.responseText).data.sales;
        let allInstallations = JSON.parse(httpRequest.responseText).data.installations;

        _this.setState({
          allSales: allSales,
          allInstallations: allInstallations,
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/common/dashboard?id=" + this.props.userId, true);
    httpRequest.send(null);
  }

  render() {
    return (
      <Dashboard
        allSales={this.state.allSales}
        allInstallations={this.state.allInstallations}
        {...this.props}
      />
    );
  }
}
