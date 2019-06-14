import * as React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Constants } from "expo";
import { Component, Text, Item, Input, Label, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import SwitchNavigator from "./SwitchNavigator";
import * as firebase from "firebase";

//Initializing firebase firestore Not added for security purpose
firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SwitchNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  }
});
