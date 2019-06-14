import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";

import Row from "./Row";

export default class ScrollViewExp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var i = 0;
    return (
      <View style={{ flex: 1 }}>
        <Button
          onPress={() => this.props.navigation.navigate("UpdaterScreenExp")}
          style={styles.button}
          full
        >
          <Text>Add Expense</Text>
        </Button>
        <ScrollView>
          {this.props.screenProps.expenses.map(expense => {
            if (expense["Title"] != undefined) {
              return (
                <Row
                  screenProps={{ expense: { ...expense } }}
                  key={i++}
                  navigation={this.props.navigation}
                />
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3EC4CA",
    padding: 5
  }
});
