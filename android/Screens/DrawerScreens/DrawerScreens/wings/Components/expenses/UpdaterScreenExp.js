import React, { Component } from "react";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Content,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import firebase from "react-native-firebase";

export default class UpdaterScreenExp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameTitle: "",
      newAmount: 0,
      nameCollected: "",
      nameChangeCollected: "",
      nameDescription: "",
      isFormValid: false
    };
  }
  componentWillMount() {
    this.collectorDetails();
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
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
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
      Amount: this.state.newAmount,
      Title: this.state.nameTitle,
      Collected: prop,
      Description: this.state.nameDescription,
      timestamp: timestamp,
      Date: today,
      sortDate: sortDate
    };

    var docRef = firebase.firestore().collection("expenses");
    docRef
      .add(updator)
      .then(() => {
        alert("Expense added");
        this.props.navigation.goBack();
      })
      .catch(() => {
        alert("Error making Receipt");
      });
  };

  validateForm = () => {
    if (this.state.newAmount > 0 && isNaN(this.state.newAmount) === false) {
      if (this.state.nameCollected.length > 0) {
        if (this.state.nameTitle.length) {
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
  };

  handleSubmit = () => {
    Keyboard.dismiss();
    this.validateForm();
  };

  render() {
    return (
      <Container>
        <Content>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input
                onChangeText={nameTitle => {
                  this.setState({ nameTitle });
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
            <Item floatingLabel>
              <Label>Description</Label>
              <Input
                onChangeText={nameDescription => {
                  this.setState({ nameDescription });
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Purchased By: </Label>
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
              <Text>Add Expense</Text>
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
