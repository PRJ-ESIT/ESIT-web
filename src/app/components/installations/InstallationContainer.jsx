import React from 'react';
import { Step, Stepper, StepLabel, } from 'material-ui';
import CompleteInstallation from './CompleteInstallation.jsx';
import SelectInstallation from './SelectInstallation.jsx';
import DocuSignInstallation from './DocuSignInstallation.jsx';

export default class InstallationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
      selectedInstallationId: undefined,
    };
  }

  handleNext = (obj) => {
    const {stepIndex} = this.state;
    if(obj == undefined) {
      var obj = {};
    }

    obj['stepIndex']=stepIndex + 1;
    obj['finished']=stepIndex >= 2;

    this.setState(obj);
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
        return <SelectInstallation handleNext={this.handleNext} handlePrev={this.handlePrev} />;
      case 1:
        return <CompleteInstallation handleNext={this.handleNext} handlePrev={this.handlePrev} status={'create'} id={this.state.selectedInstallationId} />;
      case 2:
        return <DocuSignInstallation />;
      case 3:
        return 'pictures'
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
          <Step>
            <StepLabel>Take Installation Photos</StepLabel>
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
              {this.getStepContent(stepIndex)}
            </div>
          )}
        </div>
      </div>
    );
  }
}
