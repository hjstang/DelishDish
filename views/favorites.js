import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from "react-native";
import { connect } from "react-redux";
import LoginScreen from "../components/LoginScreen";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import RecipesView from "../components/recipesView";
import * as Typography from "../styles/typography";

class Favorites extends Component {
  render() {
    const { auth, favorites, navigation } = this.props;
    console.log(auth.uid);

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {auth.uid ? (
          <View>
            <Text style={[Typography.FONT_H3_GREEN,{ alignSelf: "center"}]}> Delish Dish </Text>
            <View style={{ flexDirection: "row", marginVertical: 15 }}>
              <Text style={Typography.FONT_H1_BLACK}>Your </Text>
              <Text style={Typography.FONT_H1_GREEN}>Favorites</Text>
            </View>
            {favorites ? (
               <RecipesView favorites={favorites} navigation={navigation}/>
            ) : (
              <ActivityIndicator size="small" color="#000000" />
            )}
          </View>
        ) : (
          <LoginScreen />
        )}
      </ScrollView>
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
    flex: 1,
    marginTop: 50,
    //marginHorizontal: 10
  }
});
