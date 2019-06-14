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
import "@firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

import ExpStack from "./Components/expenses/ExpStack";

export default class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: []
    };
  }

  getData = () => {
    var flats = [];
    firebase
      .firestore()
      .collection("expenses")
      .get()
      .then(query => {
        query.forEach(doc => {
          let flat = { ...doc.data(), idd: doc.id };
          flats.push(flat);
        });
        flats.sort((a, b) => {
          return b.sortDate - a.sortDate;
        });
        this.setState({
          expenses: flats,
          shouldShow: true
        });
      })
      .catch(function(error) {
        alert("Error getting document");
      });
  };

  componentDidMount() {
    this.getData();
  }

  static navigationOptions = {
    drawerLabel: "Expenses"
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
            <Title style={styles.textHeader}>Expenses</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.getData()}>
              <Ionicons name="md-refresh" size={32} color="white" />
            </Button>
          </Right>
        </Header>
        <ExpStack screenProps={{ expenses: this.state.expenses }} />
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
