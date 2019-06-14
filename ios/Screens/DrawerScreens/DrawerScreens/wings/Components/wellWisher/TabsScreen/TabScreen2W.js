import React, { Component } from "react";
import { View, StyleSheet, Text, Keyboard } from "react-native";
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
import Expo, { Permissions, Contacts, ImagePicker } from "expo";

export default class TabScreen2W extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addName: "",
      addPhone: ""
    };
  }

  async showFirstContactPermissionAsync() {
    // Ask for permission to query contacts.
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
    console.log(permission);
    if (permission.status !== "granted") {
      alert("Please grant the permission for adding contact");
    }
  }

  async addContact(name, phone) {
    Keyboard.dismiss();
    await this.showFirstContactPermissionAsync();
    const contact = {
      [Contacts.Fields.FirstName]: "RajhansApp",
      [Contacts.Fields.LastName]: name,
      [Contacts.Fields.PhoneNumbers]: [{ label: "mobile", number: phone }]
    };

    if (phone.length === 10) {
      if (name.length > 2) {
        try {
          const contactId = await Contacts.addContactAsync(contact);
          if (contactId) {
            alert("Contact Saved.");
          } else {
            alert("Contact not saved.");
          }
        } catch (err) {
          alert("Contact not Saved");
        }
      } else {
        alert("Name should be greater than 2 character");
      }
    } else {
      alert("Phone number not valid.");
    }
  }

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
  },
  buttonBack: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3EC4CA"
  }
});
