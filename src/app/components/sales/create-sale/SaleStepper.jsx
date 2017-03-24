import React from 'react';
import { Step, Stepper, StepLabel, } from 'material-ui';
import SaleForm from './sale-form/SaleForm.jsx';
import DocuSignSale from './docusign-sale/DocuSignSale.jsx';
import SaleCameraContainer from './sale-camera/SaleCameraContainer.jsx';
import CompletedSale from './sale-completed/CompletedSale.jsx';

export default class SaleStepper extends React.Component {
  constructor(props) {
    super(props);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <SaleForm handleSnackbar={this.props.handleSnackbar} handleSalePrev={this.props.handleSalePrev} handleSaleNext={this.props.handleSaleNext} status={'create'} menuClickHandler={this.props.menuClickHandler} getEmbeddedUrl={this.props.getEmbeddedUrl} />;
      case 1:
        return <DocuSignSale sale={this.props.saleObj} handleSalePrev={this.props.handleSalePrev} handleSaleNext={this.props.handleSaleNext} getEmbeddedUrl={this.props.getEmbeddedUrl} />;
      case 2:
        return <SaleCameraContainer handleSnackbar={this.props.handleSnackbar} handleSalePrev={this.props.handleSalePrev} handleSaleNext={this.props.handleSaleNext} sale={this.props.saleObj} handleResetStepper={this.props.handleResetStepper}/>
      case 3:
        return <CompletedSale handleResetStepper={this.props.handleResetStepper} menuClickHandler={this.props.menuClickHandler}/>;
      default:
        return 'You messed up :)';
    }
  }

  componentWillUnmount() {
    //we don't want to clear the state when the whole screen is replaced with a DocuSign form
    if(this.props.saleStepIndex != 1) {
      this.props.handleResetStepper();
    }
  }

  render() {
    const {saleStepIndex} = this.props;
    return (
      <div style={{width: '100%', height: '100%', maxWidth: 900, position: 'absolute', left: '0', right: '0', margin: 'auto'}}>
        <Stepper style={{height: '10%'}} activeStep={saleStepIndex}>
          <Step>
            <StepLabel>Create a Sale</StepLabel>
          </Step>
          <Step>
            <StepLabel>Sign the Documents</StepLabel>
          </Step>
          <Step>
            <StepLabel>Take Cheque Photo</StepLabel>
          </Step>
          <Step>
            <StepLabel>Sale Completed!</StepLabel>
          </Step>
        </Stepper>
        <div style={{height: '90%'}}>
          {this.getStepContent(saleStepIndex)}
        </div>
      </div>
    );
  }
}
