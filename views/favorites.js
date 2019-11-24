import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import LoginScreen from "../components/LoginScreen";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Favorites extends Component {
  render() {
    const { auth, favorites } = this.props;
    return (
      <View style={styles.container}>
        {auth.uid ? (
          <View>
            <Text>User logged in</Text>
            {favorites ? (
              favorites.map(recipe => <Text>{recipe.title}</Text>)
            ) : (
              <ActivityIndicator size="small" color="#000000" />
            )}
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
    favorites: state.firestore.ordered["favoritedRecipes"]
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
        storeAs: "favoritedRecipes",
        where: [
          ["authorId", "==", props.auth.uid],
          ["favorited", "==", true]
        ]
      }
    ];
  })
)(Favorites);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
