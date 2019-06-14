import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Icon,
  Button,
  Header,
  Container,
  Left,
  Right,
  Title,
  Body,
  Text,
  List,
  ListItem
} from "native-base";
import firebase from "react-native-firebase";

export default class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container style={styles.row}>
        <List>
          <ListItem
            onPress={() => {
              this.props.navigation.navigate("ScrollViewDelete");
            }}
          >
            <Left>
              <Body>
                <Text>Delete and Reset Record</Text>
              </Body>
            </Left>
            <Right />
          </ListItem>
          <ListItem
            onPress={() => {
              this.props.navigation.navigate("ResetScreen");
            }}
          >
            <Left>
              <Body>
                <Text>Reset Data</Text>
              </Body>
            </Left>
            <Right />
          </ListItem>
        </List>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 0
  }
});
