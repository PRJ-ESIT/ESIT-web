import React from 'react';
import { List, ListItem, Divider, Subheader, IconButton } from 'material-ui';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import ShowChart from 'material-ui/svg-icons/editor/show-chart';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import Build from 'material-ui/svg-icons/action/build';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import ContactPhone from 'material-ui/svg-icons/communication/contact-phone';
import Schedule from 'material-ui/svg-icons/action/schedule';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import PictureInPicture from 'material-ui/svg-icons/action/picture-in-picture';
import Create from 'material-ui/svg-icons/content/create';

export default class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginTxtField: '',
      passwordTxtField: '',
      emailTxtField: '',
      salesOpen: '',
      installationOpen: '',
      managementOpen: '',
      currentOpen: ''
    }

  }

  toggleCategory(category) {
    console.log(category);
    if(this.state.currentOpen == category) {
      this.setState({
        currentOpen: undefined,
      });
    } else {
      this.setState({
        currentOpen: category,
      })
    }
  }

  render() {
    var fontStyle = {'color': 'white'};
    return (
      <List
        style={{
          'backgroundColor': '#2F3C7D'
        }}
      >
        <ListItem
          onClick={this.props.clickHandler.bind(null, "dashboard")}
          primaryText="Dashboard"
          leftIcon={<Dashboard color="white"/>}
          style={fontStyle}
        />
        <ListItem
          open={this.state.currentOpen == "salesOpen" ? true : false}
          primaryText="Sales"
          leftIcon={<AttachMoney color="white"/>}
          initiallyOpen={false}
          rightIconButton={
            <IconButton onClick={this.toggleCategory.bind(this, "salesOpen")}>
              { this.state.currentOpen == "salesOpen" ?
                <ExpandLess color="white"/>
                :
                <ExpandMore color="white"/>
              }
            </IconButton>
          }
          style={fontStyle}
          nestedItems={[
            <ListItem
              onClick={this.props.clickHandler.bind(null, "newSale")}
              key={1}
              primaryText="Create New Sale"
              leftIcon={<Create color="white"/>}
              style={fontStyle}
            />,
            <ListItem
              key={2}
              onClick={this.props.clickHandler.bind(null, "allSales")}
              primaryText="View All Sales"
              leftIcon={<ShowChart color="white"/>}
              style={fontStyle}
            />,
            <ListItem
              onClick={this.props.clickHandler.bind(null, "presentationMaterial")}
              key={3}
              primaryText="Presentation Material"
              leftIcon={<PictureInPicture color="white" />}
              style={fontStyle}
            />
          ]}
        />
        <ListItem
          open={this.state.currentOpen == "installationOpen" ? true : false}
          primaryText="Installations"
          leftIcon={<Build color="white" />}
          initiallyOpen={false}
          rightIconButton={
            <IconButton onClick={this.toggleCategory.bind(this, "installationOpen")}>
              { this.state.currentOpen == "installationOpen" ?
                <ExpandLess color="white"/>
                :
                <ExpandMore color="white"/>
              }
            </IconButton>
          }
          style={fontStyle}
          nestedItems={[
            <ListItem
              key={1}
              onClick={this.props.clickHandler.bind(null, "scheduleInstallation")}
              primaryText="Schedule Installation"
              leftIcon={<Schedule color="white"/>}
              style={fontStyle}
            />,
            <ListItem
              key={2}
              onClick={this.props.clickHandler.bind(null, "allInstallations")}
              primaryText="View All Installations"
              leftIcon={<ActionAssignment color="white"/>}
              style={fontStyle}
            />
          ]}
        />
        <ListItem 
          open={this.state.currentOpen == "managementOpen" ? true : false}
          primaryText="Management"
          leftIcon={<AccountCircle color="white" />}
          initiallyOpen={false}
          rightIconButton={
            <IconButton onClick={this.toggleCategory.bind(this, "managementOpen")}>
              { this.state.currentOpen == "managementOpen" ?
                <ExpandLess color="white"/>
                :
                <ExpandMore color="white"/>
              }
            </IconButton>
          }
          style={fontStyle}
          nestedItems={[
            <ListItem
              key={1}
              onClick={this.props.clickHandler.bind(null, "newEmployee")}
              primaryText="Create New Employee"
              leftIcon={<GroupAdd color="white" />}
              style={fontStyle}
            />,
            <ListItem
              key={2}
              onClick={this.props.clickHandler.bind(null, "allEmployees")}
              primaryText="View All Employees"
              leftIcon={<SupervisorAccount color="white"/>}
              style={fontStyle}
            />,
            <ListItem
              key={3}
              onClick={this.props.clickHandler.bind(null, "allCustomers")}
              primaryText="View All Customers"
              leftIcon={<ContactPhone color="white" />}
              style={fontStyle}
            />
          ]}
        />
      </List>
    );
  }
}
