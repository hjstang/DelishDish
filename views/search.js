import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "../components/LoginScreen";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

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

function searchBySearchWord(recipes, searchWord) {
  if (!recipes) {
    return [];
  }
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
  return resultRecipes;
}

class Search extends Component {
  render() {
    const { auth, recipes } = this.props;
    return (
      <View style={styles.container}>
        {auth.uid ? (
            <Text>User logged in</Text>
        ) : (
          <LoginScreen />
        )}
      </View>
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
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
