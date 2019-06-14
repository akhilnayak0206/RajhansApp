import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
  Button,
  Header,
  Container,
  Left,
  Right,
  Title,
  List,
  ListItem,
  Body
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "@firebase/firestore";
import ReceiptStackWell from "./ReceiptStackWell";

export var docidd = "";

export default class TabScreen3W extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: {},
      mounted: true,
      showReceipt: false
    };
  }

  componentWillUnmount() {
    this.setState({
      mounted: false
    });
  }

  getReceipt = () => {
    if (docidd.length > 1) {
      if (this.state.mounted) {
        this.check();
      } else {
        console.log("unmounted");
      }
    } else {
      return <Text> No Receipt </Text>;
    }
  };

  check = () => {
    var docRef = firebase
      .firestore()
      .collection("wellWishers")
      .doc(docidd.toString())
      .get()
      .then(doc => {
        let dummy = { ...doc.data() };
        if (this.state.mounted) {
          this.setState({
            receipt: dummy
          });
          this.ifState();
        }
      })
      .catch(error => {
        alert("error getting receipt");
      });
  };

  ifState = () => {
    if (this.state.receipt["Received"] != undefined) {
      console.log("receivedif: ", this.state.receipt["Received"]);
      this.setState({
        mounted: false,
        showReceipt: true
      });
    } else {
      console.log("receipt:", this.state.receipt);
      return <Text> No Receipt in database</Text>;
    }
  };

  render() {
    docidd = this.props.navigation.getParam("docidd", "");
    return (
      <View style={styles.container}>
        {this.getReceipt()}
        {this.state.showReceipt ? (
          <ReceiptStackWell screenProps={{ receipt: this.state.receipt }} />
        ) : (
          <Text>Receipt not Found</Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
