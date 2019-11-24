import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "../components/LoginScreen";
import { connect } from "react-redux";

class Search extends Component {
  render() {
    const { auth } = this.props;
    return (
      <View style={styles.container}>
        {auth.uid ? <Text>User logged in</Text> : <LoginScreen />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
