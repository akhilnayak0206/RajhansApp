import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Icon, Button } from "native-base";

import Row from "./Row";

export default class ScrollViewWell extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var i = 0;
    return (
      <View style={{ flex: 1 }}>
        <Button
          onPress={() => this.props.navigation.navigate("UpdaterScreenWell")}
          style={styles.button}
          full
        >
          <Text>Add Well- Wisher</Text>
        </Button>
        <ScrollView>
          {this.props.screenProps.flats.map(flat => {
            if (flat["Received"] != undefined) {
              return (
                <Row
                  screenProps={{ flat: { ...flat } }}
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
