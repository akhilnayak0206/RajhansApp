import React, { Component } from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LogInScreen from "./Screens/LogInScreen";
import DrawerScreenNavigator from "./Screens/DrawerScreens/DrawerScreenNavigator";
import LoadingScreen from "./Screens/LoadingScreen";
import SignOut from "./Screens/SignOut";
import { StyleSheet, Text, View } from "react-native";

export default class SwitchNavigator extends Component {
  render() {
    return <MainScreen />;
  }
}

//create a Switch Navigator

const FirstScreen = createSwitchNavigator(
  {
    LoadingScreen: LoadingScreen,
    LogInScreen: LogInScreen,
    DrawerScreen: DrawerScreenNavigator,
    SignOut: SignOut
  },
  {
    initialRouteName: "LoadingScreen" //this to make sure that this  is the  first component that the app opens
  }
);
const MainScreen = createAppContainer(FirstScreen);
