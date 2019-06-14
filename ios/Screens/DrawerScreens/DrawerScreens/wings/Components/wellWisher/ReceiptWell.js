import React from "react";
import { Text, View, StyleSheet, CameraRoll } from "react-native";
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

export default class Receipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: "",
      visible: false,
      newUri: "",
      imageBase64: "",
      topText: "aaa"
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
    return (
      <View style={styles.container}>
        <Button
          style={styles.buttonBack}
          full
          onPress={() => {
            this.props.navigation.navigate("ScrollViewWell");
          }}
        >
          <Text>Go Back</Text>
        </Button>
        <ImageBackgroundReceipt screenProps={{ receipt: { ...receipt } }} />
        <Button style={styles.button} full>
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
  },
  buttonBack: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3EC4CA"
  }
});
