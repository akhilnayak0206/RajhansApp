import React, { Component } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
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

import FinalStackNavigator from "./Components/AppStackNavigator";

export default class Awing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wingA: [],
      shouldShow: false
    };
  }

  getData = () => {
    var flats = [];
    firebase
      .firestore()
      .collection("wingA")
      .get()
      .then(query => {
        query.forEach(doc => {
          flats.push(doc.data());
        });
        this.setState({
          wingA: flats.sort(function(a, b) {
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
    drawerLabel: "A Wing"
  };
  render() {
    let scrollflat;

    if (this.state.shouldShow === true) {
      scrollflat = (
        <FinalStackNavigator
          screenProps={{ flats: this.state.wingA, wing: "wingA" }}
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
              <Icon name="menu" style={styles.icon} />
            </Button>
          </Left>
          <Body>
            <Title> A Wing </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.getData()}>
              <Icon name="md-refresh" style={styles.icon} />
            </Button>
          </Right>
        </Header>
        {scrollflat}
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
  }
});
