import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Typography from "../styles/typography";
import * as Colors from "../styles/colors";
import RNPickerSelect from "react-native-picker-select";

export default class AddIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      quantity: null,
      measure: null,
      newIngredientsList: null,
      navigation: null
    };
  }

  onChangeMeasure = measure => {
    this.setState({ measure: measure });
  };

  onChangeName = name => {
    this.setState({ name: name });
  };

  onChangeQuantity = quantity => {
    this.setState({ quantity: quantity });
  };

  addNewIngredient = () => {
    this.state.newIngredientsList.push({
      name: this.state.name,
      quantity: this.state.quantity,
      measure: this.state.measure
    });
    console.log(this.state.newIngredientsList);
  };

  render() {
    const { navigation } = this.props;
    this.state.newIngredientsList = navigation.state.params.ingredientsList;
    this.state.navigation = this.props;
    console.log("New List: ", this.state.newIngredientsList);
    console.log(this.state.navigation);

    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40
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
  button: {
    width: 120,
    height: 40,
    backgroundColor: Colors.LIGHTGREEN,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  }
});
