import React, { Component } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import RecipeBox from "./RecipeBox";
import * as Colors from "../styles/colors";

function getBoxWidth(screenWidth) {
  return (screenWidth * 0.9 - 20) / 2;
}

export default class ApiRecipesView extends Component {
  render() {
    const { recipes, navigation, screenWidth } = this.props;

    return (
      <View>
        {recipes ? (
          <FlatList
            data={recipes}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.button, { width: getBoxWidth(screenWidth) }]}
                activeOpacity={0.1}
                onPress={() => {
                  navigation.navigate("ApiRecipe", { recipe: { item } });
                  console.log(item.title);
                }}
              >
                <RecipeBox recipe={item} />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <ActivityIndicator size="small" color="#000000" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 138,
    marginVertical: 5,
    marginHorizontal: 5,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 1.65,
    elevation: 8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  }
});
