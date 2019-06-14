import React from "react";
import { Text, View, StyleSheet, CameraRoll } from "react-native";
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
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import ImageBackgroundReceipt from "./ImageBackgroundReceipt";
import RNFS from "react-native-fs";

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

  snapShot = () => {
    this.refs.viewShot.capture().then(uri => {
      this.setState({
        uri: uri
      });
      CameraRoll.saveToCameraRoll(this.state.uri).then(ur => {
        console.log("save");
        CameraRoll.getPhotos({ first: 3 }).then(f => {
          var k = f.edges[0].node.image.uri;
          console.log(k);
          this.setState({
            newUri: k
          });
          console.log(this.state.uri);
          console.log(this.state.newUri);
          this.onShare();
        });
      });
    });
  };

  onShare = () => {
    let shareOptions = {
      title: "Share Receipt",
      message: " Thankyou  ",
      url: this.state.uri,
      subject: "Navratri Receipt" //  for email
    };
    Share.open(shareOptions)
      .then(ans => {})
      .catch(err => {
        console.log(err);
        alert(
          "Sharing Failed.Please check the recent image in files and share from there."
        );
      });
  };

  render() {
    const receipt = this.props.navigation.getParam("receipt", "");
    return (
      <View style={styles.container}>
        <ViewShot
          ref="viewShot"
          options={{ format: "png", quality: 1 }}
          style={{ flex: 1 }}
        >
          <ImageBackgroundReceipt screenProps={{ receipt: { ...receipt } }} />
        </ViewShot>
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
