import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Picker } from "react-native";
import { connect } from "react-redux";
import LoginScreen from "../components/LoginScreen";
import { createRecipe } from "../store/actions/recipeActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import { connectActionSheet } from "@expo/react-native-action-sheet";

class AddRecipe extends Component {
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    let ref = firebase
      .storage()
      .ref()
      .child(this.props.auth.uid + "/" + imageName);
    return ref.put(blob);
  };

  _onOpenActionSheet = () => {
    const options = ["Take a picture", "Choose from Library", "Cancel"];
    const cancelButtonIndex = 2;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      async buttonIndex => {
        if (buttonIndex == 0) {
          await this.onTakePicturePress();
        } else if (buttonIndex == 1) {
          await this.onChooseLibraryPress();
        }
      }
    );
  };

  onTakePicturePress = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (status !== "granted") {
      alert(
        "Sorry, we need camera and camera roll permission to make this work!"
      );
    }

    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      {
        this.uploadImage(result.uri, "test-image2")
          .then(() => {
            console.log("Image upload success");
          })
          .catch(err => {
            console.log("Image upload failed", err);
          });
      }
    }
  };

  onChooseLibraryPress = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permission to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.this
        .uploadImage(result.uri, "test-image3")
        .then(() => {
          console.log("image library upload success");
        })
        .catch(err => {
          console.log("Image from library upload failed", err);
        });
    }
  };

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
            <Button
              title="Choose image..."
              onPress={() => this._onOpenActionSheet()}
            />
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

const ConnectedAddRecipe = connectActionSheet(AddRecipe);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) {
      return [];
    }
    return [
      {
        collection: "defaultValues",
        storeAs: "defaultValues"
      }
    ];
  })
)(ConnectedAddRecipe);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
