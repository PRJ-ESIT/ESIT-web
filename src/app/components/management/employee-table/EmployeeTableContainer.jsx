import React from 'react';
import { IP } from '../../../../../config/config.js';
import EmployeeTable from './EmployeeTable.jsx';

export default class EmployeeTableContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //an array to keep all employees data
      allEmployees: undefined,

      // Modal content - employee details
      employeeDetails: undefined,
    }
  }


  componentWillMount() {
    this.getallemployees();
  }

  getallemployees = () => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let allEmployees = JSON.parse(httpRequest.responseText).employees;
          _this.setState({
            allEmployees: allEmployees,
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

    httpRequest.open('GET', "http://" + IP + "/management/getallemployees", true);
    httpRequest.send(null);
  }

  getEmployeeDetails = (employeeId) => {
    var httpRequest = new XMLHttpRequest();
    let _this = this;
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let employee = JSON.parse(httpRequest.responseText).employee;

          // Format and save hire date for details modal
          var tempDateTime;
          if (employee.hireDate) {
            tempDateTime = new Date(employee.hireDate);
            tempDateTime = tempDateTime.toLocaleDateString();
          } else {
            tempDateTime = null;
          }

          employee.hireDate = tempDateTime;
          _this.setState({
            employeeDetails: employee,
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

    httpRequest.open('GET', "http://" + IP + "/management/getoneemployee?id=" + employeeId, true);
    httpRequest.send(null);
  }

  toggleEmployeeStatus = (employeeId) => {
    let data = {
      employeeId: employeeId,
    };

    var _this = this;
    var request = new XMLHttpRequest();
    request.open('PUT', 'http://' + IP + '/management/toggleemployeestatus', true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          _this.getallemployees();
          //503 is triggered when Tomcat is down
        } else if(this.status == 503) {
          _this.props.handleSnackbar('Internal server error :-(', true);
          //if node is down, or there is no Internet - this error will be displayed
        } else {
          _this.props.handleSnackbar('Couldn\'t connect to the server', true);
        }
      }
    };

    request.send(JSON.stringify(data));
  }

  clearEmployeeDetails = () => {
    this.setState({
      employeeDetails: undefined,
    });
  }

  render() {
    var actions = {
      toggleEmployeeStatus: this.toggleEmployeeStatus,
      getEmployeeDetails: this.getEmployeeDetails,
      clearEmployeeDetails: this.clearEmployeeDetails,
    };
    return (
      <EmployeeTable
        allEmployees={this.state.allEmployees}
        employeeDetails={this.state.employeeDetails}
        actions={actions}
        {...this.props}
      />
    );
  }
}
