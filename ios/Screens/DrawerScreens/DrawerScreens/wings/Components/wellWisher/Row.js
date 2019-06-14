import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
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

const styles = StyleSheet.create({
  row: {
    padding: 0,
    paddingRight: 5
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
      var sortDate = yyyy + mm + dd;

      var updator = {
        Amount: this.props.screenProps.flat["Amount"],
        Name: this.state.userName,
        Received: this.props.screenProps.flat["Received"],
        Type: "Delete wellwisher",
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
            .collection("wellWishers")
            .doc(this.props.screenProps.flat.idd.toString())
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
            onLongPress={() => this.handleLongPress()}
            onPress={() =>
              this.props.navigation.navigate("ReceiptWell", {
                receipt: { ...this.props.screenProps.flat }
              })
            }
          >
            <Left>
              <Body>
                <Text>
                  Name: {this.props.screenProps.flat["Received"]} {"\n"}
                </Text>
                <Text>Amount: {this.props.screenProps.flat["Amount"]}</Text>
              </Body>
            </Left>
            <Body>
              <Right>
                <Text>Date: {this.props.screenProps.flat["Date"]}</Text>
              </Right>
            </Body>
          </ListItem>
        </List>
      </View>
    );
  }
}
export default Row;
