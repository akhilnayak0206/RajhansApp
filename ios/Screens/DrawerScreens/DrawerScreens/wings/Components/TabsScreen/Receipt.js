import React from "react";
import { Text, View, StyleSheet, Share, CameraRoll } from "react-native";
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
import ImageBackgroundReceipt from "./ImageBackgroundReceipt";
import { takeSnapshotAsync } from "expo";

export default class Receipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: "",
      visible: false,
      newUri: ""
    };
  }

  snapShot = async () => {
    let result = await takeSnapshotAsync(this.viewRef, {
      format: "png",
      result: "tmpfile"
    });
    let saveResult = await CameraRoll.saveToCameraRoll(result, "photo");
    this.setState({ newUri: saveResult });
    this.onShare();
  };

  onShare = () => {
    Share.share({
      message: "Thank You",
      url: this.state.newUri
    });
  };

  render() {
    const receipt = this.props.navigation.getParam("receipt", "");
    const flatNo = this.props.navigation.getParam("flatNo", "");
    return (
      <View style={styles.container}>
        <ImageBackgroundReceipt
          screenProps={{ receipt: { ...receipt }, flatNo: flatNo }}
          ref={r => (this.viewRef = r)}
        />
        <Button
          style={styles.button}
          full
          onPress={() => {
            this.snapShot();
          }}
        >
          <Text>Share</Text>
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
  container: {
    flex: 1
  }
});
