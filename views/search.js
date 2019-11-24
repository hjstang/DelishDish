import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from '../backend/firebase';

export default class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: false
        }
    }
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                console.log("logged in");
                this.setState({userLoggedIn: true});
            } else {
                console.log("Not logged in");
                this.props.navigation.navigate('Login');
            }
        });
    };
    render(){
        return (
            <View style={styles.container}>
                <Text>search page</Text>
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