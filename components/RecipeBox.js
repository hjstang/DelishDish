import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Typography from "../styles/typography";

export default class RecipeBox extends Component {
  render() {
    const {recipe} = this.props;

    return (
        <View>
          <Image style={styles.image} source={require("../assets/burger.png")} />
          <Text style={[Typography.FONT_SMALL_BLACK, styles.text]}> {recipe.title} </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 105,
    width: 152,
    overflow: "hidden",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },

  text: {
    marginLeft: 5,
    marginVertical: 7
  }
});
