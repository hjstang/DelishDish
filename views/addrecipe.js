import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  Alert, Keyboard,
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
import Swipeout from "react-native-swipeout";
import ChooseTypeModal from "../components/ChooseTypeModal";
import AddIngredientModal from "../components/AddIngredientModal";
import { KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const MEAL_TYPES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Dessert",
  "Drink",
  "Baking"
];
const DISH_TYPES = [
  "Bread",
  "Drinks",
  "Desserts",
  "Main course",
  "Pancake",
  "Salad",
  "Sandwiches",
  "Side dish",
  "Soup",
  "Starter",
  "Sweets"
];
const HEALTH_TYPES = [
  "Vegan",
  "Vegetarian",
  "Gluten-free",
  "Dairy-free",
  "Egg-free",
  "Fodmap-free",
  "Keto-friendly",
  "Kosher",
  "No-suger",
  "Pescetarian"
];
const CUISINE_TYPES = [
  "American",
  "Asian",
  "British",
  "Central Europe",
  "Chinese",
  "Eastern Europe",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Kosher",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "South American",
  "South East Asian"
];

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      cuisine: [],
      description: "",
      difficulty: "",
      imageUrl: null,
      servings: null,
      sourceUrl: "",
      ingredients: [],
      healthTypes: [],
      dishTypes: [],
      mealTypes: [],
      activeKeyRow: null,
      mealTypeModalVisible: false,
      dishTypeModalVisible: false,
      healthTypeModalVisible: false,
      cuisineModalVisible: false,
      addIngredientModalVisible: false
    };

    this.setMealTypeModalVisible = this.setMealTypeModalVisible.bind(this);
    this.addMealTypes = this.addMealTypes.bind(this);
    this.setDishTypeModalVisible = this.setDishTypeModalVisible.bind(this);
    this.addDishTypes = this.addDishTypes.bind(this);
    this.setHealthTypeModalVisible = this.setHealthTypeModalVisible.bind(this);
    this.addHealthTypes = this.addHealthTypes.bind(this);
    this.setCuisineModalVisible = this.setCuisineModalVisible.bind(this);
    this.addCuisine = this.addCuisine.bind(this);
    this.setAddIngredientModalVisible = this.setAddIngredientModalVisible.bind(
      this
    );
    this.addNewIngredient = this.addNewIngredient.bind(this);
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
      favorited: false,
      imageUrl,
      servings,
      sourceUrl,
      ingredients,
      healthTypes,
      dishTypes,
      mealTypes
    };
  };

  setAddIngredientModalVisible() {
    this.setState({
      addIngredientModalVisible: !this.state.addIngredientModalVisible
    });
  }

  setMealTypeModalVisible() {
    this.setState({ mealTypeModalVisible: !this.state.mealTypeModalVisible });
  }

  setDishTypeModalVisible() {
    this.setState({ dishTypeModalVisible: !this.state.dishTypeModalVisible });
  }
  setHealthTypeModalVisible() {
    this.setState({
      healthTypeModalVisible: !this.state.healthTypeModalVisible
    });
  }

  setCuisineModalVisible() {
    this.setState({ cuisineModalVisible: !this.state.cuisineModalVisible });
  }

  addMealTypes(mealTypes) {
    this.setState({ mealTypes });
  }

  addDishTypes(dishTypes) {
    this.setState({ dishTypes });
  }

  addHealthTypes(healthTypes) {
    this.setState({ healthTypes });
  }

  addCuisine(cuisine) {
    this.setState({ cuisine });
  }

  addNewIngredient(ingredient) {
    this.state.ingredients.push(ingredient);
  }

  removeIngredient(index) {
    let array = [...this.state.ingredients];
    array.splice(index, 1);
    this.setState({ ingredients: array });
  }

  swipeSettings = index => {
    return {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: index });
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
                    this.removeIngredient(index);
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
  };

  flatListItem = (item, index) => {
    return (
      <Swipeout {...this.swipeSettings(index)}>
        <View
          style={{
            flex: 1,
            height: 60,
            justifyContent: "center",
            paddingLeft: 10,
            backgroundColor: index % 2 === 0 ? Colors.LIGHTGREY : Colors.WHITE
          }}
        >
          <Text style={Typography.FONT_H3_BLACK}>
            {item.quantity + " " + item.measure + " " + item.name}
          </Text>
        </View>
      </Swipeout>
    );
  };
  validateAddRecipe = () => {
    if (this.state.title && this.state.imageUrl) {
      return true;
    }
    return false;
  };

  resetState = () => {
    this.setState({
      title: "",
      cuisine: [],
      description: "",
      difficulty: "",
      imageUrl: null,
      servings: null,
      sourceUrl: "",
      ingredients: [],
      healthTypes: [],
      dishTypes: [],
      mealTypes: [],
      activeKeyRow: null,
      mealTypeModalVisible: false,
      dishTypeModalVisible: false,
      healthTypeModalVisible: false,
      cuisineModalVisible: false,
      addIngredientModalVisible: false
    });
  };

  render() {
    const { auth, defaultValues, navigation } = this.props;
    const screenWidth = Math.round(Dimensions.get("window").width);

    const pickerStyle = {
      inputIOS: {
        color: Colors.BLACK
      },
      inputAndroid: {
        color: Colors.BLACK
      }
    };

    return (
      <KeyboardAwareScrollView>
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
            <View style={{ width: screenWidth * 0.9 }}>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder="Title"
                  style={[Typography.FONT_INPUT, styles.inputText]}
                  onChangeText={title => this.setState({ title })}
                  value={this.state.title}
                />
              </View>
              <View style={styles.inputBox}>
                <PickerSelect
                  style={pickerStyle}
                  onValueChange={difficulty => this.setState({ difficulty })}
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
                  style={pickerStyle}
                  onValueChange={servings => this.setState({ servings })}
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
                <Text style={[Typography.FONT_H2_BLACK, { marginBottom: 10 }]}>
                  Ingredients
                </Text>
                <FlatList
                  data={this.state.ingredients}
                  renderItem={({ item, index }) =>
                    this.flatListItem(item, index)
                  }
                  extraData={this.state}
                  keyExtractor={item => item.name}
                  contentContainerStyle={{ marginBottom: 10 }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setAddIngredientModalVisible();
                  }}
                  style={styles.button}
                >
                  <Text style={Typography.FONT_REGULAR_WHITE_BOLD}>
                    Add ingredient
                  </Text>
                </TouchableOpacity>
                <AddIngredientModal
                  visible={this.state.addIngredientModalVisible}
                  screenWidth={screenWidth}
                  setModalVisible={this.setAddIngredientModalVisible}
                  onAddIngredient={this.addNewIngredient}
                />
                <Text style={[Typography.FONT_H2_BLACK, { marginBottom: 10 }]}>
                  Description
                </Text>
                <View style={styles.description}>
                  <TextInput
                    multiline={true}
                    style={{ margin: 5, width: 290, height: 140 }}
                    textAlignVertical={"top"}
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity
                  underlayColor={Colors.LIGHTGREY}
                  style={styles.typeSelection}
                  onPress={() => this.setMealTypeModalVisible()}
                >
                  <Text style={Typography.FONT_H3_BLACK_BOLD}>Meal Type</Text>
                  <Text>
                    {this.state.mealTypes.length > 0
                      ? this.state.mealTypes[0] + "..."
                      : "None"}
                  </Text>
                </TouchableOpacity>
                <ChooseTypeModal
                  type="Meal type"
                  types={MEAL_TYPES}
                  chosen={this.state.mealTypes}
                  visible={this.state.mealTypeModalVisible}
                  onPress={this.addMealTypes}
                  screenWidth={screenWidth}
                  setModalVisible={this.setMealTypeModalVisible}
                />
                <TouchableOpacity
                  style={styles.typeSelection}
                  onPress={() => this.setDishTypeModalVisible()}
                >
                  <Text style={Typography.FONT_H3_BLACK_BOLD}>Dish Type</Text>
                  <Text>
                    {this.state.dishTypes.length > 0
                      ? this.state.dishTypes[0] + "..."
                      : "None"}
                  </Text>
                </TouchableOpacity>

                <ChooseTypeModal
                  type="Dish type"
                  types={DISH_TYPES}
                  chosen={this.state.dishTypes}
                  visible={this.state.dishTypeModalVisible}
                  onPress={this.addDishTypes}
                  screenWidth={screenWidth}
                  setModalVisible={this.setDishTypeModalVisible}
                />

                <TouchableOpacity
                  style={styles.typeSelection}
                  onPress={() => this.setCuisineModalVisible()}
                >
                  <Text style={Typography.FONT_H3_BLACK_BOLD}>Cuisine</Text>
                  <Text>
                    {this.state.cuisine.length > 0
                      ? this.state.cuisine[0] + "..."
                      : "None"}
                  </Text>
                </TouchableOpacity>
                <ChooseTypeModal
                  type="Cuisine"
                  types={CUISINE_TYPES}
                  chosen={this.state.cuisine}
                  visible={this.state.cuisineModalVisible}
                  onPress={this.addCuisine}
                  screenWidth={screenWidth}
                  setModalVisible={this.setCuisineModalVisible}
                />

                <TouchableOpacity
                  style={styles.typeSelection}
                  onPress={() => this.setHealthTypeModalVisible()}
                >
                  <Text style={Typography.FONT_H3_BLACK_BOLD}>
                    Food Preferences
                  </Text>
                  <Text>
                    {this.state.healthTypes.length > 0
                      ? this.state.healthTypes[0] + "..."
                      : "None"}
                  </Text>
                </TouchableOpacity>
                <ChooseTypeModal
                  type="Food Preferences"
                  types={HEALTH_TYPES}
                  chosen={this.state.healthTypes}
                  visible={this.state.healthTypeModalVisible}
                  onPress={this.addHealthTypes}
                  screenWidth={screenWidth}
                  setModalVisible={this.setHealthTypeModalVisible}
                />

                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Source URL"
                    style={[Typography.FONT_INPUT, styles.inputText]}
                    onChangeText={sourceUrl => this.setState({ sourceUrl })}
                    value={this.state.sourceUrl}
                  />
                </View>
                <TouchableOpacity
                  disabled={!this.validateAddRecipe()}
                  style={
                    this.validateAddRecipe()
                      ? [styles.addButton, { backgroundColor: Colors.GREEN }]
                      : [
                          styles.addButton,
                          { backgroundColor: Colors.MEDIUM_GREY }
                        ]
                  }
                  onPress={() => {
                    const recipeId = this.uuidv4();
                    const recipeFromState = this.getRecipeFromState();
                    const authorId = auth.uid;
                    const createdAt = new Date();
                    const recipe = {
                      id: recipeId,
                      authorId,
                      createdAt,
                      ...recipeFromState
                    };
                    this.props.createRecipe(recipe, recipeId);
                    navigation.navigate("Recipe", {
                      recipe: recipe,
                      createdNow: true
                    });
                    this.resetState();
                  }}
                >
                  <Text style={Typography.FONT_H3_WHITE}>
                    Add to your cookbook
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <LoginScreen />
        )}
      </KeyboardAwareScrollView>
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
    createRecipe: (recipe, recipeId) => dispatch(createRecipe(recipe, recipeId))
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
    flexGrow: 1,
    marginBottom: 20
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
    justifyContent: "center",
    marginBottom: 20
  },
  inputBox: {
    width: "100%",
    height: 40,
    backgroundColor: Colors.LIGHTGREY,
    alignSelf: "center",
    marginBottom: 30,
    borderRadius: 5,
    justifyContent: "center",
    paddingLeft: 10
  },
  inputText: {
    height: 40
  },
  pickerStyle: {
    paddingLeft: 10
  },
  button: {
    width: 120,
    height: 30,
    backgroundColor: Colors.MEDIUM_GREY,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 20
  },
  description: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    backgroundColor: Colors.LIGHTGREY,
    alignSelf: "center",
    marginBottom: 10,
    paddingLeft: 10
  },
  addButton: {
    width: 250,
    height: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  goBackButton: {
    position: "absolute",
    marginTop: -10,
    marginLeft: -5
  },
  typeSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 10
  }
});