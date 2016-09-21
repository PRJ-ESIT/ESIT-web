import React from 'react';
import { FlatButton, Toolbar, ToolbarTitle } from 'material-ui';
import RecentSales from './RecentSales.jsx';
import RecentInstallations from './RecentInstallations.jsx';

const style = {
  margin: '12px',
  height: '100px',
};

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
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
            <RecentSales />
          </div>
          <div className="recentInstallations salesAndInstallation">
            <Toolbar className="salesInstallationToolBar">
              <ToolbarTitle text="Recent Installations" />
            </Toolbar>
            <RecentInstallations />
          </div>
        </div>
      </div>
    );
  }
}
