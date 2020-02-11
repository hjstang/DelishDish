import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  FlatList,
  ActivityIndicator
} from "react-native";
import config from "../backend/apiConfig";
import * as Typography from "../styles/typography";
import * as Colors from "../styles/colors";
import { TouchableWithoutFeedback } from "react-native-web";
import ApiRecipesView from "../components/ApiRecipesView";
import CategoryBox from "../components/CategoryBox";
import { getBoxWidth, getScreenWidth } from "../utils/sizing";

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      searchResult: null,
      searched: false,
      isLoading: false
    };
  }

  updateSearchText = searchWord => {
    this.setState({ searchWord });
  };

  async getApiData(searchWord) {
    const response = await fetch(
      `https://api.edamam.com/search?q=${searchWord}&app_id=${config.appId}&app_key=${config.appKey}&to=5`
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
      this.setState({
        searchResult: recipes,
        searched: true,
        isLoading: false
      });
    } else {
      this.setState({ searchResult: null, searched: true, isLoading: false });
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
  }

  categories = [
    {
      title: "Salad",
      image: require("../assets/images/salad.jpg")
    },
    {
      title: "Chicken",
      image: require("../assets/images/chicken.jpg")
    },
    {
      title: "Soup",
      image: require("../assets/images/soup.jpg")
    },
    {
      title: "Fish",
      image: require("../assets/images/fish.jpg")
    },
    {
      title: "Wok",
      image: require("../assets/images/wok.jpg")
    },
    {
      title: "Pasta",
      image: require("../assets/images/pasta.jpg")
    }
  ];

  render() {
    const { navigation } = this.props;
    const screenWidth = getScreenWidth();

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={[Typography.FONT_H3_GREEN, { alignSelf: "center" }]}>
            Delish Dish
          </Text>
          <View style={{ width: screenWidth * 0.9 }}>
            <View style={{ marginVertical: 15, marginLeft: 5 }}>
              <Text style={Typography.FONT_H1_BLACK}>Explore New Recipes </Text>
            </View>
            <TextInput
              style={[Typography.FONT_INPUT, styles.textInput]}
              placeholder="Search.."
              onChangeText={this.updateSearchText}
              value={this.state.searchWord}
              onSubmitEditing={() =>
                this.getSearchResult(this.state.searchWord)
              }
            />
            {this.state.searchResult ? (
              <ApiRecipesView
                recipes={this.state.searchResult}
                navigation={navigation}
                screenWidth={screenWidth}
              />
            ) : this.state.searched ? (
              <Text>No result</Text>
            ) : !this.state.isLoading ? (
              <View>
                <FlatList
                  data={this.categories}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { width: getBoxWidth(screenWidth) }
                      ]}
                      activeOpacity={0.1}
                      onPress={async () => {
                        navigation.navigate("ApiCategorySearch", {
                          category: item.title
                        });
                      }}
                    >
                      <CategoryBox category={item} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.title}
                />
              </View>
            ) : (
              <ActivityIndicator />
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
    alignItems: "center",
    flexGrow: 1,
    marginTop: 50,
    marginBottom: 20
  },
  textInput: {
    height: 42,
    backgroundColor: Colors.LIGHTGREY,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    marginHorizontal: 5
  },
  button: {
    height: 138,
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
