import * as Google from "expo-google-app-auth";
import {firebaseConnect, firestoreConnect, getFirebase, useFirestore} from 'react-redux-firebase';

const isUserEqual = (googleUser, firebaseUser, firebase) => {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.user.id) {
                // We don't need to reauth the Firebase connection.
                return true;
            }
        }
    }
    return false;
};

const onSignIn = (googleUser, firebase, firestore) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser, firebase)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            );
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential).then(
                (result) => {
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

const signInWithGoogleAsync = async (firebase, firestore) => {
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
            onSignIn(result, firebase, firestore);
            return result.accessToken;
        } else {
            return { cancelled: true };
        }
    } catch (e) {
        return { error: true };
    }
};

export const signIn = () => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        signInWithGoogleAsync(firebase, firestore).then(() => {dispatch(
                { type: 'LOGIN_SUCCESS'}
                )}).catch(
                    (err) => {dispatch({type: 'LOGIN_ERROR', err})});
    }
};

export const signOut = () => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'})
        });
    }
};