import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity, StyleSheet } from "react-native";
import * as Colors from "../styles/colors";

export default class ContinueButton extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Icon name={"chevron-left"} size={40} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.WHITE,
    width: 50,
    height: 35,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignContent: "center",
    justifyContent: "center"
  }
});
