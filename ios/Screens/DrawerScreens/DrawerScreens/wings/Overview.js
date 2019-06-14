import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import {
  Button,
  Header,
  Container,
  Left,
  Right,
  Title,
  Body
} from "native-base";
import * as firebase from "firebase";
import "@firebase/firestore";
import ScrollViewOver from "./Components/Overview/ScrollViewOver";
import { Ionicons } from "@expo/vector-icons";

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wingA: 0,
      wingB: 0,
      wingC: 0,
      wingD: 0,
      wingE: 0,
      wellWishers: 0,
      expenses: 0,
      total: 0
    };
  }

  static navigationOptions = {
    drawerLabel: "Overview"
  };

  getDataWingA = () => {
    console.log("wingA");
    var amountA = 0;
    firebase
      .firestore()
      .collection("wingA")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (isNaN(parseInt(doc.data()["Amount"]))) {
          } else {
            amountA = amountA + parseInt(doc.data()["Amount"]);
          }
        });
        console.log("total", this.state.total);
        console.log("amountA", amountA);

        this.setState(prevState => ({
          wingA: amountA,
          total: prevState.total + amountA
        }));
      })
      .catch(function(error) {
        alert("Error getting Wing A amount");
      });
  };

  getDataWingB = () => {
    var amountB = 0;
    firebase
      .firestore()
      .collection("wingB")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (isNaN(parseInt(doc.data()["Amount"]))) {
          } else {
            amountB = amountB + parseInt(doc.data()["Amount"]);
          }
        });
        console.log("total", this.state.total);
        console.log("amountB", amountB);
        this.setState(prevState => ({
          wingB: amountB,
          total: prevState.total + amountB
        }));
      })
      .catch(function(error) {
        alert("Error getting Wing B amount");
      });
  };

  getDataWingC = () => {
    var amountC = 0;
    firebase
      .firestore()
      .collection("wingC")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (isNaN(parseInt(doc.data()["Amount"]))) {
          } else {
            amountC = amountC + parseInt(doc.data()["Amount"]);
          }
        });
        console.log("total", this.state.total);
        console.log("amountC", amountC);
        this.setState(prevState => ({
          wingC: amountC,
          total: prevState.total + amountC
        }));
      })
      .catch(function(error) {
        alert("Error getting Wing C amount");
      });
  };

  getDataWingD = () => {
    var amountD = 0;
    firebase
      .firestore()
      .collection("wingD")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (isNaN(parseInt(doc.data()["Amount"]))) {
          } else {
            amountD = amountD + parseInt(doc.data()["Amount"]);
          }
        });
        console.log("total", this.state.total);
        console.log("amountD", amountD);
        this.setState(prevState => ({
          wingD: amountD,
          total: prevState.total + amountD
        }));
      })
      .catch(function(error) {
        alert("Error getting Wing D amount");
      });
  };

  getDataWingE = () => {
    var amountE = 0;
    firebase
      .firestore()
      .collection("wingE")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (isNaN(parseInt(doc.data()["Amount"]))) {
          } else {
            amountE = amountE + parseInt(doc.data()["Amount"]);
          }
        });
        console.log("total", this.state.total);
        console.log("amountE", amountE);
        this.setState(prevState => ({
          wingE: amountE,
          total: prevState.total + amountE
        }));
      })
      .catch(function(error) {
        alert("Error getting Wing E amount");
      });
  };

  getDataWellWishers = () => {
    var amountWell = 0;
    firebase
      .firestore()
      .collection("wellWishers")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (isNaN(parseInt(doc.data()["Amount"]))) {
          } else {
            amountWell = amountWell + parseInt(doc.data()["Amount"]);
          }
        });
        console.log("total", this.state.total);
        console.log("amountWell", amountWell);
        this.setState(prevState => ({
          wellWishers: amountWell,
          total: prevState.total + amountWell
        }));
      })
      .catch(function(error) {
        alert("Error getting Wing E amount");
      });
  };

  getDataExpenses = () => {
    var amountExp = 0;
    firebase
      .firestore()
      .collection("expenses")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (isNaN(parseInt(doc.data()["Amount"]))) {
          } else {
            amountExp = amountExp + parseInt(doc.data()["Amount"]);
          }
        });
        this.setState({
          expenses: amountExp
        });
      })
      .catch(function(error) {
        alert("Error getting Expense amount");
      });
  };

  getData = () => {
    this.setState({
      total: 0
    });
    this.getDataWingA();
    this.getDataWingB();
    this.getDataWingC();
    this.getDataWingD();
    this.getDataWingE();
    this.getDataWellWishers();
    this.getDataExpenses();
  };

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}
            >
              <Ionicons name="ios-menu" size={32} color="white" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.textHeader}> Overview </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.getData()}>
              <Ionicons name="md-refresh" size={32} color="white" />
            </Button>
          </Right>
        </Header>
        <ScrollViewOver screenProps={this.state} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3EC4CA"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3EC4CA",
    padding: 5
  },
  textHeader: {
    color: "white"
  }
});
