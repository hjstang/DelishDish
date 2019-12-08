import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking
} from "react-native";
import Tag from "./Tag";
import Ingredient from "./Ingredient";
import * as Typography from "../styles/typography";
import { deleteRecipe, editRecipe } from "../store/actions/recipeActions";
import { connect } from "react-redux";
import ReturnButton from "./ReturnButton";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      title: " Blue Cheese Burger",
      id: "",
      difficulty: "Easy",
      servings: 0,
      ingredients: [],
      description:
        "This is the description of the Blue Cheese Burger. It is supereasy to make",
      cuisine: "",
      dishTypes: [],
      healthTypes: [],
      favorited: false,
      sourceUrl: ""
    };
  }

  render() {
    const { navigation } = this.props;
    const recipe = navigation.state.params.recipe;
    const createdNow = navigation.state.params.createdNow;

    const ingredientsList = recipe.ingredients.map(ingredient => {
      return (
        <Ingredient
          name={ingredient.name}
          measure={ingredient.measure}
          quantity={ingredient.quantity}
        />
      );
    });

    return (
      <View style={styles.container}>
        {recipe ? (
          <ScrollView
            scontentContainerStyle={{
              flexGrow: 1
            }}
          >
            <Image source={require("../images/assets/burger.png")} />
            {!createdNow ? (
              <View style={styles.returnButton}>
                <ReturnButton navigation={navigation} />
              </View>
            ) : null}
            <View style={styles.infoBox}>
              <Text style={[Typography.FONT_H1_BLACK, { marginVertical: 5 }]}>
                {recipe.title}
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <Image source={require("../assets/menu/explore.png")} />
                  <Text style={Typography.FONT_REGULAR_GREY}>
                    {recipe.difficulty}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Image source={require("../assets/menu/explore.png")} />
                  <Text style={Typography.FONT_REGULAR_GREY}>
                    {recipe.servings}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.ingredients}>
                <Text style={Typography.FONT_H3_BLACK_BOLD}>Ingredients</Text>
                {ingredientsList}
              </View>
              <View styling={styles.description}>
                <Text style={Typography.FONT_H3_BLACK_BOLD}>Description</Text>
                <Text style={Typography.FONT_REGULAR_BLACK}>
                  {recipe.description}
                </Text>
              </View>
              <View style={styles.tags}>
                <Tag text={"Burger"} type={"#FFB6C3"} />
              </View>
              <Text
                style={[Typography.FONT_REGULAR_DARKGREY_BOLD, styles.url]}
                onPress={() => Linking.openURL(recipe.sourceUrl)}
              >
                {recipe.sourceUrl}
              </Text>
            </View>
          </ScrollView>
        ) : (
          <Text> No recipe to show </Text>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteRecipe: recipeId => dispatch(deleteRecipe(recipeId)),
    editRecipe: (recipeId, recipeChanges) =>
      dispatch(editRecipe(recipeId, recipeChanges))
  };
};

export default connect(null, mapDispatchToProps)(Recipe);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  infoBox: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 325,
    height: 125,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250,
    alignSelf: "center"
  },
  info: {
    marginHorizontal: 20,
    justifyContent: "center"
  },
  ingredients: { marginTop: 70, marginBottom: 10 },
  description: {},
  tags: { marginTop: 10 },
  url: { marginTop: 10, alignSelf: "center" },
  returnButton: {
    position: "absolute",
    marginTop: 40
  }
});
