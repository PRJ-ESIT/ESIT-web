import React from 'react';
import { FlatButton, Toolbar, ToolbarTitle } from 'material-ui';
import RecentSales from './RecentSales.jsx';
import RecentInstallations from './RecentInstallations.jsx';
import { IP } from '../../../../config/config.js';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allSales: undefined,
      allInstallations: undefined,
    };
  }
  componentDidMount() {
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

    httpRequest.open('GET', "http://" + IP + "/dashboard", true);
    httpRequest.send(null);
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboardWelcome">
          Welcome to <span>esit</span>, %username%!
        </div>
        <div className="dashboardTables">
          <div className="recentSales salesAndInstallation">
            <Toolbar className="salesInstallationToolBar">
              <ToolbarTitle text="Recent Sales" />
            </Toolbar>
            <RecentSales allSales={this.state.allSales}/>
          </div>
          <div className="recentInstallations salesAndInstallation">
            <Toolbar className="salesInstallationToolBar">
              <ToolbarTitle text="Recent Installations" />
            </Toolbar>
            <RecentInstallations allInstallations={this.state.allInstallations}/>
          </div>
        </div>
      </div>
    );
  }
}
