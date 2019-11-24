import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {connect} from "react-redux";
import LoginScreen from "../components/LoginScreen";
import {createRecipe} from "../store/actions/recipeActions";

class AddRecipe extends Component{
    render(){
        const { auth } = this.props;
        const recipe = {
            title: "Pizza margherita",
            cuisine: "italian",
            description: "This is a description",
            difficulty: "easy",
            favorited: true,
            imageUrl: "https://vg.no",
            servings: 4,
            sourceUrl: "https://matpaabordet.no",
            ingredients: [
                {name: "spaghetti", quantity: 500, measure: "gram"},
                {name: "tomato sauce", quantity: 400, measure: "ml"}
            ],
            healtyTypes: ["vegetarian"],
            dishTypes: ["pasta"],
            mealTypes: ["lunch", "dinner"]
        };

        return (
            <View style={styles.container}>
                {auth.uid ?
                    <View>
                        <Text>User logged in</Text>
                        <Button title="Add Recipe" onPress={() => this.props.createRecipe(recipe)}/>
                    </View>
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
};

export const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe: (recipe) => dispatch(createRecipe(recipe))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});