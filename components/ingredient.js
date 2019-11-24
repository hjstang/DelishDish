import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Colors from "../styles/colors";
import * as Typography from "../styles/typography";

export default class Ingredient extends Component {
  render() {
    return (
      <View style={styles.ingredient}>
        <Text style={Typography.FONT_REGULAR_GREY}> {this.props.quantity} {this.props.measure} </Text>
        <Text style={Typography.FONT_REGULAR_GREY}> {this.props.name} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ingredient: {
    flexDirection: "row",
    borderBottomColor: Colors.GREY,
    borderBottomWidth: 1,
    width: 320,
    marginTop: 10,
  }
});
