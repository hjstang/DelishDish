import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import * as Typography from "../styles/typography";

export default class CategoryBox extends Component {
  render() {
    const { category } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={category.image}>
          <View style={styles.textBox}>
            <Text style={[Typography.FONT_REGULAR_WHITE, styles.text]}>
              {category.title}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.overlay} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  image: {
    height: "100%",
    width: "100%"
  },

  text: {
    textAlign: "center"
  },
  overlay: {
    backgroundColor: "#000000"
  },
  textBox: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});
