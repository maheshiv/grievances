/**
 * # CreateGrievance.js
 *
 * This component provides an interface for a logged in user to
 * create grievance.
 * It too is a container so there is boilerplate from Redux similar to
 * ```App``` and ```Login```
 */
'use strict';
/**
* ## Imports
*
* Redux
*/
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Container, Content, Header, Button, Icon, Title, Text} from 'native-base';
/**
 * The actions we need
 */
import * as grievanceActions from '../reducers/grievance/grievanceActions';
import * as globalActions from '../reducers/global/globalActions';

/**
 * Immutable Mapn
 */
import {Map} from 'immutable';

/**
 * The ErrorAlert will display any and all errors
 */
import ErrorAlert from '../components/ErrorAlert';
/**
 * The FormButton will respond to the press
 */
import FormButton from '../components/FormButton';
/**
 * The Header will display a Image and support Hot Loading
 */
/*import Header from '../components/Header';*/

/**
 * The necessary React components
 */
import React, {Component} from 'react';
import
{
  StyleSheet,
  View,
  Platform
}
from 'react-native';

import NavigationBar from 'react-native-navbar';
/**
* The form processing component
*/
import t from 'tcomb-form-native';
import templates from '../components/NativeTemplates';

import ImagePicker from 'react-native-image-picker';
let Form = t.form.Form;

/**
 * ## Styles
 */

/**
* ## Redux boilerplate
*/
const actions = [
  grievanceActions,
  globalActions
];

const styles = StyleSheet.create({
  content: {
    marginTop: 10
  },
  header: {
    backgroundColor: '#337ab7',
    borderColor: '#2e6da4'
  },
  headerFont: {
    color: '#fff'
  }
});

let designAnonymous = {
  borderColor: '#2e6da4',
  borderWidth: 1
};

function mapStateToProps(state) {
  return {
      ...state
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}


class CreateGrievance extends Component {
  /**
   * ## CreateGrievance class
   * Set the initial state and prepare the errorAlert
   */
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    this.state = {
      formValues: {
        /*address: '',*/
        description: '',
        tag: '',
        src: ''
      },
      anonymousStyle: designAnonymous,
      reportedUser: this.props.global.currentUser.objectId
    };
  }
  /**
   * ### onChange
   *
   * When any fields change in the form, fire this action so they can
   * be validated.
   *
   */
  onChange(value) {
    this.props.actions.onGrievanceFormFieldChange(value);
    this.setState({formValues: value});
  }
  /**
   * ### componentWillReceiveProps
   *
   * Since the Forms are looking at the state for the values of the
   * fields, when we we need to set them
   */
  componentWillReceiveProps(props) {

    this.setState({
      formValues: {
        /*address: props.grievance.grievanceCreate.form.fields.address,*/
        description: props.grievance.grievanceCreate.form.fields.description,
        tag: props.grievance.grievanceCreate.form.fields.tag
      }
    });

  }

  /**
   * ### render
   * display the form wrapped with the header and button
   */
  render() {
    this.errorAlert.checkError(this.props.grievance.grievanceCreate.form.error);

    let self = this;

    let leftButtonConfig = {
      title: 'Back',
      handler: Actions.pop
    };
    let nativeTextbox = templates.nativeTextbox;
    let GrievanceForm = t.struct({
      /*address: t.String,*/
      description: t.maybe(t.String),
      tag: t.String,
    });
    /**
     * Set up the field definitions.  If we're fetching, the fields
     * are disabled.
     */
    let options = {
      auto: 'placeholders',
      fields: {
        description: {
          template: nativeTextbox
        },
        tag: {
          template: nativeTextbox
        }
      }
    };
    let uploadOptions = {
      title: 'Select Avatar',
      // storageOptions: {
      //   skipBackup: true,
      //   path: 'images'
      // },
      // takePhotoButtonTitle: 'Snap & Post'
    };
    //console.log('/**ImagePicker bbb: ',ImagePicker.showImagePicker);

    ImagePicker.showImagePicker(uploadOptions, (response) => {
      console.log('response: ',response);
    });

    let btnAnonymous = () => {
      if (this.state.anonymousStyle.backgroundColor) {
        this.setState({
          anonymousStyle: designAnonymous,
          reportedUser: this.props.global.currentUser.objectId
        });
      }
      else {
        this.setState({
          anonymousStyle: Object.assign({}, this.state.anonymousStyle, {backgroundColor: '#337ab7'}),
          reportedUser: undefined
        });
      }
    };
    //Here get address based on location co-ordinates
    let getAddress = (location) => {
      return;
    }
    /**
     * When the button is pressed, send the users info including the
     * ```currrentUser``` object as it contains the sessionToken and
     * user objectId which Parse.com requires
     */
    let grievanceButtonText = 'Submit Grievance';
    let onButtonPress = () => {
      this.props.actions.createGrievance(
        getAddress(this.props.location),
        /*this.props.grievance.grievanceCreate.form.fields.address,*/
        this.props.grievance.grievanceCreate.form.fields.description,
        this.props.location,
        this.state.reportedUser,
        this.props.grievance.grievanceCreate.form.fields.tag,
        this.props.global.currentUser
      );
    };
    /**
     * Wrap the form with the header and button.  The header props are
     * mostly for support of Hot reloading. See the docs for Header
     * for more info.
     */
    return (
      <Container>
        {/*<Header isFetching={this.props.grievance.grievanceCreate.form.isFetching}
                showState={this.props.global.showState}
                currentState={this.props.global.currentState}
                onGetState={this.props.actions.getState}
                onSetState={this.props.actions.setState}
        />*/}
        <Header style = {styles.header}>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name="ios-arrow-back" style={styles.headerFont}/>
          </Button>
          <Title><Text style={styles.headerFont}>Report Grievance</Text></Title>
          {/*{<NavigationBar
                  leftButton={ leftButtonConfig }
      	           />}*/}
        </Header>
        <Content style={styles.content}>
          <Button ref='anonymous' transparent style={this.state.anonymousStyle} onPress={btnAnonymous}>
            <Text style={styles.headerFont}>Anonymous</Text>
          </Button>
          <Form
              ref="form"
              type={GrievanceForm}
              options={options}
              value={this.state.formValues}
              onChange={this.onChange.bind(self)}
          />

          <FormButton
              /*isDisabled={!this.props.grievance.grievanceCreate.form.isValid}*/
              onPress={onButtonPress.bind(self)}
              buttonText={grievanceButtonText}/>
        </Content>




      </Container>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateGrievance);
