import React from 'react';
import Clarifai from 'clarifai';
import firebase from 'firebase';
import {
    CLARIFAI_API_KEY,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_STORAGE_BUCKET,
} from 'react-native-dotenv';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { LoadingOverlay } from 'screens/Loading/LoadingOverlay';
import { MainNavigator } from 'Navigation';

const app = new Clarifai.App({
    apiKey: CLARIFAI_API_KEY,
});

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(firebaseConfig);

export const AppContext = React.createContext();

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

    async componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user, 'yo');
        });

        const token = await AsyncStorage.getItem('fb_token');
        token && this.setState({ fbToken: token });

        this.startFirebase(token);
    }

    startFirebase = (token) => {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase.auth().signInAndRetrieveDataWithCredential(credential)
            .catch((error) => {
                console.log(error);
            });
    }
    // create a function that updates token and initiates firebase
    // expose that function on the context

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
