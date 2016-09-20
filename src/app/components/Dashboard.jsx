import React from 'react';
import { FlatButton } from 'material-ui';


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
        <div className="dashboard-buttons" style={{backgroundColor: 'white'}}>
          <FlatButton labelStyle={{height: '90px'}} label="Create New Sale" primary={true} style={style} />
          <FlatButton label="Schedule Installation" primary={true} style={style} />
          <FlatButton label="View All Sales" primary={true} style={style} />
          <FlatButton label="View All Installations" primary={true} style={style} />
          <FlatButton label="View All Employees" primary={true} style={style} />
        </div>
        <div className="dashboard-tables" style={{backgroundColor: 'green'}}> </div>
      </div>
    );
  }
}
