import React from 'react';
import { Step, Stepper, StepLabel, } from 'material-ui';
import NewSale from './NewSale.jsx';
import DocuSignSale from './DocuSignSale.jsx';
import CameraComponent from './CameraComponent.jsx';

export default class SaleContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <NewSale handleSalePrev={this.props.handleSalePrev} handleSaleNext={this.props.handleSaleNext} status={'create'} menuClickHandler={this.props.menuClickHandler} getEmbeddedUrl={this.props.getEmbeddedUrl} />;
      case 1:
        return <DocuSignSale sale={this.props.saleObj} handleSalePrev={this.props.handleSalePrev} handleSaleNext={this.props.handleSaleNext} getEmbeddedUrl={this.props.getEmbeddedUrl} />;
      case 2:
        return <CameraComponent />
      default:
        return 'You messed up :)';
    }
  }

  render() {
    const {saleStepIndex} = this.props;
    return (
      <div style={{width: '100%', maxWidth: 900, margin: 'auto'}}>
        <Stepper activeStep={saleStepIndex}>
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
          {this.getStepContent(saleStepIndex)}
        </div>
      </div>
    );
  }


}
