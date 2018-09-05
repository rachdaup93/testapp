import React from 'react';
import Clarifai from 'clarifai';
import firebase from 'firebase';
import { emitter } from 'lib/emitter';
import {
    CLARIFAI_API_KEY,
} from 'react-native-dotenv';
import { StyleSheet, View, YellowBox } from 'react-native';
import { LoadingOverlay } from 'screens/Loading/LoadingOverlay';
import { MainNavigator } from 'Navigation';

// known EXPO issue with firebase token having an expiration timer
YellowBox.ignoreWarnings(['Setting a timer']);

const app = new Clarifai.App({
    apiKey: CLARIFAI_API_KEY,
});

export const AppContext = React.createContext();

// if user does not exist, create one
firebase.auth().onAuthStateChanged((user) => {
    const { uid, providerData } = user;
    const userRef = firebase.database().ref(`users/${uid}`);

    return userRef.once('value').then((snapshot) => {
        if (!snapshot.exists()) {
            const { displayName, photoURL } = providerData[0];

            userRef.set({
                name: displayName,
                photoURL,
            });
        }
        return snapshot;
    });
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export class App extends React.Component {
    state = {
        showLoading: false,
        fbToken: null,
    };

    componentDidMount() {
        emitter.on('new_user_token', this.startFirebase);
    }

    componentWillUnmount() {
        emitter.removeListener('new_user_token', this.startFirebase);
    }

    startFirebase = (token) => {
        this.showLoader();
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase.auth().signInAndRetrieveDataWithCredential(credential)
            .then(() => {
                return this.hideLoader();
            })
            .catch((error) => {
                console.log(error);
                return this.hideLoader();
            });
    }

    showLoader = () => this.setState({ showLoading: true });

    hideLoader = () => this.setState({ showLoading: false });

    render() {
        const ctx = {
            app,
            showLoader: this.showLoader,
            hideLoader: this.hideLoader,
            fbToken: this.state.fbToken,
        };

        return (
            <View style={styles.container}>
                <LoadingOverlay
                    visible={this.state.showLoading}
                />
                <AppContext.Provider value={ctx}>
                    <MainNavigator/>
                </AppContext.Provider>
            </View>
        );
    }
}
