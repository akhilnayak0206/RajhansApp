import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import {
  createDrawerNavigator,
  createAppContainer,
  DrawerItems
} from "react-navigation";

import Awing from "./DrawerScreens/wings/Awing";
import Bwing from "./DrawerScreens/wings/Bwing";
import Cwing from "./DrawerScreens/wings/Cwing";
import Dwing from "./DrawerScreens/wings/Dwing";
import Ewing from "./DrawerScreens/wings/Ewing";
import WellWisher from "./DrawerScreens/wings/WellWisher";
import Expenses from "./DrawerScreens/wings/Expenses";
import Overview from "./DrawerScreens/wings/Overview";
import DeleteReset from "./DrawerScreens/DeleteReset";
import SignOut from "../SignOut";

export default class DrawerScreenNavigator extends Component {
  render() {
    return <FinalDrawer />;
  }
}

const customDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.drawerHeader}>
      <Text style={styles.textDHeader}>Jai Mitra Mandal</Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const Drawer = createDrawerNavigator(
  {
    AWing: Awing,
    BWing: Bwing,
    CWing: Cwing,
    DWing: Dwing,
    EWing: Ewing,
    WellWisher: WellWisher,
    Expenses: Expenses,
    Overview: Overview,
    DeleteReset: DeleteReset,
    SignOut: SignOut
  },
  {
    contentComponent: customDrawerComponent
  }
);

const FinalDrawer = createAppContainer(Drawer);

const styles = StyleSheet.create({
  drawerHeader: {
    height: 100,
    backgroundColor: "#3EC4CA",
    justifyContent: "center",
    alignItems: "center"
  },
  textDHeader: {
    fontWeight: "bold"
  }
});
