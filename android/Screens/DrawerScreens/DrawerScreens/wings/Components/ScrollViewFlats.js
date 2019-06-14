import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Icon, Button } from "native-base";

import Row from "./Row";

export default class ScrollViewFlats extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        {this.props.screenProps.flats.map(flat => (
          <Row
            screenProps={{
              flat: { ...flat },
              wing: this.props.screenProps.wing
            }}
            key={flat["Flatno"]}
            navigation={this.props.navigation}
          />
        ))}
      </ScrollView>
    );
  }
}
