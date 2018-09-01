import React from 'react';
import Clarifai from 'clarifai';
import firebase from 'firebase';
import { emitter } from 'lib/emitter';
import {
    CLARIFAI_API_KEY,
} from 'react-native-dotenv';
import { StyleSheet, View } from 'react-native';
import { LoadingOverlay } from 'screens/Loading/LoadingOverlay';
import { MainNavigator } from 'Navigation';

const app = new Clarifai.App({
    apiKey: CLARIFAI_API_KEY,
});

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

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user, 'yo');
        });

        emitter.on('new_user_token', this.startFirebase);
    }

    componentWillUnmount() {
        emitter.removeListener('new_user_token', this.startFirebase);
    }

    startFirebase = (token) => {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase.auth().signInAndRetrieveDataWithCredential(credential)
            .catch((error) => {
                console.log(error);
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
