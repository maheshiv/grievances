'use strict';
/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary components from ReactNative
 */
import React, {Component} from 'react';
import {Text, Icon} from 'native-base';
import {
  AppRegistry,
  Navigator,
  View } from 'react-native';

/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
const RNRF = require('react-native-router-flux');
const {
  Scene,
  TabBar } = RNRF;

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
  Provider,
  connect } from 'react-redux';

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from './lib/configureStore';


/**
 * ### containers
 *
 * All the top level containers
 *
 */
import App from './containers/App';
import Login from './containers/Login';
/*import Logout from './containers/Logout';*/
import Register from './containers/Register';
import ForgotPassword from './containers/ForgotPassword';
import Profile from './containers/Profile';
import Main from './containers/Main';
//import CreateGrievance from './containers/CreateGrievance';
import UpdateGrievance from './containers/UpdateGrievance';

/**
 * ### icons
 *
 * Add icon support for use in Tabbar
 *
 */
/*import Icon from 'react-native-vector-icons/FontAwesome';*/

/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import {setPlatform, setVersion} from './reducers/device/deviceActions';
import {setStore} from './reducers/global/globalActions';

/**
 * ## States
 * Snowflake explicitly defines initial state
 *
 */
import authInitialState from './reducers/auth/authInitialState';
import deviceInitialState from './reducers/device/deviceInitialState';
import globalInitialState from './reducers/global/globalInitialState';
import profileInitialState from './reducers/profile/profileInitialState';
import grievanceInitialState from './reducers/grievance/grievanceInitialState';

/**
 *  The version of the app but not  displayed yet
 */
var VERSION='0.1.1';

/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snowflake
 * @returns {Object} object with 4 keys
 */
function getInitialState() {
  const _initState = {
    auth: new authInitialState,
    device: (new deviceInitialState).set('isMobile',true),
    global: (new globalInitialState),
    profile: new profileInitialState,
    grievance: new grievanceInitialState
  };
  return _initState;
}
/**
* ## TabIcon
*
* Displays the icon for the tab w/ color dependent upon selection
*/

class TabIcon extends Component {
  render(){
    var color = this.props.selected ? '#337ab7' : '#fff';
    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center'}}>
        <Icon style={{color: color}} name={this.props.iconName} size={30} />
      </View>
      );
  }
}

/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */

export default function native(platform) {

  let Snowflake = React.createClass({
    render() {

      const store = configureStore(getInitialState());
      //Connect w/ the Router
      const Router = connect()(RNRF.Router);

      // configureStore will combine reducers from snowflake and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform));
      store.dispatch(setVersion(VERSION));
      store.dispatch(setStore(store));

      // setup the router table with App selected as the initial component
      return (
        <Provider store={store}>
      	  <Router hideNavBar={true}>
      	    <Scene key="root">
      	      <Scene key="App"
                           component={App}
                           title="App"
                           initial={true}/>

      	      <Scene key="InitialLoginForm"
                           component={Register}
                           title="Register" />

              <Scene key="Login"
                           component={Login}
                           title="Login"/>

      	      <Scene key="Register"
                           component={Register}
                           title="Register"/>

      	      <Scene key="ForgotPassword"
                           component={ForgotPassword}
                           title="ForgotPassword"
                           type="replace" />

      	      {/*<Scene key="CreateGrievance"
                           component={CreateGrievance}
                           title="Create Grievance"/>*/}
               <Scene key="UpdateGrievance"
                            component={UpdateGrievance}
                            title="Update Grievance"/>
      	      {/*<Scene key="Tabbar" tabs={true} default="Main">*/}
      	        {/*<Scene key="Logout"
                             title="Logout"
                             icon={TabIcon}
                             iconName={"sign-out"}
                             hideNavBar={true}
                             component={Logout}/>*/}

      	        <Scene key="Main"
                             title="Grievances"
                             /*iconName={"ios-home"}
                             icon={TabIcon}
                             hideNavBar={true}
                             initial={true}*/
                             component={Main}
                             />

                      <Scene key="Profile"
                             title="Settings"
                             /*icon={TabIcon}
                             iconName={"ios-person"}
                             hideNavBar={true}*/
                             component={Profile}/>
      	      {/*</Scene>*/}
      	    </Scene>
      	  </Router>
        </Provider>
      );
    }
  });
  /**
   * registerComponent to the AppRegistery and off we go....
   */

  AppRegistry.registerComponent('grievances', () => Snowflake);
}
