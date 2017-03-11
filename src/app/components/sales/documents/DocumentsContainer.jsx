import React from 'react';
import Documents from './Documents.jsx';
import { IP } from '../../../../../config/config.js';


export default class DocumentsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      files: undefined,
    }
  }

  componentWillMount() {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let items = JSON.parse(httpRequest.responseText).files;
        let files = items.filter(function(item) {
          return item.type !== "folder";
        });
        // console.log(items);
        _this.setState({
          files: files,
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/management/files", true);
    httpRequest.send(null);
  }

  render() {
    return (
      <Documents files={this.state.files} />
    );
  }
}
