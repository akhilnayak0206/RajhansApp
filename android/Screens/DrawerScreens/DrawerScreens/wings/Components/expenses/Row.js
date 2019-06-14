import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import {
  Icon,
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
import firebase from "react-native-firebase";

const styles = StyleSheet.create({
  row: {
    padding: 0
  }
});

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }

  collectorDetails = () => {
    var collector = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.email.toString())
      .get()
      .then(doc => {
        let name = doc.data();
        this.setState({
          userName: name["Name"]
        });
      })
      .catch(error => {
        alert("error getting collectors name");
      });
  };

  handleLongPress = () => {
    Alert.alert("Delete Data", "Do you really want to delete this receipt?", [
      { text: "No", onPress: () => this.noDelete() },
      { text: "Yes", onPress: () => this.deleteReceipt() }
    ]);
  };

  noDelete = () => {
    alert("Receipt was not deleted");
  };

  deleteReceipt = () => {
    this.collectorDetails();
    if (this.state.userName.length > 1) {
      var today = new Date();
      var dd = today.getDate();

      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      today = dd + "/" + mm + "/" + yyyy;
      var sortDate = dd + mm + yyyy;

      var updator = {
        Amount: this.props.screenProps.expense["Amount"],
        Name: this.state.userName,
        Received: this.props.screenProps.expense["Title"],
        Type: "Delete expense",
        Date: today,
        sortDate: sortDate,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };

      var docRef = firebase.firestore().collection("deleteReset");
      docRef
        .add(updator)
        .then(() => {
          alert("Delete ongoing");
          firebase
            .firestore()
            .collection("expenses")
            .doc(this.props.screenProps.expense.idd.toString())
            .delete()
            .then(function() {
              alert("Delete successfull");
            })
            .catch(function(error) {
              alert("Delete unsuccessfull");
            });
        })
        .catch(err => {
          alert("Could not Delete");
        });
    } else {
      alert(
        "Deletion was unsuccessfull. Wait for 5 seconds then refresh and then do it again."
      );
    }
  };

  render() {
    return (
      <View style={styles.row}>
        <List>
          <ListItem
            onPress={() =>
              this.props.navigation.navigate("ReceiptExp", {
                receipt: { ...this.props.screenProps.expense }
              })
            }
            onLongPress={() => this.handleLongPress()}
          >
            <Left>
              <Body>
                <Text>
                  Title: {this.props.screenProps.expense["Title"]} {"\n"}
                </Text>
                <Text>Amount: {this.props.screenProps.expense["Amount"]} </Text>
              </Body>
            </Left>
            <Body>
              <Right>
                <Text>Date: {this.props.screenProps.expense["Date"]}</Text>
              </Right>
            </Body>
          </ListItem>
        </List>
      </View>
    );
  }
}

export default Row;
