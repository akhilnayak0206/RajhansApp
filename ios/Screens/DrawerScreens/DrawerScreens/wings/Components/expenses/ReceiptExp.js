import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Header,
  Container,
  Left,
  Right,
  Title,
  List,
  ListItem,
  Body,
  Content,
  Card,
  CardItem,
  Text,
  Form,
  Item,
  Input,
  Label,
  Textarea
} from "native-base";

export default class ReceiptExp extends React.Component {
  constructor(props) {
    super(props);
  }

  check = prop => {
    if (prop.length > 0) {
      return prop;
    } else {
      return "No Description.";
    }
  };

  render() {
    const receipt = this.props.navigation.getParam("receipt", "");

    return (
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
          full
        >
          <Text>Go Back</Text>
        </Button>
        <Form style={styles.form}>
          <Item stackedLabel>
            <Label>Title: </Label>
            <Input disabled placeholder={receipt["Title"]} />
          </Item>
          <Item stackedLabel>
            <Label>Time-Stamp: </Label>
            <Textarea
              disabled
              rowSpan={3}
              bordered
              placeholder={receipt["timestamp"].toString()}
            />
          </Item>
          <Item stackedLabel>
            <Label>Amount: </Label>
            <Input disabled placeholder={receipt["Amount"]} />
          </Item>
          <Item stackedLabel>
            <Label>Name: </Label>
            <Input disabled placeholder={receipt["Collected"]} />
          </Item>
          <Item stackedLabel>
            <Label>Description: </Label>
            <Textarea
              disabled
              rowSpan={3}
              bordered
              placeholder={this.check(receipt["Description"])}
            />
          </Item>
        </Form>
        <Button style={styles.buttonD} danger full>
          <Text>Delete</Text>
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3EC4CA",
    padding: 5
  },
  buttonD: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5
  },
  form: {
    flex: 1
  }
});
