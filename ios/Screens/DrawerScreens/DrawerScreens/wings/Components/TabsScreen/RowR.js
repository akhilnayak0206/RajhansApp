import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
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

const styles = StyleSheet.create({
  row: {
    padding: 0
  }
});

export default class RowR extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.row}>
        <List>
          <ListItem
            onPress={() =>
              this.props.navigation.navigate("Receipt", {
                flatNo: this.props.screenProps.flatNo,
                wing: this.props.screenProps.wing,
                receipt: this.props.screenProps.receipt
              })
            }
          >
            <Left>
              <Body>
                <Text>
                  Name: {this.props.screenProps.receipt["Received"]} {"\n"}
                </Text>
                <Text>Amount: {this.props.screenProps.receipt["Amount"]} </Text>
              </Body>
            </Left>
            <Right />
          </ListItem>
        </List>
      </View>
    );
  }
}
