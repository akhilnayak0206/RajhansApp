import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import firebase from "react-native-firebase";

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("DrawerScreen");
      } else {
        this.props.navigation.navigate("LogInScreen");
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
