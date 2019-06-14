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
          <ListItem
            onPress={() =>
              this.props.navigation.navigate("UpdaterScreen", {
                idd: this.props.screenProps.flat["Flatno"],
                wing: this.props.screenProps.wing
              })
            }
          >
            <Left>
              <Body>
                <Text>
                  Flat no: {this.props.screenProps.flat["Flatno"]} {"\n"}
                </Text>
                <Text>Amount: {this.props.screenProps.flat["Amount"]} </Text>
              </Body>
            </Left>
            <Right>
              <Button
                transparent
                onPress={() =>
                  this.props.navigation.navigate("UpdaterScreen", {
                    idd: this.props.screenProps.flat["Flatno"],
                    wing: this.props.screenProps.wing
                  })
                }
              >
                <Right>
                  <Text>View</Text>
                </Right>
              </Button>
            </Right>
          </ListItem>
        </List>
      </View>
    );
  }
}

export default Row;
