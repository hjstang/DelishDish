import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {signIn, signOut} from "../store/actions/authActions";
import {connect} from 'react-redux';
import LoginScreen from "../components/LoginScreen";

class Profile extends Component{
    render(){
        const { auth } = this.props;
        //console.log(auth);
        return (
            <View style={styles.container}>
                <Text>profile page</Text>
                {auth.uid ?
                    <Button title="Sign out" onPress={() => this.props.signOut()}/>
                :   <LoginScreen/>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        signIn: () => dispatch(signIn())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});