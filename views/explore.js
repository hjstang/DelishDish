import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.menu = this.menu.bind(this);
  }

  menu() {
    return <Menu />;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Explore page </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
