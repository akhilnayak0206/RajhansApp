import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  PermissionsAndroid
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
import Contacts from "react-native-contacts";

export async function request_write_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      alert("Permission denied");
    }
  } catch (err) {
    alert("Error in Permissions");
  }
}
export async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      alert("Permission Denied");
    }
  } catch (err) {
    alert("Error in Permission");
  }
}

export default class TabScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addName: "",
      addPhone: ""
    };
  }

  async componentWillMount() {
    await request_write_permission();
    await requestCameraPermission();
  }

  addContact = (name, phone) => {
    Keyboard.dismiss();
    var newPerson = {
      familyName: name,
      givenName: "RajhansApp",
      phoneNumbers: [
        {
          label: "mobile",
          number: phone
        }
      ]
    };
    if (phone.length == 10) {
      if (name.length > 2) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS
        ).then(() => {
          Contacts.addContact(newPerson, err => {
            if (err) throw err;
            alert("Contact saved");
          });
        });
      } else {
        alert("Name should be greater than 2 character");
      }
    } else {
      alert("Phone number not valid.");
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Add Name</Label>
              <Input onChangeText={addName => this.setState({ addName })} />
            </Item>
            <Item floatingLabel last>
              <Label>Phone no</Label>
              <Input
                keyboardType="numeric"
                onChangeText={addPhone => this.setState({ addPhone })}
              />
            </Item>
            <Button
              full
              style={styles.button}
              onPress={() =>
                this.addContact(this.state.addName, this.state.addPhone)
              }
            >
              <Text>Save Contact</Text>
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
    backgroundColor: "#3EC4CA",
    marginTop: 30,
    borderRadius: 10
  }
});
