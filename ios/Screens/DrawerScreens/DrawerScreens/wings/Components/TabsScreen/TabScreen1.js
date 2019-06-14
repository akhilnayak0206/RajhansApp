import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
  ScrollView,
  Keyboard
} from "react-native";
import {
  List,
  ListItem,
  Button,
  Header,
  Container,
  Left,
  Right,
  Title,
  Content,
  Form,
  Item,
  Input,
  Label
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "@firebase/firestore";

export default class TabScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameReceived: "",
      newAmount: 0,
      nameCollected: "",
      nameChangeCollected: "",
      isFormValid: false,
      flatNo: "",
      wing: ""
    };
  }

  componentWillMount() {
    this.collectorDetails();
    this.setState({
      flatNo: this.props.screenProps.idd,
      wing: this.props.screenProps.wing
    });
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
          nameCollected: name["Name"]
        });
      })
      .catch(error => {
        alert("error getting collectors name");
      });
  };

  updateDetails = prop => {
    const timestamp = Date(Date.now()).toString();
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
    today = mm + "/" + dd + "/" + yyyy;

    var updator = {
      Amount: this.state.newAmount,
      Received: this.state.nameReceived,
      Collected: prop
    };

    var receiptUpdate = {
      Amount: this.state.newAmount,
      Received: this.state.nameReceived,
      Collected: prop,
      Date: today,
      timestamp: timestamp
    };

    var docRef = firebase
      .firestore()
      .collection(this.state.wing)
      .doc(this.state.flatNo.toString());
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          docRef.update(updator);
          docRef
            .update({
              Receipt: firebase.firestore.FieldValue.arrayUnion(receiptUpdate)
            })
            .then(() => {
              alert("Receipt made");
              this.props.navigation.navigate("Tab3");
            })
            .catch(() => {
              alert("No such Flat");
            });
        } else {
          alert("No Such Document");
        }
      })
      .catch(function(error) {
        alert("Error getting document");
      });
  };

  validateForm = () => {
    if (this.state.flatNo > 0) {
      if (this.state.newAmount > 0 && isNaN(this.state.newAmount) === false) {
        if (this.state.nameCollected.length > 0) {
          if (this.state.nameReceived.length) {
            if (this.state.nameChangeCollected.length > 0) {
              this.updateDetails(this.state.nameChangeCollected);
            } else {
              this.updateDetails(this.state.nameCollected);
            }
          } else {
            alert("Please enter donor's name");
            this.setState({ isFormValid: false });
          }
        } else {
          alert("Please enter collector's name");
          this.setState({ isFormValid: false });
        }
      } else {
        alert("Enter valid Amount");
        this.setState({ isFormValid: false });
      }
    } else {
      this.setState({ isFormValid: false });
      alert("Enter valid Flat No.");
    }
  };

  handleSubmit = () => {
    Keyboard.dismiss();
    this.validateForm();
  };

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <Content>
          <Form style={styles.form}>
            <Item rounded>
              <Label>{`  Flat Number : ${this.state.flatNo}`}</Label>
            </Item>
            <Item floatingLabel>
              <Label>Change Flat No:</Label>
              <Input
                onChangeText={flatNo => {
                  this.setState({ flatNo });
                }}
              />
            </Item>
            <Item floatingLabel>
              <Label>Received from:</Label>
              <Input
                onChangeText={nameReceived => {
                  this.setState({ nameReceived });
                }}
              />
            </Item>
            <Item floatingLabel>
              <Label>Amount:</Label>
              <Input
                keyboardType="numeric"
                onChangeText={newAmount => {
                  this.setState({ newAmount });
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Collected by:</Label>
              <Input
                placeholder={this.state.nameCollected}
                onChangeText={nameChangeCollected => {
                  this.setState({ nameChangeCollected });
                }}
              />
            </Item>
            <Button
              full
              style={styles.button}
              onPress={() => this.handleSubmit()}
            >
              <Text>Make Receipt</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  },
  row: {
    padding: 0
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3EC4CA",
    marginTop: 30,
    borderRadius: 10
  },
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 15
  }
});
