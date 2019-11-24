import React, { Component } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import { firestore } from './../backend/firebase';

class LoginScreen extends Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    };

    onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential).then(
                    (result) => {
                        console.log("RESULT", result);
                        if(result.additionalUserInfo.isNewUser){
                        firestore.collection("users").doc(result.user.uid).set({
                            email: result.user.email,
                            name: result.additionalUserInfo.profile.given_name,
                            surname: result.additionalUserInfo.profile.family_name,
                            profileImage: result.additionalUserInfo.profile.picture,
                            createdAt: Date.now()
                        }).then(function (snapshot) {
                            console.log("SNAPSHOT", snapshot);
                        })
                    }else {
                          firestore.collection("users").doc(result.user.uid).update({
                              lastLoggedIn: Date.now()
                          })
                        }}
                ).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            } else {
                console.log('User already signed-in Firebase.');
            }
        }.bind(this));
    };

    signInWithGoogleAsync = async () => {
        try {
            console.log("Sign in with google");
            const result = await Google.logInAsync({
                androidClientId: '455439935142-4p702jhmnpa8a9ulnatd9l6gij5ii414.apps.googleusercontent.com',
                behavior: 'web',
                iosClientId: '455439935142-9t7kmcsma3bnc43rltekuk8bq93dkacn.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
            console.log(result);
            if (result.type === 'success') {
                this.onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Button
                    title="Sign in with Google"
                    onPress={() => this.signInWithGoogleAsync()}
                />
            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});