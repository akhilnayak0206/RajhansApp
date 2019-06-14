import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Icon, Button } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Receipt from "./Receipt";
import ScrollViewReceipt from "./ScrollViewReceipt";

const AppStackNavigator = createStackNavigator({
  ScrollViewReceipt: {
    screen: ScrollViewReceipt,
    navigationOptions: {
      header: null
    }
  },
  Receipt: {
    screen: Receipt,
    navigationOptions: {
      header: null
    }
  }
});

const ReceiptStack = createAppContainer(AppStackNavigator);

export default ReceiptStack;
