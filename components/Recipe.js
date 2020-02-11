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
import { setFavoriteRecipe } from "../store/actions/recipeActions";
import { connect } from "react-redux";
import ReturnButton from "./ReturnButton";
import { getScreenWidth } from "../utils/sizing";
import Icon from "react-native-vector-icons/MaterialIcons";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: this.props.navigation.state.params.recipe.favorited
    };
  }
  render() {
    const { navigation } = this.props;
    const recipe = navigation.state.params.recipe;
    const createdNow = navigation.state.params.createdNow;

    const ingredientsList = recipe.ingredients.map((ingredient, index) => {
      return (
        <Ingredient
          name={ingredient.name}
          measure={ingredient.measure}
          quantity={ingredient.quantity}
          key={"key" + index}
        />
      );
    });
    const screenWidth = getScreenWidth();

    return (
      <View style={styles.container}>
        {recipe ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1
            }}
          >
            <View>
              <Image
                source={{ uri: recipe.imageUrl }}
                style={{ width: screenWidth, height: 250 }}
              />
              {!createdNow ? (
                <View style={styles.returnButton}>
                  <ReturnButton navigation={navigation} />
                </View>
              ) : null}
            </View>
            <View style={styles.infoBox}>
              <Text style={[Typography.FONT_H1_BLACK, { marginVertical: 5 }]}>
                {recipe.title}
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  {recipe.difficulty ? (
                      <View
                          style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginRight: 10
                          }}
                      >
                          <Icon
                              name={"restaurant-menu"}
                              size={25}
                              color={Colors.GREY}
                          />
                          <Text style={Typography.FONT_REGULAR_GREY}>
                              {recipe.difficulty}
                          </Text>
                      </View>
                  ) : null}
                  {recipe.servings ? (
                      <View
                          style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginRight: 10
                          }}
                      >
                          <Icon name={"room-service"} size={25} color={Colors.GREY} />
                          <Text style={Typography.FONT_REGULAR_GREY}>
                              {" " + recipe.servings}
                          </Text>
                      </View>
                  ) : null}
                <TouchableOpacity
                  onPress={() => {
                    this.props.setFavoriteRecipe(
                      recipe.id,
                      !this.state.favorited
                    );
                    this.setState({ favorited: !this.state.favorited });
                  }}
                >
                  {this.state.favorited ? (
                    <Icon name={"favorite"} size={25} color={Colors.GREEN} />
                  ) : (
                    <Icon
                      name={"favorite-border"}
                      size={25}
                      color={Colors.GREY}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.info,
                { width: screenWidth * 0.9, alignSelf: "center" }
              ]}
            >
              <View style={styles.ingredients}>
                <Text style={Typography.FONT_H3_BLACK_BOLD}>Ingredients</Text>
                {ingredientsList}
              </View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
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
                    alignItems: "flex-start"
                  }
                ]}
              >
                {recipe.cuisine
                  ? recipe.cuisine.map((tag, index) => (
                      <Tag
                        text={tag}
                        type={Colors.CUISINE}
                        key={"key" + index}
                      />
                    ))
                  : null}
                {recipe.mealTypes
                  ? recipe.mealTypes.map((tag, index) => (
                      <Tag
                        text={tag}
                        type={Colors.MEAL_TYPE}
                        key={"key" + index}
                      />
                    ))
                  : null}
                {recipe.dishTypes
                  ? recipe.dishTypes.map((tag, index) => (
                      <Tag
                        text={tag}
                        type={Colors.DISH_TYPE}
                        key={"key" + index}
                      />
                    ))
                  : null}
                {recipe.healthTypes
                  ? recipe.healthTypes.map((tag, index) => (
                      <Tag
                        text={tag}
                        type={Colors.HEALTH_TYPE}
                        key={"key" + index}
                      />
                    ))
                  : null}
              </View>
              <Text
                style={[Typography.FONT_REGULAR_DARKGREY_BOLD, styles.url]}
                onPress={() => Linking.openURL(recipe.sourceUrl)}
              >
                {recipe.sourceUrl}
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  navigation.navigate("EditRecipe", { recipe: recipe });
                }}
              >
                <Text style={Typography.FONT_H3_WHITE}>Edit recipe</Text>
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
    setFavoriteRecipe: (recipeId, favorite) =>
      dispatch(setFavoriteRecipe(recipeId, favorite))
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
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    width: 322,
    height: 125,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 170,
    alignSelf: "center"
  },
  ingredients: { marginTop: 70, marginBottom: 10 },
  tags: { marginTop: 10 },
  url: {
    marginTop: 15,
    marginBottom: 20,
    alignSelf: "center",
    textDecorationLine: "underline"
  },
  returnButton: {
    position: "absolute",
    marginTop: 40
  },
  editButton: {
    width: 140,
    height: 30,
    backgroundColor: Colors.LIGHTGREEN,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 30
  }
});
