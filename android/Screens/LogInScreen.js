import React, { Component } from "react";
import { StyleSheet, Text, ImageBackground, Alert } from "react-native";
import { Form, Item, Input, Label, Button } from "native-base";
import firebase from "react-native-firebase";

export default class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  //A method for  LogIn button and SignUp  Button
  //Pop up Hasn't been made if a user signs up  then that person might have to press at log in

  logInUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          this.props.navigation.navigate("DrawerScreen");
        })
        .catch(err => {
          alert(err.toString());
        });
    } catch (error) {
      alert(error.toString());
    }
  };

  render() {
    return (
      <ImageBackground
        source={require("../Images/backgroundImage.jpg")}
        style={styles.backgroundImage}
      >
        <Form style={styles.container}>
          <Item floatingLabel>
            <Label style={styles.text}>Email</Label>
            <Input
              style={styles.text}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.text}>Password</Label>
            <Input
              style={styles.text}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button
            full
            rounded
            success
            style={styles.Button}
            onPress={() =>
              this.logInUser(this.state.email, this.state.password)
            }
          >
            <Text style={styles.text}>Log In</Text>
          </Button>
        </Form>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  text: {
    color: "white"
  },
  Button: {
    marginTop: 15
  }
});
