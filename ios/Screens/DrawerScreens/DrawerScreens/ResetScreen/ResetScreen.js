import React, { Component } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import {
  List,
  ListItem,
  Body,
  Button,
  Header,
  Card,
  CardItem,
  Text,
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
import * as firebase from "firebase";
import "@firebase/firestore";

export default class ResetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Date: "",
      Amount: "",
      expenses: "",
      isButtonDisabled: false,
      count: 0
    };
  }
  componentWillMount() {
    this.getData();
    this.collectorDetails();
  }

  getDataWingA = () => {
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
        this.setState(prevState => ({
          Amount: prevState.Amount + amountA
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
        this.setState(prevState => ({
          Amount: prevState.Amount + amountB
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
        this.setState(prevState => ({
          Amount: prevState.Amount + amountC
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
        this.setState(prevState => ({
          Amount: prevState.Amount + amountD
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
        this.setState(prevState => ({
          Amount: prevState.Amount + amountE
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
        this.setState(prevState => ({
          Amount: prevState.Amount + amountWell
        }));
      })
      .catch(function(error) {
        alert("Error getting WellWisher amount");
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
      Amount: 0
    });
    this.getDataWingA();
    this.getDataWingB();
    this.getDataWingC();
    this.getDataWingD();
    this.getDataWingE();
    this.getDataWellWishers();
    this.getDataExpenses();
  };

  collectorDetails = () => {
    var collector = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.email.toString())
      .get()
      .then(doc => {
        let name = doc.data();
        this.setState({
          Name: name["Name"]
        });
      })
      .catch(error => {
        alert("error getting collectors name");
      });
  };

  reset = () => {
    if (
      this.state.Amount > 0 &&
      this.state.Name.length > 0 &&
      this.state.expenses > 0
    ) {
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
        Amount: this.state.Amount,
        Name: this.state.Name,
        Type: "Reset",
        Date: today,
        expenses: this.state.expenses,
        sortDate: sortDate,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };
      var docRef = firebase.firestore().collection("deleteReset");
      docRef
        .add(updator)
        .then(() => {
          alert("Reset ongoing");
          this.setState({
            isButtonDisabled: true
          });
          this.reset2();
        })
        .catch(() => {
          alert("Could not Reset");
        });
    } else {
      this.setState({
        isButtonDisabled: true
      });
      setTimeout(() => this.setState({ isButtonDisabled: false }), 10000);
      alert("Please Click after 10 seconds");
    }
  };

  reset2 = () => {
    var updator = {
      Amount: 0,
      Received: "",
      Collected: "",
      Receipt: []
    };

    //wing A
    var docRefA = firebase.firestore().collection("wingA");
    docRefA
      .get()
      .then(query => {
        query.forEach(doc => {
          docRefA
            .doc(doc.id.toString())
            .update(updator)
            .then(() => {
              console.log(doc.id.toString());
            })
            .catch(() => {
              alert("Reset UnSuccessfull from wing A");
            });
        });
        this.setState(prevState => ({
          count: prevState.count + 1,
          isButtonDisabled: true
        }));
        if (this.state.count === 7) {
          setTimeout(
            () => this.setState({ isButtonDisabled: false, count: 0 }),
            20000
          );
          setTimeout(() => alert("Reset Successfull"), 20000);
        }
      })
      .catch(function(error) {
        alert("Reset of wing A Unsuccessfull");
      });
    //wing B
    var docRefB = firebase.firestore().collection("wingB");
    docRefB
      .get()
      .then(query => {
        query.forEach(doc => {
          docRefB
            .doc(doc.id.toString())
            .update(updator)
            .then(() => {
              console.log(doc.id.toString());
            })
            .catch(() => {
              alert("Reset UnSuccessfull of wing B");
            });
        });
        this.setState(prevState => ({
          count: prevState.count + 1,
          isButtonDisabled: true
        }));

        if ((this.state.count = 7)) {
          setTimeout(
            () => this.setState({ isButtonDisabled: false, count: 0 }),
            20000
          );
          setTimeout(() => alert("Reset Successfull"), 20000);
        }
      })
      .catch(function(error) {
        alert("Reset of wing B Unsuccessfull");
      });

    //wing C
    var docRefC = firebase.firestore().collection("wingC");
    docRefC
      .get()
      .then(query => {
        query.forEach(doc => {
          docRefC
            .doc(doc.id.toString())
            .update(updator)
            .then(() => {
              console.log(doc.id.toString());
            })
            .catch(() => {
              alert("Reset UnSuccessfull of wing C");
            });
        });
        this.setState(prevState => ({
          count: prevState.count + 1,
          isButtonDisabled: true
        }));

        if (this.state.count === 7) {
          setTimeout(
            () => this.setState({ isButtonDisabled: false, count: 0 }),
            20000
          );
          setTimeout(() => alert("Reset Successfull"), 20000);
        }
      })
      .catch(function(error) {
        alert("Reset of wing C Unsuccessfull");
      });

    //wing D
    var docRefD = firebase.firestore().collection("wingD");
    docRefD
      .get()
      .then(query => {
        query.forEach(doc => {
          docRefD
            .doc(doc.id.toString())
            .update(updator)
            .then(() => {
              console.log(doc.id.toString());
            })
            .catch(() => {
              alert("Reset UnSuccessfull of wing D");
            });
        });
        this.setState(prevState => ({
          count: prevState.count + 1,
          isButtonDisabled: true
        }));

        if (this.state.count === 7) {
          setTimeout(
            () => this.setState({ isButtonDisabled: false, count: 0 }),
            20000
          );
          setTimeout(() => alert("Reset Successfull"), 20000);
        }
      })
      .catch(function(error) {
        alert("Reset of wing D Unsuccessfull");
      });

    //wing E
    var docRefE = firebase.firestore().collection("wingE");
    docRefE
      .get()
      .then(query => {
        query.forEach(doc => {
          docRefE
            .doc(doc.id.toString())
            .update(updator)
            .then(() => {
              console.log(doc.id.toString());
            })
            .catch(() => {
              alert("Reset UnSuccessfull of wing E");
            });
        });
        this.setState(prevState => ({
          count: prevState.count + 1,
          isButtonDisabled: true
        }));

        if (this.state.count === 7) {
          setTimeout(
            () => this.setState({ isButtonDisabled: false, count: 0 }),
            20000
          );
          setTimeout(() => alert("Reset Successfull"), 20000);
        }
      })
      .catch(function(error) {
        alert("Reset of wing E Unsuccessfull");
      });

    //Well-Wisher
    var docRefWell = firebase.firestore().collection("wellWishers");
    docRefWell
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data()["Collected"] != undefined) {
            firebase
              .firestore()
              .collection("wellWishers")
              .doc(doc.id.toString())
              .delete()
              .then(function() {
                console.log("well", doc.id.toString());
              })
              .catch(function(error) {
                alert("Deletion of well wishers unsuccessfull");
              });
          }
        });
        this.setState(prevState => ({
          count: prevState.count + 1,
          isButtonDisabled: true
        }));

        if (this.state.count === 7) {
          setTimeout(
            () => this.setState({ isButtonDisabled: false, count: 0 }),
            20000
          );
          setTimeout(() => alert("Reset Successfull"), 20000);
        }
      })
      .catch(function(error) {
        alert("Reset of Well Wishers Unsuccessfull");
      });

    //expense

    var docRefExp = firebase.firestore().collection("expenses");
    docRefExp
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data()["Collected"] != undefined) {
            firebase
              .firestore()
              .collection("expenses")
              .doc(doc.id.toString())
              .delete()
              .then(function() {
                console.log(doc.id.toString());
              })
              .catch(function(error) {
                alert("Deletion of expense unsuccessfull");
              });
          }
        });
        this.setState(prevState => ({
          count: prevState.count + 1,
          isButtonDisabled: true
        }));

        if (this.state.count === 7) {
          setTimeout(
            () => this.setState({ isButtonDisabled: false, count: 0 }),
            20000
          );
          setTimeout(() => alert("Reset Successfull"), 20000);
        }
      })
      .catch(function(error) {
        console.log(error);
        alert("Reset of Expenses Unsuccessfull");
      });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Card>
              <CardItem header>
                <Text>Rajhans App</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>After reset the data cannot be retrieved.{"\n"}</Text>
                  <Text>
                    Please talk with the coordinators before proceeding.
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>Jai Mitra Mandal</Text>
              </CardItem>
            </Card>
            <Button
              full
              style={styles.button}
              onPress={() => this.reset()}
              danger
              disabled={this.state.isButtonDisabled}
            >
              <Text>Reset</Text>
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
    padding: 15
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 10
  }
});
