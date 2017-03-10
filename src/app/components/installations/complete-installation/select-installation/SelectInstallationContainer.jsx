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
      if (this.readyState == 4 && this.status == 200) {
        let installations = JSON.parse(httpRequest.responseText).installations;
        _this.setState({
          installations: installations
        });

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
