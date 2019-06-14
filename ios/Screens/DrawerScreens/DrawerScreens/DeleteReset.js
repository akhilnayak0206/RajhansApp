import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import {
  Button,
  Header,
  Container,
  Left,
  Right,
  Title,
  Body
} from "native-base";
import * as firebase from "firebase";
import DeleteNavigator from "./ResetScreen/DeleteNavigator";
import { Ionicons } from "@expo/vector-icons";

export default class DeleteReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    drawerLabel: "Reset Database"
  };

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}
            >
              <Ionicons name="ios-menu" size={32} color="white" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.textHeader}>Reset Database </Title>
          </Body>
          <Right />
        </Header>
        <DeleteNavigator />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3EC4CA"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3EC4CA",
    padding: 5
  },
  textHeader: {
    color: "white"
  }
});
