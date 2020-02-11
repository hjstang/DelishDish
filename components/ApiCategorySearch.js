import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import * as Typography from "../styles/typography";
import * as Colors from "../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getScreenWidth } from "../utils/sizing";
import ApiRecipesView from "./ApiRecipesView";
import config from "../backend/apiConfig";

class ApiCategorySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.navigation.state.params.category,
      searchResult: null,
      loading: true
    };
  }

  componentDidMount = async () => {
    const recipes = await this.getCategorySearchResults(this.state.category);

    this.setState({ searchResult: recipes, loading: false });
  };

  async getCategorySearchResults(search) {
    const searchWord = search.toLowerCase();

    const response = await fetch(
      `https://api.edamam.com/search?q=${searchWord}&app_id=${config.appId}&app_key=${config.appKey}&to=10`
    );
    const responseJson = await response.json();
    if (response.ok) {
      const recipes = [];
      responseJson.hits.map(hit => {
        const apiRecipe = hit.recipe;
        const recipe = {
          id: apiRecipe.uri,
          title: apiRecipe.label,
          imageUrl: apiRecipe.image,
          servings: apiRecipe.yield,
          sourceUrl: apiRecipe.url,
          ingredients: apiRecipe.ingredientLines,
          healthTypes: apiRecipe.healthLabels.concat(apiRecipe.dietLabels)
        };
        recipes.push(recipe);
      });
      return recipes;
    } else {
      return null;
    }
  }

  render() {
    const { navigation } = this.props;
    const screenWidth = getScreenWidth();
    console.log(this.state.searchResult);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ width: screenWidth * 0.9 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.goBackButton}
            >
              <Icon name={"chevron-left"} size={40} />
            </TouchableOpacity>
            <Text style={[Typography.FONT_H3_GREEN, { alignSelf: "center" }]}>
              Delish Dish
            </Text>
          </View>
          <View style={{ width: screenWidth * 0.9 }}>
            <View
              style={{
                marginVertical: 15,
                marginLeft: 5,
                flexDirection: "row"
              }}
            >
              <Text style={Typography.FONT_H1_BLACK}>Explore </Text>
              <Text style={Typography.FONT_H1_GREEN}>
                {this.state.category}
              </Text>
            </View>
          </View>
          <View style={{ width: screenWidth * 0.9, flex: 1 }}>
            {this.state.searchResult ? (
              <ApiRecipesView
                recipes={this.state.searchResult}
                navigation={navigation}
                screenWidth={screenWidth}
              />
            ) : this.state.loading ? (
              <ActivityIndicator />
            ) : (
              <View>
                <Text style={[Typography.FONT_H3_BLACK, styles.noRecipes]}>
                  You don't have any recipes {"\n"} in this category yet...
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ApiCategorySearch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexGrow: 1,
    marginTop: 50,
    marginBottom: 0
  },
  textInput: {
    height: 42,
    marginHorizontal: 5,
    backgroundColor: Colors.LIGHTGREY,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20
  },
  goBackButton: {
    position: "absolute",
    marginTop: -10,
    marginLeft: -5
  },
  noRecipes: {
    textAlign: "center",
    marginTop: 150
  }
});
