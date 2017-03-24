import React from 'react';
import SaleCamera from './SaleCamera.jsx';
import { IP } from '../../../../../../config/config.js';

export default class SaleCameraContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sale: undefined
    };
  }

  componentWillMount() {
    //fetching a new Sale, since the sale carried from the previous element doesn't have an envelopeId
    this.getSaleDetails(this.props.sale.salesNumber);
  }

  getSaleDetails = (saleId) => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let sale = JSON.parse(httpRequest.responseText).sale;
          _this.setState({
            sale: sale,
          });
        } else {
          _this.props.handleSnackbar('', true, this.status);
        }
      }
    }

    httpRequest.open('GET', "http://" + IP + "/sales/getone?id="
      + saleId, true);
    httpRequest.send(null);
  }

  iOSUploadSingleFile = (file_URI) => {
    var retries = 0;
    var fileURI = file_URI;
    var _this = this;
    var win = function (r) {
      _this.clearCache();
      retries = 0;
      _this.props.handleInstallationNext();
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
      folderId: this.state.sale.folderId,
      id: this.props.id,
      type: "Sale"
    }; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://" + IP + "/common/upload"), win, fail, options);
  }

  clearCache = () => {
    navigator.camera.cleanup();
  }

  desktopUploadSingleFile = (file_URI, saleFile, enableButtons) => {
    var fd = new FormData();
    fd.append('type', 'Sale');
    fd.append('folderId', this.state.sale.folderId);
    fd.append('id', this.state.sale.salesNumber);
    fd.append('file', saleFile);

    let _this = this;
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let response = JSON.parse(httpRequest.responseText);
          if (response.success == true) {
            _this.props.handleSaleNext();
          } else {
            enableButtons(false);
          }
        } else {
          _this.props.handleSnackbar('', true, this.status);
        }
      }
    };
    httpRequest.open('POST', "http://" + IP + '/common/upload', true);
    httpRequest.send(fd);

    enableButtons(true)
  }

  render() {
    var actions = {
      iOSUploadSingleFile: this.iOSUploadSingleFile,
      desktopUploadSingleFile: this.desktopUploadSingleFile,
    };

    return (
      <SaleCamera
        actions={actions}
        {...this.props}
      />
    );
  }
}
