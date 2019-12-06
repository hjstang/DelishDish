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
import CategoryBox from "./CategoryBox";

export default class CategoriesView extends Component {
  render() {
    const { categories, navigation } = this.props;
    console.log(categories);

    return (
      <View>
        <FlatList
          data={categories}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.1}
              onPress={() => {
                console.log(item.title);
              }}
            >
              <CategoryBox category={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.title}
        />
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
  }
});
