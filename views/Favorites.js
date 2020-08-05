import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import LoginScreen from "../components/LoginScreen";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import RecipesView from "../components/RecipesView";
import * as Typography from "../styles/typography";
import { getScreenWidth } from "../utils/sizing";

class Favorites extends Component {
  render() {
    const { auth, favorites, navigation } = this.props;
    const screenWidth = getScreenWidth();

    return (
      <ScrollView>
        {auth.uid ? (
          <View style={styles.container}>
            <Text style={[Typography.FONT_H3_GREEN, { alignSelf: "center" }]}>
              Delish Dish
            </Text>
            <View style={{ width: screenWidth * 0.9 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 15,
                  marginLeft: 5
                }}
              >
                <Text style={Typography.FONT_H1_BLACK}>Your </Text>
                <Text style={Typography.FONT_H1_GREEN}>Favorites</Text>
              </View>
              {favorites ? (
                <RecipesView
                  recipes={favorites}
                  navigation={navigation}
                  screenWidth={screenWidth}
                />
              ) : (
                <ActivityIndicator size="small" color="#000000" />
              )}
            </View>
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
    flexGrow: 1,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20
  }
});
