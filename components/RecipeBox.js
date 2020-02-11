import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Typography from "../styles/typography";

export default class RecipeBox extends Component {
  render() {
    const { recipe } = this.props;

    return (
      <View>
        <View style={styles.image}>
          <Image
            style={{ height: 95, width: "100%" }}
            source={{ uri: recipe.imageUrl }}
          />
        </View>
        <Text style={[Typography.FONT_SMALL_BLACK, styles.text]}>
          {recipe.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    overflow: "hidden",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  text: {
    marginHorizontal: 5,
    marginVertical: 7,
    overflow: "hidden"
  }
});
