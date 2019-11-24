import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {connect} from "react-redux";
import LoginScreen from "../components/LoginScreen";


class AddRecipe extends Component{
    render(){
        const { auth } = this.props;
        return (
            <View style={styles.container}>
                <Text>Add recipe page</Text>
                {auth.uid ?
                    <Text>User logged in</Text>
                    :
                    <LoginScreen />
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(AddRecipe)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});