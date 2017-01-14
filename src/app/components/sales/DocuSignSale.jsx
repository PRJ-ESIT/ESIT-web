import React from 'react';
import {CircularProgress} from 'material-ui';

export default class DocuSignSale extends React.Component {
  componentDidMount() {
    // Get embedded URL
    var date = new Date(this.props.sale.installationDateTime);
    date = date.toLocaleDateString();
    var time = new Date(this.props.sale.installationDateTime);
    time = time.toLocaleTimeString();

    let data = {
      // Homeowner Information
      salesNumber: this.props.sale.salesNumber,
      fname: this.props.sale.firstName,
      lname: this.props.sale.lastName, //customer table
      address: this.props.sale.address, //address table
      unitNum: this.props.sale.unit,//address table
      city: this.props.sale.city,//address table
      province: this.props.sale.province,//address table
      postalCode: this.props.sale.postalCode.replace(/\s/g,''),//address table
      enbridge: this.props.sale.enbridgeNum, //customer table
      email: this.props.sale.email, //customer table
      homePhone: this.props.sale.homePhone, //customer table
      cellPhone: this.props.sale.cellPhone, //customer table

      // Program
      programType: this.props.sale.programId, //sale table

      //Installation & Delivery
      installationDate: date, //sale table
      installationTime: time, //sale table
      notes: this.props.sale.notes, //sale table

      // The rest
      salesRepId: this.props.sale.salesRepId,
      salesRepName: this.props.sale.salesRepName
    };

    this.props.getEmbeddedUrl(data);
  }
  render() {
    return (
      <div>
        <div className="mid">
          <p style={{margin: 'auto'}}>Generating DocuSign Form</p>
          <br />
          <CircularProgress
            size={80}
            thickness={5}
            style={{margin: 'auto'}}
          />
        </div>
      </div>
    );
  }
}
