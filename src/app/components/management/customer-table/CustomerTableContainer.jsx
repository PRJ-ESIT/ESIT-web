import React from 'react';
import { IP } from '../../../../../config/config.js';
import CustomerTable from './CustomerTable.jsx';

export default class CustomerTableContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //an array to keep the data for all customers
      allCustomers: undefined,

      //customer details for the modal dialog
      customerDetails: undefined,
    }
  }

  componentWillMount() {
  	this.getAllCustomers();
  }

  getAllCustomers = () => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let allCustomers = JSON.parse(httpRequest.responseText).customers;
        _this.setState({
          allCustomers: allCustomers,
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/management/getallcustomers", true);
    httpRequest.send(null);
  }

  getCustomerDetails = (customerId) => {
  	var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let customer = JSON.parse(httpRequest.responseText).customer;

        _this.setState({
          customerDetails: customer,
        });
      }
    };

    httpRequest.open('GET', "http://" + IP + "/management/getonecustomer?id=" + customerId, true);
    httpRequest.send(null);
  }

  clearCustomerDetails = () => {
    this.setState({
      customerDetails: undefined,
    });
  }

  render() {
    var actions = {
      getCustomerDetails: this.getCustomerDetails,
      clearCustomerDetails: this.clearCustomerDetails,
    };
    return (
      <CustomerTable
        allCustomers={this.state.allCustomers}
        customerDetails={this.state.customerDetails}
        actions={actions}
        {...this.props}
      />
    );
  }
}