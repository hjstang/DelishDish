import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from "react-native";
import { signIn, signOut } from "../store/actions/authActions";
import { connect } from "react-redux";
import LoginScreen from "../components/LoginScreen";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Profile extends Component {
  render() {
    const { auth, profile, recipes } = this.props;
    // TODO: Fill page with the profile info. The info is contained in "profile" as "email", "name", "surname" and "profileImage"
    // TODO: Fill page with user recipes. All the user-recipes is contained in "userRecipes" as an array of recipe-objects
    return (
      <View style={styles.container}>
        {auth.uid ? (
          <View>
            <Text>{profile.name + " " + profile.surname}</Text>
            <Text>{profile.email}</Text>
            <Button title="Sign out" onPress={() => this.props.signOut()} />
            {recipes ? (
              recipes.map(recipe => <Text>{recipe.title}</Text>)
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
    justifyContent: "center",
    flex: 1
  }
});
