import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class Ingredient extends Component {
  render() {
    return (
      <View style={styles.ingredient}>
        <Text> {this.props.quantity} {this.props.measure} </Text>
        <Text> {this.props.name} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ingredient: {
    flexDirection: "row",
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    width: 320,
    marginTop: 10,
  }
});
