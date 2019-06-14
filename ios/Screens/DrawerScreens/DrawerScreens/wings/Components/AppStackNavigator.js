import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";

import UpdaterScreen from "./UpdaterScreen";
import ScrollViewFlats from "./ScrollViewFlats";

const AppStackNavigator = createStackNavigator({
  ScrollViewFlats: {
    screen: ScrollViewFlats,
    navigationOptions: {
      header: null
    }
  },
  UpdaterScreen: {
    screen: UpdaterScreen,
    navigationOptions: {
      header: null
    }
  }
});

const FinalStackNavigator = createAppContainer(AppStackNavigator);

export default FinalStackNavigator;
