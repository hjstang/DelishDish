import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Typography from "../styles/typography";

export default class Tag extends Component {
  render() {
    return (
      <View style={[styles.tag, { backgroundColor: this.props.type }]}>
        <Text style={[Typography.FONT_REGULAR_WHITE_BOLD, styles.text]}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: "center"
  },
  text: {
    alignSelf: "center",
    marginHorizontal: 20,
    textAlign: "center",
    justifyContent: "center"
  }
});
