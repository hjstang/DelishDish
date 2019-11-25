import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import LoginScreen from "../components/LoginScreen";
import { createRecipe } from "../store/actions/recipeActions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

class AddRecipe extends Component {
  render() {
    const { auth, defaultValues } = this.props;
    // defaultValues is containing all the predefined values such as measures, dishTypes etc.
    const recipe = {
      title: "Salad",
      cuisine: "european",
      description: "Recipe description",
      difficulty: "easy",
      favorited: true,
      imageUrl: "https://vg.no",
      servings: 4,
      sourceUrl: "https://matpaabordet.no",
      ingredients: [
        { name: "salad", quantity: 500, measure: "gram" },
        { name: "tomato", quantity: 400, measure: "ml" }
      ],
      healthTypes: ["vegan"],
      dishTypes: ["salad"],
      mealTypes: ["lunch"]
    };

    return (
      <View style={styles.container}>
        {auth.uid ? (
          <View>
            <Text>User logged in</Text>
            <Button
              title="Add Recipe"
              onPress={() => this.props.createRecipe(recipe)}
            />
          </View>
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
    defaultValues: state.firestore.ordered["defaultValues"]
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    createRecipe: recipe => dispatch(createRecipe(recipe))
  };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
      if (!props.auth.uid) {
        return [];
      }
      return [
        {
          collection: "defaultValues",
          storeAs: "defaultValues",
        }
      ];
    })
)(AddRecipe);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
