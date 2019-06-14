import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title
} from "native-base";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import TabScreen1 from "./TabsScreen/TabScreen1";
import TabScreen2 from "./TabsScreen/TabScreen2";
import TabScreen3 from "./TabsScreen/TabScreen3";

export default class UpdaterScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const idd = this.props.navigation.getParam("idd", "NO-ID");
    const wing = this.props.navigation.getParam("wing", "NO-ID");
    return (
      <Container>
        <Button
          style={styles.buttonBack}
          full
          onPress={() => this.props.navigation.navigate("ScrollViewFlats")}
        >
          <Text>Go Back</Text>
        </Button>
        <FinalTab screenProps={{ idd: idd, wing: wing }} />
      </Container>
    );
  }
}

const Tab = createMaterialTopTabNavigator(
  {
    Tab1: {
      screen: TabScreen1,
      navigationOptions: {
        tabBarLabel: "Make Receipt"
      }
    },
    Tab2: {
      screen: TabScreen2,
      navigationOptions: {
        tabBarLabel: "Add Contact"
      }
    },
    Tab3: {
      screen: TabScreen3,
      navigationOptions: {
        tabBarLabel: "Receipt"
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: "#3EC4CA"
      }
    }
  }
);

const FinalTab = createAppContainer(Tab);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3EC4CA"
  },
  buttonBack: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3EC4CA",
    backgroundColor: "#3EC4CA"
  }
});
