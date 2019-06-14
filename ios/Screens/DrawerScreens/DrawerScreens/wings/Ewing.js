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
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "@firebase/firestore";

import FinalStackNavigator from "./Components/AppStackNavigator";

export default class Ewing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wingE: [],
      shouldShow: false
    };
  }

  getData = () => {
    var flats = [];
    firebase
      .firestore()
      .collection("wingE")
      .get()
      .then(query => {
        query.forEach(doc => {
          flats.push(doc.data());
        });
        this.setState({
          wingE: flats.sort(function(a, b) {
            return a.Flatno - b.Flatno;
          }),
          shouldShow: true
        });
      })
      .catch(function(error) {
        alert("Error getting document");
      });
  };

  componentWillMount() {
    this.getData();
  }

  static navigationOptions = {
    drawerLabel: "E Wing"
  };
  render() {
    let scrollflat;

    if (this.state.shouldShow === true) {
      scrollflat = (
        <FinalStackNavigator
          screenProps={{ flats: this.state.wingE, wing: "wingE" }}
        />
      );
    }

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
            <Title style={styles.textHeader}> E Wing </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.getData()}>
              <Ionicons name="md-refresh" size={32} color="white" />
            </Button>
          </Right>
        </Header>
        {scrollflat}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  textHeader: {
    color: "white"
  },
  header: {
    backgroundColor: "#3EC4CA"
  }
});
