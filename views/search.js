import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity
} from "react-native";
import LoginScreen from "../components/LoginScreen";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import * as Typography from "../styles/typography";
import * as Colors from "../styles/colors";
import RecipesView from "../components/RecipesView";
import { TouchableWithoutFeedback } from "react-native-web";
import CategoryBox from "../components/CategoryBox";
import { searchBySearchWord, searchByMealType } from "../utils/searchFunctions";
import { getBoxWidth, getScreenWidth } from "../utils/sizing";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      searchResult: null,
      searched: false
    };
  }

  updateSearchText = searchWord => {
    this.setState({ searchWord });
  };

  getSearchResult() {
    Keyboard.dismiss();
    const searchWord = this.state.searchWord;

    if (searchWord == "") {
      this.setState({ searched: false, searchResult: null });
    } else {
      const searchResult = searchBySearchWord(this.props.recipes, searchWord);
      this.setState({ searched: true, searchResult });
    }
  }

  categories = [
    {
      title: "Breakfast",
      image: require("../assets/images/breakfast.jpg")
    },
    {
      title: "Lunch",
      image: require("../assets/images/lunch.jpg")
    },
    {
      title: "Dinner",
      image: require("../assets/images/dinner.jpg")
    },
    {
      title: "Snack",
      image: require("../assets/images/snack.jpg")
    },
    {
      title: "Dessert",
      image: require("../assets/images/dessert.jpg")
    },
    {
      title: "Baking",
      image: require("../assets/images/baking.jpg")
    }
  ];

  render() {
    const { auth, navigation } = this.props;
    const screenWidth = getScreenWidth();
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {auth.uid ? (
            <View>
              <Text style={[Typography.FONT_H3_GREEN, { alignSelf: "center" }]}>
                Delish Dish
              </Text>
              <View style={{ width: screenWidth * 0.9 }}>
                <View style={{ marginVertical: 15, marginLeft: 5 }}>
                  <Text style={Typography.FONT_H1_BLACK}>Your Cookbook </Text>
                </View>
                <TextInput
                  style={[Typography.FONT_INPUT, styles.textInput]}
                  placeholder="Search.."
                  onChangeText={this.updateSearchText}
                  value={this.state.searchWord}
                  onSubmitEditing={() => this.getSearchResult()}
                />
                {this.state.searchResult ? (
                  <RecipesView
                    recipes={this.state.searchResult}
                    navigation={navigation}
                    screenWidth={screenWidth}
                  />
                ) : this.state.searched ? (
                    <View>
                      <Text style={[Typography.FONT_H3_BLACK, styles.noRecipes]}>
                        You don't have any recipes {"\n"} in this category yet...
                      </Text>
                    </View>
                ) : (
                  <View>
                    <FlatList
                      data={this.categories}
                      numColumns={2}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[
                            styles.button,
                            { width: getBoxWidth(screenWidth) }
                          ]}
                          activeOpacity={0.1}
                          onPress={() => {
                            navigation.navigate("CategorySearch", {
                              category: item.title,
                              recipes: searchByMealType(
                                this.props.recipes,
                                item.title
                              )
                            });
                          }}
                        >
                          <CategoryBox category={item} />
                        </TouchableOpacity>
                      )}
                      keyExtractor={item => item.title}
                    />
                  </View>
                )}
              </View>
            </View>
          ) : (
            <LoginScreen />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    recipes: state.firestore.ordered["userRecipes"]
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
        storeAs: "userRecipes",
        where: [["authorId", "==", props.auth.uid]]
      }
    ];
  })
)(Search);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexGrow: 1,
    marginTop: 50,
    marginBottom: 20
  },
  textInput: {
    height: 42,
    marginHorizontal: 5,
    backgroundColor: Colors.LIGHTGREY,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20
  },
  button: {
    height: 138,
    margin: 5,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  noRecipes: {
    textAlign: "center",
    marginTop: 150
  }
});
