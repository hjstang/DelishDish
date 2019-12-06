import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Keyboard, FlatList
} from "react-native";
import Recipe from "../components/recipe";
import config from "../backend/apiConfig";
import * as Typography from "../styles/typography";
import * as Colors from "../styles/colors";
import { TouchableWithoutFeedback } from "react-native-web";
import RecipesView from "../components/recipesView";
import ApiRecipe from "../components/ApiRecipe";
import ApiRecipesView from "../components/ApiRecipesView";
import CategoryBox from "../components/CategoryBox";
import CategoriesView from "../components/CategoriesView";

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      searchResult: null,
      searched: false
    };
  }

  updateSearchText = searchWord => {
    this.setState({ searchWord });
  };

  async getRecipeByMealType(mealType) {
    const response = await fetch(
      `https://api.edamam.com/search?q=dinner&app_id=${config.appId}&app_key=${config.appKey}&to=5&mealtype=${mealType}`
    );
    const responseJson = await response.json();
    responseJson.hits.map(hit => {
      console.log(hit.recipe.label);
    });
  }

  async getApiData(searchWord) {
    const response = await fetch(
      `https://api.edamam.com/search?q=${searchWord}&app_id=${config.appId}&app_key=${config.appKey}&to=5`
    );
    const responseJson = await response.json();
    if (response.ok) {
      const recipes = [];
      responseJson.hits.map(hit => {
        const apiRecipe = hit.recipe;
        /*const ingredientsList = [];
        apiRecipe.ingredients.map(ingredient => {
          const obj = {
            name: ingredient.food,
            quantity: ingredient.quantity,
            measure: ingredient.measure
          };
          ingredientsList.push(obj);
        });*/
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
      this.setState({ searchResult: recipes, searched: true });
    } else {
      this.setState({ searchResult: null, searched: true });
    }
  }

  async getSearchResult(search) {
    Keyboard.dismiss();
    const searchWord = search.toLowerCase();

    if (searchWord == "") {
      this.setState({ searched: false, searchResult: null });
    } else {
      await this.getApiData(searchWord);
    }
  };

  categories = [
    {
      title: "Salad",
      image: require("../assets/salad.jpg")
    },
    {
      title: "Chicken",
      image: require("../assets/salad.jpg")
    },
    {
      title: "Soup",
      image: require("../assets/salad.jpg")
    },
    {
      title: "Fish",
      image: require("../assets/salad.jpg")
    },
    {
      title: "Wok",
      image: require("../assets/salad.jpg")
    }
  ];

  render() {
    const { navigation } = this.props;
    //const dinnerre = this.getRecipeByMealType("Dinner");
    //const test = this.getSearchResult();
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={[Typography.FONT_H3_GREEN, { alignSelf: "center" }]}>
            Delish Dish
          </Text>
          <View style={{ width: 340 }}>
            <View style={{ marginVertical: 15 }}>
              <Text style={Typography.FONT_H1_BLACK}>Explore New Recipes </Text>
            </View>
            <TextInput
              style={[Typography.FONT_INPUT, styles.textInput]}
              placeholder="Search.."
              onChangeText={this.updateSearchText}
              value={this.state.searchWord}
              onSubmitEditing={() => this.getSearchResult(this.state.searchWord)}
            />
            {this.state.searchResult ? (
              <ApiRecipesView
                recipes={this.state.searchResult}
                navigation={navigation}
              />
            ) : this.state.searched ? (
              <Text>No result</Text>
            ) : (
                <View>
                  <FlatList
                      data={this.categories}
                      numColumns={2}
                      renderItem={({ item }) => (
                          <TouchableOpacity
                              style={styles.button}
                              activeOpacity={0.1}
                              onPress={() => {
                                this.setState({searchWord: item.title});
                                this.getSearchResult(item.title);
                              }}
                          >
                            <CategoryBox category={item} />
                          </TouchableOpacity>
                      )}
                      keyExtractor={item => item.title}
                  />
                </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginLeft: 17,
    flexGrow: 1,
    marginTop: 50,
    marginBottom: 20
  },
  textInput: {
    height: 42,
    backgroundColor: Colors.LIGHTGREY,
    borderRadius: 5,
    paddingLeft: 10
  },
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
