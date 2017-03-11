import React from 'react';
import { Step, Stepper, StepLabel, } from 'material-ui';
import InstallationForm from './installation-form/InstallationForm.jsx';
import SelectInstallationContainer from './select-installation/SelectInstallationContainer.jsx';
import DocuSignCompletionClient from './docusign-completion-client/DocuSignCompletionClient.jsx';
import DocuSignCompletionInstaller from './docusign-completion-installer/DocuSignCompletionInstaller.jsx';
import InstallationCameraContainer from './installation-camera/InstallationCameraContainer.jsx';

export default class InstallationStepper extends React.Component {
  constructor(props) {
    super(props);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <SelectInstallationContainer userId={this.props.userId} handleInstallationNext={this.props.handleInstallationNext} handleInstallationPrev={this.props.handleInstallationPrev} menuClickHandler={this.props.menuClickHandler} />;
      case 1:
        return <InstallationCameraContainer handleInstallationNext={this.props.handleInstallationNext} handleInstallationPrev={this.props.handleInstallationPrev} id={this.props.selectedInstallationId} folderId={this.props.folderId} />
      case 2:
        return <InstallationForm handleInstallationNext={this.props.handleInstallationNext} handleInstallationPrev={this.props.handleInstallationPrev} status={'create'} id={this.props.selectedInstallationId} />;
      case 3:
        return <DocuSignCompletionClient installation={this.props.installationObj} getInstallationEmbeddedUrl={this.props.getInstallationEmbeddedUrl}/>;
      case 4:
        return <DocuSignCompletionInstaller envelopeId={this.props.envelopeId} installation={this.props.installationObj} getInstallationEmbeddedUrl2={this.props.getInstallationEmbeddedUrl2} />;
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
            <StepLabel>Choose Installation</StepLabel>
          </Step>
          <Step>
            <StepLabel>Take Photos</StepLabel>
          </Step>
          <Step>
            <StepLabel>Complete Installation</StepLabel>
          </Step>
          <Step>
            <StepLabel>Customer Sign</StepLabel>
          </Step>
          <Step>
            <StepLabel>Installer Sign</StepLabel>
          </Step>
        </Stepper>
        <div style={{height: '90%'}}>
          {this.getStepContent(installationStepIndex)}
        </div>
      </div>
    );
  }
}
