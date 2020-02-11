import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking,
  Dimensions
} from "react-native";
import Tag from "./Tag";
import * as Typography from "../styles/typography";
import ReturnButton from "./ReturnButton";
import * as Colors from "../styles/colors";
import { getScreenWidth } from "../utils/sizing";
import Icon from "react-native-vector-icons/MaterialIcons";

class ApiRecipe extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      title: " Blue Cheese Burger",
      id: "",
      servings: 0,
      ingredients: [],
      healthTypes: [],
      sourceUrl: ""
    };
  }*/

  render() {
    const { navigation } = this.props;
    const recipe = navigation.state.params.recipe.item;

    const ingredientsList = recipe.ingredients.map(ingredient => {
      return (
        <View style={styles.ingredient} key={ingredient}>
          <Text style={Typography.FONT_REGULAR_GREY}> {ingredient} </Text>
        </View>
      );
    });

    const tagList = recipe.healthTypes.map(type => {
      return <Tag text={type} type={"#FFB6C3"} />;
    });

    const screenWidth = getScreenWidth();

    return (
      <View style={styles.container}>
        {recipe ? (
          <ScrollView
            scontentContainerStyle={{
              flexGrow: 1
            }}
          >
            <Image
              style={{ width: screenWidth, height: 321 }}
              source={{ uri: recipe.imageUrl }}
            />
            <View style={styles.returnButton}>
              <ReturnButton navigation={navigation} />
            </View>
            <View style={styles.infoBox}>
              <Text style={[Typography.FONT_H1_BLACK, { marginVertical: 5, marginLeft: 15 }]}>
                {recipe.title}
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 5, alignItems: "center" }}>
                  <Icon
                      name={"restaurant-menu"}
                      size={25}
                      color={Colors.GREY}
                  />
                  <Text style={Typography.FONT_REGULAR_GREY}>
                    {" " + recipe.servings}
                  </Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.ingredients}>
                <Text style={Typography.FONT_H3_BLACK_BOLD}>Ingredients</Text>
                {ingredientsList}
              </View>
              <View style={styles.tags}>{tagList}</View>
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

export default ApiRecipe;

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
    justifyContent: "center",
    marginBottom: 30
  },
  ingredients: { marginTop: 70, marginBottom: 10 },
  description: {},
  tags: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginBottom: 20
  },
  url: { alignSelf: "center", textDecorationLine: "underline" },
  returnButton: {
    position: "absolute",
    marginTop: 40
  },
  ingredient: {
    flexDirection: "row",
    borderBottomColor: Colors.GREY,
    borderBottomWidth: 1,
    width: 320,
    marginTop: 10
  }
});
