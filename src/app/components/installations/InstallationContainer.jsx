import React from 'react';
import { Step, Stepper, StepLabel, RaisedButton, } from 'material-ui';
import CompleteInstallation from './CompleteInstallation.jsx';
import SelectInstallation from './SelectInstallation.jsx';

export default class InstallationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
    };
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <SelectInstallation />;
      case 1:
        return <CompleteInstallation />;
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div style={{width: '100%', maxWidth: 900, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Choose a Installation</StepLabel>
          </Step>
          <Step>
            <StepLabel>Complete the Installation</StepLabel>
          </Step>
          <Step>
            <StepLabel>Sign the Documents</StepLabel>
          </Step>
        </Stepper>
        <div>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to return to beginning. Snackbar should go here instead.
            </p>
          ) : (
            <div>
              <div>{this.getStepContent(stepIndex)}</div>
              <div>
                <RaisedButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
