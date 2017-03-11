import React from 'react';
import { FlatButton, RaisedButton } from 'material-ui';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export default class SaleCamera extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      picturePath: undefined,
      saleFile: [],
      sale: undefined,
      isCordova: undefined,
      disableButton: true,
    };
  }

  componentWillMount() {
    this.setState({
      isCordova: !!window.cordova
    });
  }

  cameraClickHandler = () => {
    var _this = this;
    var userMessages = {
      noCamera: "The device doesn't have a working camera",
      cameraUnauthorized:{
          title: "Camera unavailable",
          message: "The app is not authorised to access the camera, which means it can't take photos. Would you like to switch to the Settings app to allow access?"
      },
      cameraRollUnauthorized:{
          title: "Photos unavailable",
          message: "The app is not authorised to access your Photos, which means it can't take photos. Would you like to switch to the Settings app to allow access?"
      },
      cameraAuthorisationError:{
          title: "Camera authorisation error",
          message: "The app could not request access to the camera due to the following error: "
      }
    };

    // Request camera authorisation
    this.checkCameraIsUsable({
        successFn: onCameraAuthorised,
        errorFn: onCameraAuthorisationError,
        requireCameraRoll: true
    });

    // Called on successful authorisation of camera/camera roll
    function onCameraAuthorised(){
      function onSuccess(imageURI) {
        _this.setState({picturePath: imageURI});
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }

      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.PNG,
        allowEdit: true,
        targetWidth: 600, targetHeight: 600,
        popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
      });
    }

    // Called on error during authorisation of camera/camera roll
    function onCameraAuthorisationError(error){
      console.error("An error occurred authorising use of the camera");
      navigator.notification.alert(userMessages.cameraAuthorisationError.message, null, userMessages.cameraAuthorisationError.title);
    }
  }

/**
 * Checks if camera is available for use; i.e. camera is present and authorized for use.
 * If not and authorization has not yet been requested, requests authorization.
 * If authorization is denied, informs user and offers to switch to settings page to allow.
 * Optionally also checks if camera roll access has been authorized.
 * * If not and authorization has not yet been requested, requests authorization.
 * If authorization is denied, informs user and offers to switch to settings page to allow.
 *
 * @param {Object} params - parameters:
 * <ul>
 *    <li>{Function} successFn - callback to invoke if camera is available for use.</li>
 *    <li>{Function} errorFn - callback to to invoke if camera is unavailable for use. The function will be passed a single {String} argument which contains the error message.</li>
 *    <li>{Boolean} requireCameraRoll (optional) - if true, checks for/requests camera roll authorization. Defaults to false.</li>
 * </ul>
 */

  checkCameraIsUsable(params){
    var userMessages = {
      noCamera: "The device doesn't have a working camera",
      cameraUnauthorized:{
          title: "Camera unavailable",
          message: "The app is not authorised to access the camera, which means it can't take photos. Would you like to switch to the Settings app to allow access?"
      },
      cameraRollUnauthorized:{
          title: "Photos unavailable",
          message: "The app is not authorised to access your Photos, which means it can't take photos. Would you like to switch to the Settings app to allow access?"
      },
      cameraAuthorisationError:{
          title: "Camera authorisation error",
          message: "The app could not request access to the camera due to the following error: "
      }
    };

    //requests Authorization for the Gallery
    function requestCameraRollAuthorization(){
        cordova.plugins.diagnostic.requestCameraRollAuthorization(function(granted){
            if(granted){
                params.successFn();
            }else{
                onCameraRollAuthorizationDenied();
            }
        }, params.errorFn);
    }

    //On Gallery Authorization denied
    function onCameraRollAuthorizationDenied(){
        navigator.notification.confirm(
            userMessages.cameraRollUnauthorized.message,
            function(i){
                if(i==1){
                    cordova.plugins.diagnostic.switchToSettings();
                }
            },
            userMessages.cameraRollUnauthorized.title,
            ["Yes","No"]
        );
    }

    //requests the authorization for the gallery
    function getCameraRollAuthorizationStatus(){
        cordova.plugins.diagnostic.getCameraRollAuthorizationStatus(function(status){
            switch(status){
                case "denied":
                    onCameraRollAuthorizationDenied();
                    break;
                case "not_determined":
                    requestCameraRollAuthorization();
                    break;
                default:
                    params.successFn();
            }
        }, params.errorFn);
    }

    //requests an authorization for the camera (and then for the gallery)
    //in case when the authorization status is 'not determined'
    function requestCameraAuthorization(){
        cordova.plugins.diagnostic.requestCameraAuthorization(function(granted){
            if(granted){
                if(params.requireCameraRoll){
                    getCameraRollAuthorizationStatus();
                }else{
                    params.successFn();
                }
            }else{
                onCameraAuthorizationDenied();
            }
        }, params.errorFn);
    }

    //Asks a user to go to settings to give permissions to the app
    function onCameraAuthorizationDenied(){
        navigator.notification.confirm(
            userMessages.cameraUnauthorized.message,
            function(i){
                if(i==1){
                    cordova.plugins.diagnostic.switchToSettings();
                }
            },
            userMessages.cameraUnauthorized.title,
            ["Yes","No"]
        );
    }

    //check for the camera's authorization status
    //if it's not determined - meaning app starts for the first time - call requestAuthorization
    //if it's denied - then call authorizationDenied() which would ask the user to go to settings to enable camera permission
    //if it's allowed - then we check for access to the gallery and call successFn which will be taking a picture
    function getCameraAuthorizationStatus(){
        cordova.plugins.diagnostic.getCameraAuthorizationStatus(function(status){
            switch(status){
                case "denied":
                    onCameraAuthorizationDenied();
                    break;
                case "not_determined":
                    requestCameraAuthorization();
                    break;
                default:
                    if(params.requireCameraRoll){
                        getCameraRollAuthorizationStatus();
                    }else{
                        params.successFn();
                    }

            }
        }, params.errorFn);
    }

    //If camera exists - check its authorization status
    //if camera doesn't exist - call onCameraAuthorisationError() passes as errorFn here
    function isCameraPresent(){
        cordova.plugins.diagnostic.isCameraPresent(function(present){
            if(present){
                getCameraAuthorizationStatus();
            }else{
                params.errorFn(userMessages.noCamera);
            }
        }, params.errorFn);
    }

    //Start point, check if Camera exists on a device
    isCameraPresent();
  }

  iOSUploadClickHandler = () => {
    this.props.actions.iOSUploadSingleFile(this.state.picturePath);
  }

  desktopUploadClickHandler = () => {
    this.props.actions.desktopUploadSingleFile(this.state.picturePath, this.state.saleFile, this.enableButtons);
  }

  enableButtons = (value) => {
    this.setState({
      disableButton: value,
    });
  }

  selectImagesHandler = () => {
    if (this.refs.file.files.length > 0){
      let _this = this;
      var file = this.refs.file.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        _this.setState({
          picturePath: this.result,
          saleFile: file,
          disableButton: false,
        });
      }
    }
  }

  desktopClearClickHandler = () => {
    this.setState({
      picturePath: undefined,
      saleFile: undefined,
      disableButton: true,
    })
  }

  getCordovaUI = () => {
    var rightButtonsStyle = {
      'height': '40px',
      'width': '160px',
      'marginRight': '5px',
      'marginLeft': '5px',
      'marginTop': '40px',
      'marginBottom': '40px',
    };
    return (
      <div className="cameraWrapper">
        <div className="buttonWrapper">
          <FlatButton
            labelStyle={{ color: "#2f3c7d" }}
            backgroundColor="white"
            hoverColor="$light-gray"
            style={rightButtonsStyle}
            onTouchTap={(e) => {e.preventDefault(); this.cameraClickHandler()}}
            label="New Image"
          />
        </div>
        <div className="pictureWrapper">
          <img className="imageBox" id="myImage" src={this.state.picturePath}/>
        </div>
        <div className="finishWrapper">
          <RaisedButton
            className="finishButton"
            label={'Upload'}
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.iOSUploadClickHandler()}}
          />
        </div>
       </div>
    );
  }

  getDesktopUI = () => {
    return (
      <div className="cameraWrapper">
        <div className="buttonWrapper">
          <RaisedButton
            label="Choose an Image"
            labelPosition="before"
            style={styles.button}
            containerElement="label"
          >
            <input ref="file" type="file" name="image" style={styles.exampleImageInput}
              onChange={(evt) => this.selectImagesHandler(evt)}/>
          </RaisedButton>
        </div>
        <div className="pictureWrapper">
          <img className="imageBox" id="myImage" src={this.state.picturePath}/>
        </div>
        <div className="finishWrapper">
          <RaisedButton
            className="finishButton"
            label={'Clear'}
            secondary={true}
            onTouchTap={(e) => {e.preventDefault(); this.desktopClearClickHandler()}}
            disabled={this.state.disableButton}
            />
          <RaisedButton
            className="finishButton"
            label={'Upload'}
            primary={true}
            onTouchTap={(e) => {e.preventDefault(); this.desktopUploadClickHandler()}}
            disabled={this.state.disableButton}
            />
        </div>
      </div>
    );
  }

  render() {
    if(this.state.isCordova) {
      return this.getCordovaUI();
    }
    else {
      return this.getDesktopUI();
    }
  }
}