import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class Profile extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text>profile page</Text>
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