import React from 'react';
import InstallationCamera from './InstallationCamera.jsx';
import { IP } from '../../../../../../config/config.js';

export default class InstallationCameraContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploadedPictures: 0,
    };
  }

  iOSUploadSingleFile = (file_URI) => {
    var retries = 0;
    var fileURI = file_URI;
    var _this = this;
    var win = function (r) {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      _this.clearCache();
      retries = 0;
      _this.setState({
        uploadedPictures: _this.state.uploadedPictures + 1,
      });
    }

    var fail = function (error) {
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);

      if (retries == 0) {
        retries ++
        setTimeout(function() {
          _this.iOSUploadSingleFile(fileURI)
        }, 1000)
      } else {
        retries = 0;
        _this.clearCache();
        _this.props.handleSnackbar('Couldn\'t upload the file, try again', true);
      }
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = {
      folderId: this.props.folderId,
      id: this.props.id,
      type: "Installation"
    }; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://" + IP + "/common/upload"), win, fail, options);
  }

  desktopUploadAllFiles = (installationFiles, enableButtons) =>{
    var fd = new FormData();
    fd.append('type', 'Installation');
    fd.append('folderId', this.props.folderId);
    fd.append('id', this.props.id);

    for (var i = 0; i < installationFiles.length; i++) {
      fd.append('file' + i, installationFiles[i]);
    }

    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let response = JSON.parse(httpRequest.responseText);
          if (response.success == true) {
            _this.props.handleInstallationNext({
              status: response.installation.status,
            });
          } else {
            enableButtons(false);
          }
          //503 is triggered when Tomcat is down
        } else if(this.status == 503) {
          _this.props.handleSnackbar('Internal server error :-(', true);
          //if node is down, or there is no Internet - this error will be displayed
        } else {
          _this.props.handleSnackbar('Couldn\'t connect to the server', true);
        }
      }
    };
    httpRequest.open('POST', "http://" + IP + '/common/upload', true);
    httpRequest.send(fd);

    enableButtons(true);
  }

  clearCache = () => {
    navigator.camera.cleanup();
  }

  render() {
    var actions = {
      iOSUploadSingleFile: this.iOSUploadSingleFile,
      desktopUploadAllFiles: this.desktopUploadAllFiles,
    };

    return (
      <InstallationCamera
        actions={actions}
        uploadedPictures={this.state.uploadedPictures}
        {...this.props}
      />
    );
  }
}
