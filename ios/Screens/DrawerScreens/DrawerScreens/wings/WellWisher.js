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
import WellStack from "./Components/wellWisher/wellStack";

export default class WellWisher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wellWishers: [],
      shouldShow: false
    };
  }

  getData = () => {
    var flats = [];
    firebase
      .firestore()
      .collection("wellWishers")
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
          wellWishers: flats,
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
    drawerLabel: "Well - Wishers"
  };

  render() {
    var scrollflat;
    if (this.state.shouldShow === true) {
      scrollflat = (
        <WellStack screenProps={{ flats: this.state.wellWishers }} />
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
            <Title style={styles.textHeader}>Well - Wishers</Title>
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
  icon: {
    color: "white"
  },
  header: {
    backgroundColor: "#3EC4CA"
  },
  button: {
    position: "absolute",
    backgroundColor: "#3EC4CA",
    padding: 5
  },
  textHeader: {
    color: "white"
  }
});
