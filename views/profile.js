import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { signIn, signOut } from "../store/actions/authActions";
import { connect } from "react-redux";
import LoginScreen from "../components/LoginScreen";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import * as Typography from "../styles/typography";
import RecipesView from "../components/RecipesView";
import {getScreenWidth} from "../utils/sizing";

class Profile extends Component {
  render() {
    const { auth, profile, recipes, navigation } = this.props;
    const screenWidth = getScreenWidth();
    // TODO: Fill page with the profile info. The info is contained in "profile" as "email", "name", "surname" and "profileImage"
    // TODO: Fill page with user recipes. All the user-recipes is contained in "userRecipes" as an array of recipe-objects
    return (
      <ScrollView>
        {auth.uid ? (
          <View style={styles.container}>
            <View>
              <View style={{ alignItems: "center" }}>
                <Text style={Typography.FONT_H3_GREEN}>Delish Dish</Text>
                <Image
                  source={{ uri: profile.profileImage }}
                  style={styles.image}
                />
                <Text style={Typography.FONT_H2_BLACK}>
                  {profile.name + " " + profile.surname}
                </Text>
                <Text
                  style={[
                    Typography.FONT_REGULAR_GREY_THIN,
                    { marginTop: 5, marginBottom: 20 }
                  ]}
                >
                  {profile.email}
                </Text>
                <TouchableOpacity onPress={() => this.props.signOut()}>
                  <Text style={[Typography.FONT_REGULAR_BLACK, styles.logout]}>
                    Log out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: screenWidth * 0.9 }}>
              <View style={styles.text1}>
                <Text style={Typography.FONT_H1_BLACK}>Your </Text>
                <Text style={Typography.FONT_H1_GREEN}>Recipes</Text>
              </View>
              {recipes ? (
                <RecipesView
                  recipes={recipes}
                  navigation={navigation}
                  screenWidth={screenWidth}
                />
              ) : (
                <ActivityIndicator size="small" color="#000000" />
              )}
            </View>
          </View>
        ) : (
          <LoginScreen style={styles.container} />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    recipes: state.firestore.ordered["userRecipes"]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
    signIn: () => dispatch(signIn())
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
        collection: "recipes",
        storeAs: "userRecipes",
        where: [["authorId", "==", props.auth.uid]]
      }
    ];
  })
)(Profile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexGrow: 1,
    marginTop: 50,
    marginBottom: 20
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginVertical: 15
  },
  text1: {
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 20,
    marginLeft: 5
  },
  logout: { textAlign: "center", textDecorationLine: "underline" }
});
