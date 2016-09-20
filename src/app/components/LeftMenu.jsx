import React from 'react';
import { List, ListItem, Divider, Subheader } from 'material-ui';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';

export default class StockList extends React.Component {
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
          primaryText="Dashboard"
          leftIcon={<ContentSend />}
          style={fontStyle}
        />
        <ListItem
          open={this.state.currentOpen == "salesOpen" ? true : false}
          onNestedListToggle={this.toggleCategory.bind(this, "salesOpen")}
          primaryText="Sales"
          leftIcon={<ContentDrafts />}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          style={fontStyle}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Create New Sale"
              leftIcon={<ActionGrade />}
              style={fontStyle}
            />,
            <ListItem
              key={2}
              primaryText="View All Sales"
              leftIcon={<ActionGrade />}
              style={fontStyle}
            />,
            <ListItem
              key={3}
              primaryText="Presentation Material"
              leftIcon={<ActionGrade />}
              style={fontStyle}
            />
          ]}
        />
        <ListItem
          open={this.state.currentOpen == "installationOpen" ? true : false}
          onNestedListToggle={this.toggleCategory.bind(this, "installationOpen")}
          primaryText="Installations"
          leftIcon={<ContentInbox />}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          style={fontStyle}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Schedule Installation"
              leftIcon={<ActionGrade />}
              style={fontStyle}
            />,
            <ListItem
              key={2}
              primaryText="View All Installations"
              leftIcon={<ContentSend />}
              style={fontStyle}
            />
          ]}
        />
        <ListItem 
          open={this.state.currentOpen == "managementOpen" ? true : false}
          onNestedListToggle={this.toggleCategory.bind(this, "managementOpen")}
          primaryText="Management"
          leftIcon={<ContentDrafts />}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          style={fontStyle}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Create New Employee"
              leftIcon={<ActionGrade />}
              style={fontStyle}
            />,
            <ListItem
              key={2}
              primaryText="View All Employees"
              leftIcon={<ActionGrade />}
              style={fontStyle}
            />,
            <ListItem
              key={3}
              primaryText="View All Customers"
              leftIcon={<ActionGrade />}
              style={fontStyle}
            />
          ]}
        />
      </List>
    );
  }
}
