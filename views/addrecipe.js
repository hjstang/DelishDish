import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class AddRecipe extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text>Add recipe page</Text>
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