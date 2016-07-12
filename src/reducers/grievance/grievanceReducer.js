/**
 * # grievanceReducer.js
 *
 * The reducer user grievance actions
 */
'use strict';

const {fromJS} = require('immutable');
/**
 * ## Imports
 *
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
/*const fieldValidation = require('../../lib/fieldValidation').default;
const formValidation = require('./grievanceFormValidation').default;*/

/**
 * ## Actions
 *
 */
const {
  GET_GRIEVANCE_REQUEST,
  GET_GRIEVANCE_SUCCESS,
  GET_GRIEVANCE_FAILURE,

  GRIEVANCE_UPDATE_REQUEST,
  GRIEVANCE_UPDATE_SUCCESS,
  GRIEVANCE_UPDATE_FAILURE,

  GRIEVANCE_CREATE_REQUEST,
  GRIEVANCE_CREATE_SUCCESS,
  GRIEVANCE_CREATE_FAILURE,

  GRIEVANCE_DELETE_REQUEST,
  GRIEVANCE_DELETE_SUCCESS,
  GRIEVANCE_DELETE_FAILURE,

  CREATE_SET_STATE,
  UPDATE_SET_STATE,
  LIST_SET_STATE,

  ON_GRIEVANCE_FORM_FIELD_CHANGE,
  ON_GRIEVANCE_UPDATE_FORM_FIELD_CHANGE,
  SET_GRIEVANCE_UPDATE
} = require('../../lib/constants').default;

import InitialState from './grievanceInitialState';
/**
 * ## Initial State
 *
 */
const initialState = new InitialState;
/**
 * ## profileReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function grievanceReducer(state = initialState, action) {
  let nextGrievanceState = null;

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
  case GRIEVANCE_CREATE_REQUEST:
    return state.setIn([ 'grievanceCreate', 'form', 'isFetching'], true)
      .setIn([ 'grievanceCreate', 'form', 'error'], null);

  case GET_GRIEVANCE_REQUEST:
    return state.setIn([ 'grievanceList', 'form', 'isFetching'], true)
      .setIn([ 'grievanceList', 'form','error'], null);

  case GRIEVANCE_UPDATE_REQUEST:
  case GRIEVANCE_DELETE_REQUEST:
    return state.setIn([ 'grievanceUpdate', 'form', 'isFetching'], true)
      .setIn([ 'grievanceUpdate', 'form','error'], null);

    /**
     * ### Request end successfully
     * set the form to fetching as done
     */
  case GRIEVANCE_DELETE_SUCCESS:
    return state.setIn([ 'grievanceUpdate', 'form', 'isFetching'], false);

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalProfile
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
  case SET_GRIEVANCE_UPDATE:
    nextGrievanceState = state.setIn([ 'grievanceUpdate', 'form', 'isFetching'], false)
      .setIn([ 'grievanceUpdate', 'form','fields','description'], action.payload.description)
      .setIn([ 'grievanceUpdate', 'form','originalGrievance','address'],action.payload.address)
      .setIn([ 'grievanceUpdate', 'form','originalGrievance','location'],action.payload.location)
      .setIn([ 'grievanceUpdate', 'form','originalGrievance','reportedUser'],action.payload.reportedUser)
      .setIn([ 'grievanceUpdate', 'form','originalGrievance','description'],action.payload.description)
      .setIn([ 'grievanceUpdate', 'form','originalGrievance','dateOfReporting'], action.payload.dateOfReporting)
      .setIn([ 'grievanceUpdate', 'form','originalGrievance','dateOfResolving'],action.payload.dateOfResolving)
      .setIn([ 'grievanceUpdate', 'form','originalGrievance','status'],action.payload.status)
      .setIn([ 'grievanceUpdate', 'form','originalGrievance','tag'],action.payload.tag)
      .setIn([ 'grievanceUpdate', 'form','error'],null);

    return nextGrievanceState;

  case GET_GRIEVANCE_SUCCESS:
    nextGrievanceState = state.setIn([ 'grievanceList', 'isFetching'], false)
      .setIn([ 'grievanceList','grievances'], fromJS(action.payload))
      .setIn([ 'grievanceList','error'],null);

    return nextGrievanceState;

  case GET_GRIEVANCE_FAILURE:
    return state.setIn([ 'grievanceList', 'isFetching'], false)
      .setIn([ 'grievanceList', 'error'], action.payload);
    /**
     *
     *
     */
  case GRIEVANCE_CREATE_SUCCESS:
    state.setIn([ 'grievanceCreate','form', 'isFetching'], false)
      .setIn([ 'grievanceCreate', 'form', 'error'], null)
      .setIn([ 'grievanceCreate', 'form', 'fields', 'address'], '')
      .setIn([ 'grievanceCreate', 'form', 'fields', 'description'], '')
      .setIn([ 'grievanceCreate', 'form', 'fields', 'location'], [])
      .setIn([ 'grievanceCreate', 'form', 'fields', 'tag'], '')
      .getIn(['grievanceList', 'grievances']).push(fromJS(action.payload));
    return state;
      //Push value to grievance list
    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
  case GRIEVANCE_DELETE_FAILURE:
  case GRIEVANCE_UPDATE_FAILURE:
    return state.setIn([ 'grievanceUpdate', 'form', 'isFetching'], false)
      .setIn([ 'grievanceUpdate', 'form','error'], action.payload);

  case GRIEVANCE_CREATE_FAILURE:
    return state.setIn([ 'grievanceCreate', 'form', 'isFetching'], false)
      .setIn([ 'grievanceCreate', 'form','error'], action.payload);

    /**
     * ### set the state
     *
     * This is in support of Hot Loading - take the payload
     * and set the values into the state
     *
     */
  // case CREATE_SET_STATE:
  //   debugger;
  //   var grievance  = JSON.parse(action.payload).grievanceCreate.form;
  //   var next = state.setIn([ 'grievanceCreate', 'form','disabled'],grievance.disabled)
  //         .setIn([ 'grievanceCreate','form','error'],grievance.error)
  //         .setIn([ 'grievanceCreate','form','isValid'],grievance.isValid)
  //         .setIn([ 'grievanceCreate','form','isFetching'],grievance.isFetching)
  //         .setIn([ 'grievanceCreate', 'form','fields',
  //                 'address'],grievance.fields.address)
  //         .setIn([ 'grievanceCreate', 'form','fields',
  //                 'location'],grievance.fields.location)
  //         .setIn([ 'grievanceCreate', 'form','fields',
  //                 'reportedUser'],grievance.fields.reportedUser)
  //         .setIn([ 'grievanceCreate', 'form','fields',
  //                 'description'],grievance.fields.description)
  //         .setIn([ 'grievanceCreate', 'form','fields',
  //                 'dateOfReporting'],grievance.fields.dateOfReporting)
  //         .setIn([ 'grievanceCreate', 'form','fields',
  //                 'dateOfResolving'],grievance.fields.dateOfResolving)
  //         .setIn([ 'grievanceCreate', 'form','fields',
  //                 'resolvedUser'],grievance.fields.resolvedUser)
  //         .setIn([ 'grievanceCreate', 'form','fields',
  //                 'status'],grievance.fields.status)
  //         .setIn([ 'grievanceCreate', 'form','fields',
  //                 'tag'],grievance.fields.tag)
  //         .setIn([ 'grievanceCreate', 'form','fields',
  //                 'tagHasError'],grievance.fields.tagHasError);
  //     return next;
  //
  //   case UPDATE_SET_STATE:
  //     debugger;
  //     var grievance  = JSON.parse(action.payload).grievanceUpdate.form;
  //     var next = state.setIn([ 'grievanceUpdate', 'form','disabled'],grievance.disabled)
  //           .setIn([ 'grievanceUpdate','form','error'],grievance.error)
  //           .setIn([ 'grievanceUpdate','form','isValid'],grievance.isValid)
  //           .setIn([ 'grievanceUpdate','form','isFetching'],grievance.isFetching)
  //           .setIn([ 'grievanceUpdate', 'form','originalGrievance',
  //                   'address'],grievance.originalGrievance.address)
  //           .setIn([ 'grievanceUpdate', 'form','originalGrievance',
  //                   'location'],grievance.originalGrievance.location)
  //           .setIn([ 'grievanceUpdate', 'form','originalGrievance',
  //                   'reportedUser'],grievance.originalGrievance.reportedUser)
  //           .setIn([ 'grievanceUpdate', 'form','originalGrievance',
  //                   'description'],grievance.originalGrievance.description)
  //           .setIn([ 'grievanceUpdate', 'form','originalGrievance',
  //                   'dateOfReporting'],grievance.originalGrievance.dateOfReporting)
  //           .setIn([ 'grievanceUpdate', 'form','originalGrievance',
  //                   'dateOfResolving'],grievance.originalGrievance.dateOfResolving)
  //           .setIn([ 'grievanceUpdate', 'form','originalGrievance',
  //                   'resolvedUser'],grievance.originalGrievance.resolvedUser)
  //           .setIn([ 'grievanceUpdate', 'form','originalGrievance',
  //                   'status'],grievance.originalGrievance.status)
  //           .setIn([ 'grievanceUpdate', 'form','originalGrievance',
  //                   'tag'],grievance.originalGrievance.tag)
  //           .setIn([ 'grievanceUpdate', 'form','originalGrievance',
  //                   '_id'],grievance.originalGrievance._id)
  //           .setIn([ 'grievanceUpdate', 'form','fields',
  //                   'description'],grievance.fields.description);
  //     return next;
  //
  //   case LIST_SET_STATE:
  //     debugger;
  //     var grievance  = JSON.parse(action.payload).grievanceList;
  //     var next = state.setIn([ 'grievanceList','disabled'],grievance.disabled)
  //           .setIn([ 'grievanceList','error'],grievance.error)
  //           .setIn([ 'grievanceList','isValid'],grievance.isValid)
  //           .setIn([ 'grievanceList','isFetching'],grievance.isFetching)
  //           .setIn([ 'grievanceList','grievances'],grievance.grievances);
  //     return next;

    case ON_GRIEVANCE_FORM_FIELD_CHANGE:
      return state.setIn([ 'grievanceCreate', 'form','fields','description'], action.payload.field.description)
        .setIn([ 'grievanceCreate', 'form','fields','address'],action.payload.field.address)
        .setIn([ 'grievanceCreate', 'form','fields','tag'],action.payload.field.tag)
        .setIn([ 'grievanceCreate', 'form','fields','location'],action.payload.field.location)
        .setIn([ 'grievanceCreate', 'form','error'],null);

    case ON_GRIEVANCE_UPDATE_FORM_FIELD_CHANGE:
      return state.setIn([ 'grievanceUpdate', 'form','fields','description'], action.payload.field.description)
        .setIn([ 'grievanceCreate', 'form','error'],null);
  }//switch
  /**
   * # Default
   */
  return state;
}
