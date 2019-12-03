import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import ExploreScreen from "./views/explore";
import SearchScreen from "./views/search";
import AddRecipeScreen from "./views/addrecipe";
import FavoritesScreen from "./views/favorites";
import ProfileScreen from "./views/profile";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import firebaseConfig from "./backend/firebaseConfig";
import * as Font from "expo-font";
import Recipe from "./components/recipe";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

console.disableYellowBox = true;

const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(getFirebase))
);

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true
};

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen
  },
  {
    initialRouteName: "Search",
    header: null,
    headerMode: "none"
  }
);

const FavoritesStack = createStackNavigator(
    {
      Favorites: FavoritesScreen,
      Recipe: Recipe,
    },
    {
      initialRouteName: "Favorites",
      header: null,
      headerMode: "none"
    }
);

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
      screen: SearchStack,
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
      screen: FavoritesStack,
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
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      roboto: require("./assets/fonts/roboto-regular.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
          <ReactReduxFirebaseProvider
            firebase={firebaseConfig}
            config={rrfConfig}
            dispatch={store.dispatch}
            createFirestoreInstance={createFirestoreInstance}
          >
            <ActionSheetProvider>
              <AppContainer style={{ flex: 1 }} />
            </ActionSheetProvider>
          </ReactReduxFirebaseProvider>
        </Provider>
      );
    } else {
      return <Text> Loading </Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: "#fff"
  }
});
