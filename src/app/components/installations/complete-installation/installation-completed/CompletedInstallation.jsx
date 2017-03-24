import React from 'react';
import { RaisedButton } from 'material-ui';

const style = {
  margin: 12,
  width: '180px',
};

export default class CompletedInstallation extends React.Component {

  render() {
    return (
      <div className="completionImageWrapper">
        <span className="completionText">The Installation is Completed!</span>
        <div className="completionImage">
          <svg style={{width: '75%', height:'75%'}} version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
            <circle fill="#4CAF50" cx="24" cy="24" r="21"/>
            <polygon fill="#CCFF90" points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"/>
          </svg>
        </div>
        <div className="completionButtonsWrapper" >
          <div>
            <RaisedButton
              label="Dashboard"
              primary={true}
              style={style}
              onTouchTap={(e) => {e.preventDefault(); this.props.menuClickHandler("dashboard")}}
            />
          </div>
          <div>
            <RaisedButton
              label="New Installation"
              primary={true}
              style={style}
              onTouchTap={(e) => {e.preventDefault(); this.props.handleResetStepper()}}
            />
          </div>
        </div>
      </div>
    );
  }
}
