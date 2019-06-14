import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Icon, Button } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";

import UpdaterScreenWell from "./UpdaterScreenWell";
import ScrollViewWell from "./ScrollViewWell";
import ReceiptWell from "./ReceiptWell.js";

const AppStackNavigatorW = createStackNavigator({
  ScrollViewWell: {
    screen: ScrollViewWell,
    navigationOptions: {
      header: null
    }
  },
  UpdaterScreenWell: {
    screen: UpdaterScreenWell,
    navigationOptions: {
      header: null
    }
  },
  ReceiptWell: {
    screen: ReceiptWell,
    navigationOptions: {
      header: null
    }
  }
});

const WellStack = createAppContainer(AppStackNavigatorW);

export default WellStack;
