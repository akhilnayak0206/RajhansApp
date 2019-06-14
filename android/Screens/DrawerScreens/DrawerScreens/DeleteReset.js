import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import {
  Icon,
  Button,
  Header,
  Container,
  Left,
  Right,
  Title,
  Body
} from "native-base";
import firebase from "react-native-firebase";
import DeleteNavigator from "./ResetScreen/DeleteNavigator";

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
              <Icon name="menu" style={styles.icon} />
            </Button>
          </Left>
          <Body>
            <Title>Reset Database </Title>
          </Body>
          <Right />
        </Header>
        <DeleteNavigator />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: "white"
  },
  header: {
    backgroundColor: "#3EC4CA"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3EC4CA",
    padding: 5
  }
});
