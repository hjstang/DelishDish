import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Keyboard } from "react-native";
import LoginScreen from "../components/LoginScreen";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import * as Typography from "../styles/typography";
import * as Colors from "../styles/colors";
import RecipesView from "../components/RecipesView";
import { TouchableWithoutFeedback } from "react-native-web";

function searchByMealType(recipes, mealType) {
  if (!recipes) {
    return [];
  }
  const resultRecipes = [];
  recipes.map(recipe => {
    if (recipe.mealTypes.includes(mealType)) {
      resultRecipes.push(recipe);
    }
  });
  return resultRecipes;
}

function searchByDishType(recipes, dishType) {
  if (!recipes) {
    return [];
  }
  const resultRecipes = [];
  recipes.map(recipe => {
    if (recipe.dishTypes.includes(dishType)) {
      resultRecipes.push(recipe);
    }
  });
  return resultRecipes;
}

function searchBySearchWord(recipes, searchWordOriginal) {
  if (!recipes) {
    return [];
  }
  const searchWord = searchWordOriginal.toLowerCase();
  const resultRecipes = [];
  recipes.map(recipe => {
    if (recipe.title.toLowerCase().includes(searchWord)) {
      resultRecipes.push(recipe);
    } else if (recipe.cuisine.toLowerCase().includes(searchWord)) {
      resultRecipes.push(recipe);
    } else if (recipe.description.toLowerCase().includes(searchWord)) {
      resultRecipes.push(recipe);
    } else if (
      recipe.ingredients.some(ingredient =>
        ingredient.name.toLowerCase().includes(searchWord)
      )
    ) {
      resultRecipes.push(recipe);
    } else if (
      recipe.dishTypes.some(tag => tag.toLowerCase().includes(searchWord))
    ) {
      resultRecipes.push(recipe);
    } else if (
      recipe.healthTypes.some(tag => tag.toLowerCase().includes(searchWord))
    ) {
      resultRecipes.push(recipe);
    } else if (
      recipe.mealTypes.some(tag => tag.toLowerCase().includes(searchWord))
    ) {
      resultRecipes.push(recipe);
    }
  });

  if (resultRecipes.length < 1) {
    return null;
  }
  return resultRecipes;
}

class Search extends Component {
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

  getSearchResult() {
    Keyboard.dismiss();
    const searchWord = this.state.searchWord;

    if (searchWord == "") {
      this.setState({ searched: false, searchResult: null });
    } else {
      const searchResult = searchBySearchWord(this.props.recipes, searchWord);
      this.setState({ searched: true, searchResult });
    }
  }

  render() {
    const { auth, recipes, navigation } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {auth.uid ? (
            <View>
              <Text style={[Typography.FONT_H3_GREEN, { alignSelf: "center" }]}>
                Delish Dish
              </Text>
              <View style={{ width: 340 }}>
                <View style={{ marginVertical: 15 }}>
                  <Text style={Typography.FONT_H1_BLACK}>Your Cookbook </Text>
                </View>
                <TextInput
                  style={[Typography.FONT_INPUT, styles.textInput]}
                  placeholder="Search.."
                  onChangeText={this.updateSearchText}
                  value={this.state.searchWord}
                  onSubmitEditing={() => this.getSearchResult()}
                />
                {this.state.searchResult ? (
                  <RecipesView
                    recipes={this.state.searchResult}
                    navigation={navigation}
                  />
                ) : this.state.searched ? (
                  <Text>No result</Text>
                ) : (
                  <Text>Show categories</Text>
                )}
              </View>
            </View>
          ) : (
            <LoginScreen />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    recipes: state.firestore.ordered["userRecipes"]
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) {
      return [];
    }
    return [
      {
        collection: "recipes",
        storeAs: "userRecipes",
        where: [["authorId", "==", props.auth.uid]]
      }
    ];
  })
)(Search);

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
  }
});
