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
        } else {
          _this.props.handleSnackbar('', true, this.status);
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
        } else {
          _this.props.handleSnackbar('', true, this.status);
        }
      }
    };

    httpRequest.open('GET', "http://" + IP + "/sales/getone?id=" + saleId, true);
    httpRequest.send(null);
  }

  resumeDocuSignStep = (saleId) => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let sale = JSON.parse(httpRequest.responseText).sale;

          let data = {
            saleObj: {
              salesNumber: sale.salesNumber,
              firstName: sale.firstName,
              lastName: sale.lastName,
              address: sale.address,
              unit: sale.unit,
              city: sale.city,
              province: sale.province,
              postalCode: sale.postalCode.replace(/\s/g,''),
              enbridgeNum: sale.enbridgeNum,
              email: sale.email,
              homePhone: sale.homePhone,
              cellPhone: sale.cellPhone,
              programId: sale.programId,
              installationDateTime: sale.installationDateTime,
              //not there yet
              notes: sale.notes ? sale.notes : "",
              salesRepId: sale.salesRepId,
              salesRepName: sale.salesRepName
            },
          };

          _this.props.resumeSale(1, data);

        } else {
          _this.props.handleSnackbar('', true, this.status);
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
          _this.props.handleSnackbar('Sale has been cancelled', false, this.status);
        } else {
          _this.props.handleSnackbar('', true, this.status);
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
      resumeDocuSignStep: this.resumeDocuSignStep,
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
