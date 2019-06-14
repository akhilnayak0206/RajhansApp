import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView
} from "react-native";
import { Container, Button, Item, Input } from "native-base";

let width = Dimensions.get("window").width;
let size = width / 18;

export default class ImageBackgroundReceipt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        imageStyle={{ resizeMode: "stretch" }}
        style={styles.backgroundImage}
        source={require("../Images/RECEIPT.png")}
      >
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={styles.textHead}>
              Flat No.: {this.props.screenProps.flatNo}
            </Text>
            <Text style={[styles.textHead, { right: 10 }]}>
              Date:{this.props.screenProps.receipt["Date"]}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.textHead}>Received from:</Text>
            <Text style={styles.textBold}>
              {this.props.screenProps.receipt["Received"]}
              {"\n"}
            </Text>
            <Text style={styles.textHead}>We ThankYou for your</Text>
            <Text style={styles.textHead}>contribution of</Text>
            <Text style={styles.textBold}>
              Rs{this.props.screenProps.receipt["Amount"]}/-{"\n"}
            </Text>
            <Text style={styles.textHead}>Collected by:</Text>
            <Text style={styles.textBold}>
              {this.props.screenProps.receipt["Collected"]}
            </Text>
          </View>
          {/*<Text style={{bottom:10}}>
                                      This is the 50th year of the celebration of Navrartri in NAVRAJHANS CHS.If
                                      you have any doubt or want to donate more can talk to any coordinator of JAI MITRA Mandal.
                                      They will be happy to assist you.Your presence will be appreciated.<Text style={{fontWeight:'bold'}}>JAI MATA DI.</Text>
                                    </Text>*/}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  textBold: {
    color: "black",
    backgroundColor: "transparent",
    fontWeight: "bold",
    fontSize: size,
    fontFamily: "Arial"
  },
  textHead: {
    color: "black",
    backgroundColor: "transparent",
    fontWeight: "bold",
    fontSize: size,
    fontFamily: "Arial"
  },
  backgroundImage: {
    flex: 1,
    height: null,
    width: null
  },
  container: {
    flex: 1,
    top: "20%",
    left: 10
  }
});
