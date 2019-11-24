import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from "firebase";


export default class Profile extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text>profile page</Text>
                <Button title="Sign out" onPress={() => firebase.auth().signOut()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});