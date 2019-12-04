import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { signIn } from "../store/actions/authActions";

class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign in with Google"
          onPress={() => {
            console.log("sign in pressed");
            this.props.signIn();
          }}
        />
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
    marginTop: 300
  }
});
