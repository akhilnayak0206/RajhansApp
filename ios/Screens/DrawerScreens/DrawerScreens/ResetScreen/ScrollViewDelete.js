import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "native-base";
import * as firebase from "firebase";
import "@firebase/firestore";
import Row from "./RowDelete";

export default class ScrollViewDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: []
    };
  }

  getData = () => {
    var data = [];
    firebase
      .firestore()
      .collection("deleteReset")
      .get()
      .then(query => {
        query.forEach(doc => {
          data.push(doc.data());
        });
        data.sort((a, b) => {
          return b.sortDate - a.sortDate;
        });
        this.setState({
          datas: data
        });
      })
      .catch(function(error) {
        alert("Error getting document");
      });
  };
  componentWillMount() {
    this.getData();
  }
  row = () => {};

  render() {
    var i = 0;
    return (
      <ScrollView>
        {this.state.datas.map(data => {
          if (data.Name.length > 1) {
            return <Row screenProps={{ data: { ...data } }} key={i++} />;
          }
        })}
      </ScrollView>
    );
  }
}
