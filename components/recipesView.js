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

export default class RecipesView extends Component {

  render() {
    const { recipes, navigation } = this.props;

    return (
      <View>
        {recipes ? (
          <FlatList
            data={recipes}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.1}
                onPress={() => {
                  navigation.navigate("Recipe", {recipe: {item}});
                  console.log(item.title);
                }}
              >
                <RecipeBox recipe={item}/>
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
    width: 152,
    margin: 5,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
});
