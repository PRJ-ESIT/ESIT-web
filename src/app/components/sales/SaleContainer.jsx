import React from 'react';
import { Step, Stepper, StepLabel, } from 'material-ui';
import NewSale from './NewSale.jsx';
import DocuSignSale from './DocuSignSale.jsx';

export default class SaleContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
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
        return <NewSale handleNext={this.handleNext} handlePrev={this.handlePrev} status={'create'} menuClickHandler={this.props.menuClickHandler} />;
      case 1:
        return <DocuSignSale />;
      case 2:
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
            <StepLabel>Create a Sale</StepLabel>
          </Step>
          <Step>
            <StepLabel>Sign the Documents</StepLabel>
          </Step>
          <Step>
            <StepLabel>Take Cheque Photo</StepLabel>
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
