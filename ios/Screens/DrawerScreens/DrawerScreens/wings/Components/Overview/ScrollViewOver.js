import React from "react";
import { ScrollView } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right
} from "native-base";

export default class ScrollViewOver extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        <Content>
          <List>
            <ListItem>
              <Left>
                <Text>A wing</Text>
              </Left>
              <Right>
                <Text>{this.props.screenProps.wingA}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>B wing</Text>
              </Left>
              <Right>
                <Text>{this.props.screenProps.wingB}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>C wing</Text>
              </Left>
              <Right>
                <Text>{this.props.screenProps.wingC}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>D wing</Text>
              </Left>
              <Right>
                <Text>{this.props.screenProps.wingD}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>E wing</Text>
              </Left>
              <Right>
                <Text>{this.props.screenProps.wingE}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Well - Wishers</Text>
              </Left>
              <Right>
                <Text>{this.props.screenProps.wellWishers}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Total Collected</Text>
              </Left>
              <Right>
                <Text>{this.props.screenProps.total}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Expenses</Text>
              </Left>
              <Right>
                <Text>{this.props.screenProps.expenses}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Cash In-Hand</Text>
              </Left>
              <Right>
                <Text>
                  {this.props.screenProps.total -
                    this.props.screenProps.expenses}
                </Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </ScrollView>
    );
  }
}
