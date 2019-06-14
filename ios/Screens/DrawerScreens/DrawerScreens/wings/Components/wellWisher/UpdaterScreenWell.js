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
import TabScreen1W from "./TabsScreen/TabScreen1W";
import TabScreen2W from "./TabsScreen/TabScreen2W";
import TabScreen3W from "./TabsScreen/TabScreen3W";

export default class UpdaterScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Button
          style={styles.buttonBack}
          full
          onPress={() => this.props.navigation.navigate("ScrollViewWell")}
        >
          <Text>Go Back</Text>
        </Button>
        <FinalTab />
      </Container>
    );
  }
}

const Tab = createMaterialTopTabNavigator(
  {
    Tab1: {
      screen: TabScreen1W,
      navigationOptions: {
        tabBarLabel: "Make Receipt"
      }
    },
    Tab2: {
      screen: TabScreen2W,
      navigationOptions: {
        tabBarLabel: "Add Contact"
      }
    },
    Tab3: {
      screen: TabScreen3W,
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
