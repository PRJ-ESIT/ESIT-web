import React from 'react';
import { List, ListItem, Divider, Subheader, IconButton } from 'material-ui';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import Business from 'material-ui/svg-icons/communication/business';
import Build from 'material-ui/svg-icons/action/build';
import EventAvailable from 'material-ui/svg-icons/notification/event-available'
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import Group from 'material-ui/svg-icons/social/group';
import TagFaces from 'material-ui/svg-icons/image/tag-faces';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Folder from 'material-ui/svg-icons/file/folder';
import Create from 'material-ui/svg-icons/content/create';
import Event from 'material-ui/svg-icons/action/event';

export default class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginTxtField: '',
      passwordTxtField: '',
      emailTxtField: '',
      currentOpen: ''
    }

  }

  toggleCategory(category) {

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
      <List className='headings'>
        <ListItem
          onClick={this.props.clickHandler.bind(null, "dashboard")}
          primaryText="Dashboard"
          leftIcon={<Dashboard color="white"/>}
          style={fontStyle}
        />
        <ListItem
          open={this.state.currentOpen == "salesOpen" ? true : false}
          primaryText="Sales"
          primaryTogglesNestedList={true}
          onNestedListToggle={this.toggleCategory.bind(this, "salesOpen")}
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
              leftIcon={<TrendingUp color="white"/>}
              style={fontStyle}
            />,
            <ListItem
              onClick={this.props.clickHandler.bind(null, "documents")}
              key={3}
              primaryText="Documents"
              leftIcon={<Folder color="white" />}
              style={fontStyle}
            />
          ]}
        />
        <ListItem
          open={this.state.currentOpen == "installationOpen" ? true : false}
          primaryText="Installations"
          primaryTogglesNestedList={true}
          onNestedListToggle={this.toggleCategory.bind(this, "installationOpen")}
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
              onClick={this.props.clickHandler.bind(null, "completeInstallation")}
              primaryText="Complete Installation"
              leftIcon={<EventAvailable color="white"/>}
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
          primaryTogglesNestedList={true}
          onNestedListToggle={this.toggleCategory.bind(this, "managementOpen")}
          leftIcon={<Business color="white" />}
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
              onClick={this.props.clickHandler.bind(null, "scheduleInstallation")}
              primaryText="Schedule Installation"
              leftIcon={<Event color="white" />}
              style={fontStyle}
            />,
            <ListItem
              key={2}
              onClick={this.props.clickHandler.bind(null, "newEmployee")}
              primaryText="Create New Employee"
              leftIcon={<GroupAdd color="white" />}
              style={fontStyle}
            />,
            <ListItem
              key={3}
              onClick={this.props.clickHandler.bind(null, "allEmployees")}
              primaryText="View All Employees"
              leftIcon={<Group color="white"/>}
              style={fontStyle}
            />,
            <ListItem
              key={4}
              onClick={this.props.clickHandler.bind(null, "allCustomers")}
              primaryText="View All Customers"
              leftIcon={<TagFaces color="white" />}
              style={fontStyle}
            />
          ]}
        />
      </List>
    );
  }
}
