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
import Recipe from "./components/Recipe";
import ApiRecipe from "./components/ApiRecipe";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";

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

const ExploreStack = createStackNavigator(
  {
    Explore: ExploreScreen,
    ApiRecipe: ApiRecipe
  },
  {
    initialRouteName: "Explore",
    header: null,
    headerMode: "none"
  }
);

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    Recipe: Recipe
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
    Recipe: Recipe
  },
  {
    initialRouteName: "Favorites",
    header: null,
    headerMode: "none"
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Recipe: Recipe
  },
  {
    initialRouteName: "Profile",
    header: null,
    headerMode: "none"
  }
);

const bottomTabNavigator = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name={"restaurant"} size={30} color={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name={"search"} size={30} color={tintColor} />
        )
      }
    },
    AddRecipe: {
      screen: AddRecipeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name={"add-circle-outline"} size={30} color={tintColor} />
        )
      }
    },
    Favorites: {
      screen: FavoritesStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name={"favorite-border"} size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name={"person"} size={30} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Explore",
    tabBarOptions: {
      activeTintColor: "#81B687",
      height: 79
    }
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
  state = {
    isReady: false
  };

  async _cacheResourceAsync() {
    const imageAssets = cacheImages([
      require("./assets/images/salad.jpg"),
      require("./assets/images/chicken.jpg"),
      require("./assets/images/soup.jpg"),
      require("./assets/images/fish.jpg"),
      require("./assets/images/wok.jpg")
    ]);

    const fontAssets = cacheFonts([
      {
        roboto: require("./assets/fonts/roboto-regular.ttf")
      },
      {
        robotoBold: require("./assets/fonts/Roboto-Bold.ttf")
      },
      {
        robotoMedium: require("./assets/fonts/Roboto-Medium.ttf")
      }
    ]);

    return Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourceAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: "#fff"
  }
});
