import React from 'react';
import { IP } from '../../../../../../config/config.js';
import SelectInstallation from './SelectInstallation.jsx';

export default class SelectInstallationContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //an array of all scheduled installations
      installations: undefined,
    };
  }

  componentWillMount() {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let installations = JSON.parse(httpRequest.responseText).installations;
          _this.setState({
            installations: installations
          });
        //503 is triggered when Tomcat is down
        } else if(this.status == 503) {
          _this.props.handleSnackbar('Internal server error :-(', true);
          //if node is down, or there is no Internet - this error will be displayed
        } else {
          _this.props.handleSnackbar('Couldn\'t connect to the server', true);
        }
      }
    };

    httpRequest.open('GET', "http://" + IP + "/installations/getallscheduled?id=" + this.props.userId, true);
    httpRequest.send(null);
  }


  render() {
    return (
      <SelectInstallation installations={this.state.installations} {...this.props} />
    );
  }
}
