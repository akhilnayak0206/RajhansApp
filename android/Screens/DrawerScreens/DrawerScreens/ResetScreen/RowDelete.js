import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Icon,
  Button,
  Header,
  Container,
  Left,
  Right,
  Title,
  List,
  ListItem,
  Body
} from "native-base";
import firebase from "react-native-firebase";

const styles = StyleSheet.create({
  row: {
    padding: 0
  }
});

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.row}>
        <List>
          <ListItem>
            <Left>
              <Body>
                <Text>
                  Name: {this.props.screenProps.data["Name"]} {"\n"}
                </Text>
                <Text>
                  Amount: {this.props.screenProps.data["Amount"]} {"\n"}
                </Text>
                <Text>
                  Date: {this.props.screenProps.data["Date"]} {"\n"}{" "}
                </Text>
                <Text>Type: {this.props.screenProps.data["Type"]} </Text>
              </Body>
            </Left>
            <Right />
          </ListItem>
        </List>
      </View>
    );
  }
}

export default Row;
