import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import * as Typography from "../styles/typography";
import * as Colors from "../styles/colors";
import RecipesView from "./RecipesView";
import Icon from "react-native-vector-icons/MaterialIcons";
import { searchBySearchWord } from "../utils/searchFunctions";

class CategorySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.navigation.state.params.category,
      searchWord: "",
      searchResult: this.props.navigation.state.params.recipes,
      recipes: this.props.navigation.state.params.recipes
    };
  }

  updateSearchText = searchWord => {
    this.setState({ searchWord });
  };

  getSearchResult() {
    Keyboard.dismiss();
    const searchWord = this.state.searchWord;

    if (searchWord == "") {
      this.setState({ searched: false, searchResult: this.state.recipes });
    } else {
      const searchResult = searchBySearchWord(this.state.recipes, searchWord);
      this.setState({ searched: true, searchResult });
    }
  }

  render() {
    const { navigation } = this.props;
    const screenWidth = Math.round(Dimensions.get("window").width);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ width: screenWidth * 0.9 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.goBackButton}
            >
              <Icon name={"chevron-left"} size={40} />
            </TouchableOpacity>
            <Text style={[Typography.FONT_H3_GREEN, { alignSelf: "center" }]}>
              Delish Dish
            </Text>
          </View>
          <View style={{ width: screenWidth * 0.9 }}>
            <View
              style={{
                marginVertical: 15,
                marginLeft: 5,
                flexDirection: "row"
              }}
            >
              <Text style={Typography.FONT_H1_BLACK}>Explore </Text>
              <Text style={Typography.FONT_H1_GREEN}>
                {this.state.category}
              </Text>
            </View>
            <TextInput
              style={[Typography.FONT_INPUT, styles.textInput]}
              placeholder="Search..."
              onChangeText={this.updateSearchText}
              value={this.state.searchWord}
              onSubmitEditing={() => this.getSearchResult()}
            />
          </View>
          <View style={{ width: screenWidth * 0.9, flex: 1 }}>
            {this.state.searchResult ? (
              <RecipesView
                recipes={this.state.searchResult}
                navigation={navigation}
                screenWidth={screenWidth}
              />
            ) : (
              <View>
                <Text style={[Typography.FONT_H3_BLACK, styles.noRecipes]}>
                  You don't have any recipes {"\n"} in this category yet...
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default CategorySearch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexGrow: 1,
    marginTop: 50,
    marginBottom: 0
  },
  textInput: {
    height: 42,
    marginHorizontal: 5,
    backgroundColor: Colors.LIGHTGREY,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20
  },
  goBackButton: {
    position: "absolute",
    marginTop: -10,
    marginLeft: -5
  },
  noRecipes: {
    textAlign: "center",
    marginTop: 150
  }
});
