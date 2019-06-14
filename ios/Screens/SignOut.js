import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Content,
  Card,
  CardItem,
  Text
} from "native-base";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

export default class SignOut extends React.Component {
  constructor(props) {
    super(props);
  }

  //Below is the method for sign out

  signOutUser = async () => {
    try {
      firebase.auth().signOut();
      this.props.navigation.navigate("LogInScreen");
    } catch (e) {
      console.log(e.toString());
    }
  };
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
            <Title style={styles.textHeader}> Sign Out </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <CardItem header>
              <Text>Rajhans App</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>This app was made by Akhil Nayak.</Text>
                <Text>
                  Any suggestions or doubts can contact me by emailing me to
                  nnewn3@gmail.com
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Jai Mitra Mandal</Text>
            </CardItem>
          </Card>
        </Content>

        <Container style={styles.container}>
          <Text style={styles.textUser}>
            {`${firebase
              .auth()
              .currentUser.email.toString()} do you want to Sign out ? `}
          </Text>
          <Button
            block
            danger
            onPress={() => this.signOutUser()}
            style={styles.button}
          >
            <Text style={styles.icon}>Sign Out</Text>
          </Button>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3EC4CA"
  },
  container: {
    padding: 15
  },
  button: {
    padding: 10,
    marginTop: 10
  },
  textHeader: {
    color: "white"
  },
  textUser: {
    color: "red",
    fontWeight: "bold"
  }
});
