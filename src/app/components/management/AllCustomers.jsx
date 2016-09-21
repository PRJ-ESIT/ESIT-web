import React from 'react';
import {Toolbar, ToolbarTitle} from 'material-ui';
export default class AllCustomers extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="allCustomers">
        <Toolbar className="allCustomersToolbar">
          <ToolbarTitle text="View All Customers" />
        </Toolbar>
      </div>
    );
  }
}
