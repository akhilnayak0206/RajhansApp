import React, {Component} from 'react';
import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import firebase from 'react-native-firebase';
import  SwitchNavigator from './SwitchNavigator';

export default class App extends Component {

  render() {
    return (
        <SwitchNavigator />
    );
  }
}
