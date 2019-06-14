import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Icon, Button } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";

import ReceiptWell from "../ReceiptWell";
import RowRWell from "./RowRWell";

const AppStackNavigatorq = createStackNavigator({
  RowRWell: {
    screen: RowRWell,
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

const ReceiptStackWell = createAppContainer(AppStackNavigatorq);

export default ReceiptStackWell;
