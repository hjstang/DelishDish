import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  Modal,
  Alert
} from "react-native";
import { connect } from "react-redux";
import LoginScreen from "../components/LoginScreen";
import { createRecipe } from "../store/actions/recipeActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Typography from "../styles/typography";
import * as Colors from "../styles/colors";
import PickerSelect from "react-native-picker-select";
import AddIngredient from "./addIngredient";
import RNPickerSelect from "react-native-picker-select";
import Swipeout from "react-native-swipeout";

let data = [
  { name: "salad", quantity: 500, measure: "gram" },
  { name: "tomato", quantity: 400, measure: "ml" },
  { name: "basil", quantity: 200, measure: "g" },
  { name: "potato", quantity: 3, measure: "units" },
  { name: "cucumber", quantity: 1, measure: "units" }
];

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      addName: "",
      addQuantity: null,
      addMeasure: "",
      deletedRowKey: null,
      title: "Salad",
      cuisine: "european",
      description: "Recipe description",
      difficulty: "easy",
      favorited: true,
      imageUrl: null,
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
  }

  uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const uuid = this.uuidv4();

    let ref = await firebase
      .storage()
      .ref()
      .child(this.props.auth.uid + "/" + uuid);
    const putImage = await ref.put(blob);
    ref.getDownloadURL().then(url => {
      this.setState({ imageUrl: url });
    });
    return putImage;
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
        this.uploadImage(result.uri)
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
      this.uploadImage(result.uri)
        .then(() => {
          console.log("image library upload success");
        })
        .catch(err => {
          console.log("Image from library upload failed", err);
        });
    }
  };

  getRecipeFromState = () => {
    const {
      title,
      cuisine,
      description,
      difficulty,
      favorited,
      imageUrl,
      servings,
      sourceUrl,
      ingredients,
      healthTypes,
      dishTypes,
      mealTypes
    } = this.state;
    return {
      title,
      cuisine,
      description,
      difficulty,
      favorited,
      imageUrl,
      servings,
      sourceUrl,
      ingredients,
      healthTypes,
      dishTypes,
      mealTypes
    };
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  addNewIngredient() {
    this.state.ingredients.push({
      name: this.state.addName,
      quantity: this.state.addQuantity,
      measure: this.state.addMeasure
    });
    console.log(this.state.ingredients);
  }

  onChangeMeasure = measure => {
    this.setState({ addMeasure: measure });
  };

  onChangeName = name => {
    this.setState({ addName: name });
  };

  onChangeQuantity = quantity => {
    this.setState({ addQuantity: quantity });
  };

  onChangeTitle(title) {
    this.setState({ title: title });
    console.log(this.state.title);
  }

  onChangeDifficulty(difficulty) {
    this.setState({ difficulty: difficulty });
    console.log(this.state.difficulty);
  }

  onChangeServings(servings) {
    this.setState({ servings: servings });
    console.log(this.state.servings);
  }

  refreshFlatList = deletedKey => {
    this.setState(prevState => {
      return {
        deletedRowKey: deletedKey
      };
    });
  };

  render() {
    const { auth, defaultValues } = this.props;
    const screenWidth = Math.round(Dimensions.get("window").width);

    // defaultValues is containing all the predefined values such as measures, dishTypes etc.
    return (
      <ScrollView>
        {auth.uid ? (
          <View style={styles.container}>
            <View style={[styles.imageBox, { width: screenWidth }]}>
              {this.state.imageUrl ? (
                <TouchableOpacity
                  onPress={() => this._onOpenActionSheet()}
                  style={styles.addImage}
                >
                  <Image
                    source={{ uri: this.state.imageUrl }}
                    style={{
                      width: screenWidth,
                      height: 250
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this._onOpenActionSheet()}
                  style={styles.addImage}
                >
                  <Icon name={"add-a-photo"} size={50} color={Colors.WHITE} />
                  <Text style={Typography.FONT_H3_WHITE}>Add image</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.inputBox}>
              <TextInput
                placeholder={"Title"}
                style={styles.inputText}
                onValueChange={title => this.onChangeTitle(title)}
              />
            </View>
            <View style={styles.inputBox}>
              <PickerSelect
                onValueChange={difficulty =>
                  this.onChangeDifficulty(difficulty)
                }
                items={[
                  { label: "Easy", value: "easy" },
                  { label: "Medium", value: "medium" },
                  { label: "Hard", value: "hard" }
                ]}
                placeholder={{ label: "Difficulty", value: null }}
              />
            </View>
            <View style={styles.inputBox}>
              <PickerSelect
                onValueChange={servings => this.onChangeServings(servings)}
                items={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                  { label: "6", value: "6" }
                ]}
                placeholder={{ label: "Servings", value: null }}
              />
            </View>
            <View>
              <Text style={Typography.FONT_H2_BLACK}>Ingredients</Text>
              <FlatList
                data={data}
                renderItem={({ item, index }) => {
                  return (
                    <FlatListItem
                      item={item}
                      index={index}
                      parentFlatList={this}
                    >

                    </FlatListItem>
                  );
                }}
                extraData={this.state.ingredients}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true);
                }}
                style={styles.button}
              >
                <Text>Add ingredient</Text>
              </TouchableOpacity>

              <Modal
                //animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
              >
                <View style={{ marginTop: 50 }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                    >
                      <Icon name={"keyboard-arrow-left"} size={40} />
                    </TouchableOpacity>
                    <View style={{ alignItems: "center" }}>
                      <View style={styles.inputBox}>
                        <TextInput
                          placeholder={"Ingredient name"}
                          onChangeText={name => this.onChangeName(name)}
                          style={{ marginLeft: 10 }}
                          value={this.state.addName}
                        />
                      </View>
                      <View style={styles.inputBox}>
                        <TextInput
                          placeholder={"quantity"}
                          onChangeText={quantity =>
                            this.onChangeQuantity(quantity)
                          }
                          style={{ marginLeft: 10 }}
                          value={this.state.quantity}
                        />
                      </View>
                      <View style={styles.inputBox}>
                        <RNPickerSelect
                          onValueChange={measure =>
                            this.onChangeMeasure(measure)
                          }
                          value={this.state.measure}
                          items={[
                            { label: "Tablespoon", value: "Tablespoon" },
                            { label: "Teaspoon", value: "Teaspoon" },
                            { label: "Liter", value: "Liter" },
                            { label: "Desiliter", value: "Desiliter" },
                            { label: "Milliliter", value: "Milliliter" },
                            { label: "Gram", value: "Gram" },
                            { label: "Kilogram", value: "Kilogram" },
                            { label: "Units", value: "Units" }
                          ]}
                          placeholder={{ label: "Measure", value: null }}
                          style={{ marginLeft: 10 }}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this.addNewIngredient();
                          this.setModalVisible(!this.state.modalVisible);
                        }}
                        style={[
                          styles.button,
                          { backgroundColor: Colors.LIGHTGREEN }
                        ]}
                      >
                        <Text style={Typography.FONT_H3_WHITE}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <Text style={Typography.FONT_H2_BLACK}>Description</Text>
              <View style={styles.description}>
                <TextInput
                  multiline={true}
                  style={{ margin: 5, width: 290, height: 140 }}
                  textAlignVertical={"top"}
                />
              </View>
            </View>
            <View>
              <Text>Meal Type: </Text>
              <Text>None</Text>
              <Text>Dish Type</Text>
              <Text>Cuisine</Text>
              <Text>Food Preferences</Text>
              <TextInput placeholde={"Add Source URL"} />
              <TouchableOpacity
                style={styles.addButton}
                onPress={() =>
                  this.props.createRecipe(this.getRecipeFromState())
                }
              >
                <Text style={Typography.FONT_H3_WHITE}>
                  Add to your cookbook
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <LoginScreen />
        )}
      </ScrollView>
    );
  }
}

class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null
    };
  }

  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        // Should have a key for each item and not use name here!!!!
        this.setState({ activeRowKey: this.props.index });
      },
      right: [
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            console.log(deletingRow);
            Alert.alert(
              "Alert",
              "Are you sure you want to delete?",
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "Yes",
                  onPress: () => {
                    console.log("Yes pressed");
                    console.log(deletingRow);
                    console.log(this.props.index);
                    data.slice(this.props.index);
                    this.props.parentFlatList.refreshFlatList(deletingRow);

                  }
                }
              ],
              { cancelable: true }
            );
          },
          text: "Delete",
          type: "delete"
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    };

    return (
      <Swipeout {...swipeSettings}>
        <View
          style={{
            flex: 1,
            height: 60,
            backgroundColor:
              this.props.index % 2 === 0 ? Colors.WHITE : Colors.LIGHTGREY
          }}
        >
          <Text style={Typography.FONT_H3_BLACK}>
            {this.props.item.quantity +
              " " +
              this.props.item.measure +
              " " +
              this.props.item.name}
          </Text>
        </View>
      </Swipeout>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    defaultValues: state.firestore.ordered["defaultValues"]
  };
};

const mapDispatchToProps = dispatch => {
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
    justifyContent: "center",
    flexGrow: 1
  },
  addImage: {
    width: 150,
    height: 150,
    backgroundColor: Colors.MEDIUM_GREY,
    justifyContent: "center",
    alignItems: "center"
  },
  imageBox: {
    height: 250,
    backgroundColor: Colors.MEDIUM_GREY,
    alignItems: "center",
    justifyContent: "center"
  },
  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: Colors.LIGHTGREY,
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 5,
    justifyContent: "center"
  },
  inputText: {
    width: 290,
    height: 40,
    alignSelf: "center"
  },
  button: {
    width: 120,
    height: 30,
    backgroundColor: Colors.MEDIUM_GREY,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  description: {
    width: 300,
    height: 150,
    borderRadius: 5,
    backgroundColor: Colors.LIGHTGREY,
    alignSelf: "center"
  },
  addButton: {
    width: 250,
    height: 30,
    backgroundColor: Colors.LIGHTGREEN,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  }
});
