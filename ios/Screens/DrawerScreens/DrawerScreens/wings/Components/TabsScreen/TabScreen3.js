import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import ReceiptStack from "./ReceiptStack";

export default class TabScreen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatNo: "",
      wing: ""
    };
  }

  componentWillMount() {
    this.setState({
      flatNo: this.props.screenProps.idd,
      wing: this.props.screenProps.wing
    });
  }

  render() {
    return (
      <ReceiptStack
        screenProps={{ flatNo: this.state.flatNo, wing: this.state.wing }}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  }
});
