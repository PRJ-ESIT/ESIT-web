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
    }

  }

  render() {
    return (
      <List>
        <ListItem primaryText="Dashboard" leftIcon={<ContentSend />} />
        <ListItem 
          primaryText="Sales"
          leftIcon={<ContentDrafts />}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Create New Sale"
              leftIcon={<ActionGrade />}
            />,
            <ListItem
              key={2}
              primaryText="View All Sales"
              leftIcon={<ActionGrade />}
            />,
            <ListItem
              key={3}
              primaryText="Presentation Material"
              leftIcon={<ActionGrade />}
            />
          ]}
        />
        <ListItem
          primaryText="Installations"
          leftIcon={<ContentInbox />}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Schedule Installation"
              leftIcon={<ActionGrade />}
            />,
            <ListItem
              key={2}
              primaryText="View All Installations"
              leftIcon={<ContentSend />}
            />
          ]}
        />
        <ListItem 
          primaryText="Management"
          leftIcon={<ContentDrafts />}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Create New Employee"
              leftIcon={<ActionGrade />}
            />,
            <ListItem
              key={2}
              primaryText="View All Employees"
              leftIcon={<ActionGrade />}
            />,
            <ListItem
              key={3}
              primaryText="View All Customers"
              leftIcon={<ActionGrade />}
            />
          ]}
        />
      </List>
    );
  }
}
