import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";

import UpdaterScreenExp from "./UpdaterScreenExp";
import ScrollViewExp from "./ScrollViewExp";
import ReceiptExp from "./ReceiptExp";

const AppStackNavigatorExp = createStackNavigator({
  ScrollViewExp: {
    screen: ScrollViewExp,
    navigationOptions: {
      header: null
    }
  },
  UpdaterScreenExp: {
    screen: UpdaterScreenExp,
    navigationOptions: {
      header: null
    }
  },
  ReceiptExp: {
    screen: ReceiptExp,
    navigationOptions: {
      header: null
    }
  }
});

const ExpStack = createAppContainer(AppStackNavigatorExp);

export default ExpStack;
