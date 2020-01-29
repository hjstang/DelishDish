import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity
} from "react-native";
import Tag from "./Tag";
import Ingredient from "./Ingredient";
import * as Typography from "../styles/typography";
import * as Colors from "../styles/colors";
import { deleteRecipe, editRecipe } from "../store/actions/recipeActions";
import { connect } from "react-redux";
import ReturnButton from "./ReturnButton";
import { getScreenWidth } from "../utils/sizing";
import Icon from "react-native-vector-icons/MaterialIcons";

/*
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
      mealTypes: [],
      favorited: false,
      sourceUrl: ""
 */

class Recipe extends Component {


  render() {
    const { navigation } = this.props;
    const recipe = navigation.state.params.recipe.item;
    console.log(recipe);

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
            <Image source={require("../assets/images/burger.png")} />
            <View style={styles.returnButton}>
              <ReturnButton navigation={navigation} />
            </View>
            <View style={styles.infoBox}>
              <Text style={[Typography.FONT_H1_BLACK, { marginVertical: 5 }]}>
                {recipe.title}
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name={"restaurant-menu"}
                    size={25}
                    color={Colors.GREY}
                  />
                  <Text style={Typography.FONT_REGULAR_GREY}>
                    {recipe.difficulty}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Icon name={"room-service"} size={25} color={Colors.GREY} />
                  <Text style={Typography.FONT_REGULAR_GREY}>
                    {"Servings " + recipe.servings}
                  </Text>
                </View>
                <TouchableOpacity>
                  {recipe.favorited ? (
                    <Icon name={"favorite"} size={25} color={Colors.GREEN} />
                  ) : (
                    <Icon
                      name={"favorite-outline"}
                      size={25}
                      color={Colors.GREY}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.ingredients}>
                <Text style={Typography.FONT_H3_BLACK_BOLD}>Ingredients</Text>
                {ingredientsList}
              </View>
              <View styling={styles.description}>
                <Text style={Typography.FONT_H3_BLACK_BOLD}>Description</Text>
                <Text style={Typography.FONT_REGULAR_BLACK_THIN}>
                  {recipe.description}
                </Text>
              </View>
              <View
                style={[
                  styles.tags,
                  {
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    width: getScreenWidth()
                  }
                ]}
              >
                {recipe.cuisine ? (
                  <Tag text={recipe.cuisine} type={Colors.CUISINE} />
                ) : null}
                {recipe.mealTypes
                  ? recipe.mealTypes.map(tag => (
                      <Tag text={tag} type={Colors.MEAL_TYPE} />
                    ))
                  : null}
                {recipe.dishTypes
                  ? recipe.dishTypes.map(tag => (
                      <Tag text={tag} type={Colors.DISH_TYPE} />
                    ))
                  : null}
                {recipe.healthTypes
                  ? recipe.healthTypes.map(tag => (
                      <Tag text={tag} type={Colors.HEALTH_TYPE} />
                    ))
                  : null}
                <Tag text={"South East Asian"} type={Colors.CUISINE} />
                <Tag text={"Keto-friendly"} type={Colors.HEALTH_TYPE} />
                <Tag text={"Pescatarian"} type={Colors.DISH_TYPE} />
              </View>
              <Text
                style={[Typography.FONT_REGULAR_DARKGREY_BOLD, styles.url]}
                onPress={() => Linking.openURL(recipe.sourceUrl)}
              >
                {recipe.sourceUrl}
              </Text>
              <TouchableOpacity>
                <Text>Edit dish</Text>
              </TouchableOpacity>
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
  info: {},
  ingredients: { marginTop: 70, marginBottom: 10 },
  description: {},
  tags: { marginTop: 10 },
  url: { marginTop: 10, alignSelf: "center" },
  returnButton: {
    position: "absolute",
    marginTop: 40
  }
});
