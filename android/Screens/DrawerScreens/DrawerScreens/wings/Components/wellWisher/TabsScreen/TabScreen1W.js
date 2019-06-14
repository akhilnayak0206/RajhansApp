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
  Icon,
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
import firebase from "react-native-firebase";

export default class TabScreen1W extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameReceived: "",
      newAmount: 0,
      nameCollected: "",
      nameChangeCollected: "",
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
      Received: this.state.nameReceived,
      Collected: prop,
      Date: today,
      timestamp: timestamp,
      sortDate: sortDate
    };

    var docRef = firebase.firestore().collection("wellWishers");
    docRef
      .add(updator)
      .then(doc => {
        alert("Receipt made");
        this.props.navigation.navigate("Tab3", {
          docidd: doc.id
        });
      })
      .catch(() => {
        alert("Error making Receipt");
      });
  };

  validateForm = () => {
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
