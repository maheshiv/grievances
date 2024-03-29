import React from 'react';
import {View} from 'react-native';
import {InputGroup, Input, Text} from 'native-base';
import _ from 'underscore';

let nativeTextbox = function(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var textboxStyle = stylesheet.textbox.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;
  let elementProps = {};

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    textboxStyle = stylesheet.textbox.error;
    helpBlockStyle = stylesheet.helpBlock.error;
    elementProps.error = true;
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable;
    // elementProps.disabled = true;
  }
  textboxStyle = _.extend({}, textboxStyle, {borderWidth: 0});
  var label = locals.label ? (<Text style={controlLabelStyle}>
      {locals.label}
    </Text>) : null;
  var help = locals.help ? (<Text style={helpBlockStyle}>
      {locals.help}
    </Text>) : null;
  var error = locals.hasError && locals.error ? (<Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
      {locals.error}
    </Text>) : null;

  return (<View style={formGroupStyle}>
    {label}
    <InputGroup borderType="underline" {...elementProps}>

      <Input accessibilityLabel={locals.label}
      ref="input"
      autoCapitalize={locals.autoCapitalize}
      autoCorrect={locals.autoCorrect}
      autoFocus={locals.autoFocus}
      blurOnSubmit={locals.blurOnSubmit}
      editable={locals.editable}
      keyboardType={locals.keyboardType}
      maxLength={locals.maxLength}
      multiline={locals.multiline}
      onBlur={locals.onBlur}
      onEndEditing={locals.onEndEditing}
      onFocus={locals.onFocus}
      onLayout={locals.onLayout}
      onSelectionChange={locals.onSelectionChange}
      onSubmitEditing={locals.onSubmitEditing}
      placeholderTextColor={locals.placeholderTextColor}
      secureTextEntry={locals.secureTextEntry}
      selectTextOnFocus={locals.selectTextOnFocus}
      selectionColor={locals.selectionColor}
      numberOfLines={locals.numberOfLines}
      underlineColorAndroid={locals.underlineColorAndroid}
      clearButtonMode={locals.clearButtonMode}
      clearTextOnFocus={locals.clearTextOnFocus}
      enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
      keyboardAppearance={locals.keyboardAppearance}
      onKeyPress={locals.onKeyPress}
      returnKeyType={locals.returnKeyType}
      selectionState={locals.selectionState}
      onChangeText={(value) => locals.onChange(value)}
      onChange={locals.onChangeNative}
      placeholder={locals.placeholder}
      style={textboxStyle}
      value={locals.value}/>

  </InputGroup>
  {help}
  {error}
  </View>);

};

export default {
  nativeTextbox
};
