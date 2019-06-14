import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "@firebase/firestore";
import RowR from "./RowR";

export default class ScrollViewReceipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Receipts: [],
      check: false
    };
  }
  componentDidMount() {
    this.getReceipt();
    this.setState({ check: true });
  }
  componentWillUnmount() {
    this.setState({
      check: false
    });
  }

  getReceipt = () => {
    var docRef = firebase
      .firestore()
      .collection(this.props.screenProps.wing)
      .doc(this.props.screenProps.flatNo.toString());
    docRef.onSnapshot(doc => {
      if (this.state.check) {
        console.log("ok");
        this.setState({
          Receipts: doc.data()["Receipt"]
        });
      } else {
        console.log("cancel snapshot");
      }
    });
  };

  render() {
    var i = 0;
    return (
      <ScrollView>
        {this.state.Receipts.map(receipt => {
          if (receipt["Received"] != undefined) {
            return (
              <RowR
                screenProps={{
                  receipt: { ...receipt },
                  wing: this.props.screenProps.wing,
                  flatNo: this.props.screenProps.flatNo
                }}
                key={i++}
                navigation={this.props.navigation}
              />
            );
          }
        })}
      </ScrollView>
    );
  }
}
