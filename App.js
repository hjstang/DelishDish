import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Api from "./backend/api";
import ExploreScreen from "./views/explore";
import SearchScreen from "./views/search";
import AddRecipeScreen from "./views/addrecipe";
import FavoritesScreen from "./views/favorites";
import ProfileScreen from "./views/profile";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

console.disableYellowBox = true;

const bottomTabNavigator = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreScreen,
      navigationOptions: {
        tabBarIcon: ({ activeTintColor }) => (
          <Image
            source={require("./assets/menu/explore.png")}
            color={activeTintColor}
          />
        )
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({ activeTintColor }) => (
          <Image
            source={require("./assets/menu/search.png")}
            color={activeTintColor}
          />
        )
      }
    },
    AddRecipe: {
      screen: AddRecipeScreen,
      navigationOptions: {
        tabBarIcon: ({ activeTintColor }) => (
          <Image
            source={require("./assets/menu/add.png")}
            color={activeTintColor}
          />
        )
      }
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        tabBarIcon: ({ activeTintColor }) => (
          <Image
            source={require("./assets/menu/favorite-empty.png")}
            color={activeTintColor}
          />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ activeTintColor }) => (
          <Image
            source={require("./assets/menu/profile.png")}
            color={activeTintColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Explore",
    tabBarOptions: {
      activeTintColor: "blue",
        height: 79
    }
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);

export default class App extends Component {
  /*componentDidMount = async () => {
    await Api.getUser();
  };*/

  render() {
    return (
      <View style={styles.container}>
        <AppContainer style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: "#fff"
  }
});
