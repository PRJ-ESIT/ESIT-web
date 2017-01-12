import React from 'react';
import { Step, Stepper, StepLabel, } from 'material-ui';
import CompleteInstallation from './CompleteInstallation.jsx';
import SelectInstallation from './SelectInstallation.jsx';
import DocuSignInstallation from './DocuSignInstallation.jsx';
import DocuSignInstallation2 from './DocuSignInstallation2.jsx';
import CameraComponent from './CameraComponent.jsx';

export default class InstallationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <SelectInstallation handleInstallationNext={this.props.handleInstallationNext} handleInstallationPrev={this.props.handleInstallationPrev} menuClickHandler={this.props.menuClickHandler} />;
      case 1:
        return <CameraComponent handleInstallationNext={this.props.handleInstallationNext} handleInstallationPrev={this.props.handleInstallationPrev} /> 
      case 2:
        return <CompleteInstallation handleInstallationNext={this.props.handleInstallationNext} handleInstallationPrev={this.props.handleInstallationPrev} status={'create'} id={this.props.selectedInstallationId} />;
      case 3:
        return <DocuSignInstallation installation={this.props.installationObj} getInstallationEmbeddedUrl={this.props.getInstallationEmbeddedUrl}/>;
      case 4:
        return <DocuSignInstallation2 envelopeId={this.props.envelopeId} installation={this.props.installationObj} getInstallationEmbeddedUrl2={this.props.getInstallationEmbeddedUrl2} />;
      case 5:
        return 'Installation Completed!'
      default:
        return 'You messed up :)';
    }
  }

  render() {
    const {installationStepIndex} = this.props;
    return (
      <div style={{width: '100%', height: '100%', maxWidth: 900, position: 'absolute', left: '0', right: '0', margin: 'auto'}}>
        <Stepper style={{height: '10%'}} activeStep={installationStepIndex}>
          <Step>
            <StepLabel>Choose a Installation</StepLabel>
          </Step>
          <Step>
            <StepLabel>Take Installation Photos</StepLabel>
          </Step>
          <Step>
            <StepLabel>Complete the Installation</StepLabel>
          </Step>
          <Step>
            <StepLabel>Customer Sign the Documents</StepLabel>
          </Step>
          <Step>
            <StepLabel>Installer Sign the Documents</StepLabel>
          </Step>
        </Stepper>
        <div style={{height: '90%'}}>
          {this.getStepContent(installationStepIndex)}
        </div>
      </div>
    );
  }
}
