import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { signIn } from "../store/actions/authActions";
import * as Typography from "../styles/typography";
import * as Colors from "../styles/colors";

class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[Typography.FONT_LARGE_GREEN, { marginBottom: 70 }]}>
          Delish Dish
        </Text>
        <View style={styles.text}>
          <Text style={[Typography.FONT_H3_BLACK, { textAlign: "center" }]}>
            Log in to create, search and favorite recipes in
          </Text>
          <Text style={Typography.FONT_H3_GREEN}>your own cookbook</Text>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            console.log("sign in pressed");
            this.props.signIn();
          }}
        >
          <Text style={Typography.FONT_H3_WHITE}>Log in with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: () => dispatch(signIn())
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 170
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: 230
  },
  loginButton: {
    width: 220,
    height: 40,
    backgroundColor: Colors.GREEN,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 70,
    marginBottom: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3
  }
});
