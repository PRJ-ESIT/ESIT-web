import React from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui';
import RecentSales from './tables/RecentSales.jsx';
import RecentInstallations from './tables/RecentInstallations.jsx';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboardWelcome">
          Welcome to <span style={{ fontFamily: '$logo-font' }}>esit</span>, {this.props.userName}!
        </div>
        <div className="dashboardTables">
          {this.props.role == "admin" || this.props.role == "manager" || this.props.role == "salesperson" ?
            <div className="recentSales salesAndInstallation">
              <Toolbar className="salesInstallationToolBar">
                <ToolbarTitle text={this.props.role == "salesperson" ? "Your Recent Sales" : "Recent Sales"} />
              </Toolbar>
              <RecentSales allSales={this.props.allSales}/>
            </div>
          : null }
          {this.props.role == "admin" || this.props.role == "manager" || this.props.role == "installer" ?
            <div className="recentInstallations salesAndInstallation">
              <Toolbar className="salesInstallationToolBar">
                <ToolbarTitle text={this.props.role == "installer" ? "Your Recent Installations" : "Recent Installations"}/>
              </Toolbar>
              <RecentInstallations allInstallations={this.props.allInstallations}/>
            </div>
          : null }
        </div>
      </div>
    );
  }
}
