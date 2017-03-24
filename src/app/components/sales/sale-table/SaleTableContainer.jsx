import React from 'react';
import { IP } from '../../../../../config/config.js';
import SaleTable from './SaleTable.jsx';

export default class SaleTableContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //an array to keep the data for all sales
      allSales: undefined,

      //sale details for the modal dialog
      saleDetails: undefined,
    }
  }

  componentWillMount() {
    this.getAllSales();
  }

  getAllSales = () => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let allSales = JSON.parse(httpRequest.responseText).sales;
          _this.setState({
            allSales: allSales,
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

    httpRequest.open('GET', "http://" + IP + "/sales/getall?id=" + this.props.userId, true);
    httpRequest.send(null);
  }

  getSaleDetails = (saleId) => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let sale = JSON.parse(httpRequest.responseText).sale;

          // Format and save sale date for details modal
          var tempDateTime;
          if (sale.installationDateTime) {
            tempDateTime = new Date(sale.installationDateTime);
            tempDateTime = tempDateTime.toLocaleString();
          } else {
            tempDateTime = null;
          }
          sale.installationDate = tempDateTime;

          _this.setState({
            saleDetails: sale,
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

    httpRequest.open('GET', "http://" + IP + "/sales/getone?id=" + saleId, true);
    httpRequest.send(null);
  }

  clearSaleDetails = () => {
    this.setState({
      saleDetails: undefined,
    });
  }

  cancelSale = (saleId) => {
    let data = {
      saleId: saleId,
    };

    var _this = this;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          _this.getAllSales();
          //503 is triggered when Tomcat is down
        } else if(this.status == 503) {
          _this.props.handleSnackbar('Internal server error :-(', true);
          //if node is down, or there is no Internet - this error will be displayed
        } else {
          _this.props.handleSnackbar('Couldn\'t connect to the server', true);
        }
      }
    };

    request.open('PUT', 'http://' + IP + '/sales/cancel', true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify(data));
  }



  render() {
    var actions = {
      cancelSale: this.cancelSale,
      getSaleDetails: this.getSaleDetails,
      clearSaleDetails: this.clearSaleDetails,
    };
    return (
      <SaleTable
        allSales={this.state.allSales}
        saleDetails={this.state.saleDetails}
        actions={actions}
        {...this.props}
      />
    );
  }
}
