import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Icon, Button } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";

import ScrollViewDelete from "./ScrollViewDelete";
import ResetScreen from "./ResetScreen";
import Choice from "./Choice";

const AppStackNavigator = createStackNavigator({
  Choice: {
    screen: Choice,
    navigationOptions: {
      header: null
    }
  },
  ScrollViewDelete: {
    screen: ScrollViewDelete,
    navigationOptions: {
      header: null
    }
  },
  ResetScreen: {
    screen: ResetScreen,
    navigationOptions: {
      header: null
    }
  }
});

const DeleteNavigator = createAppContainer(AppStackNavigator);

export default DeleteNavigator;
