import React, { PureComponent } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { emitter } from 'lib/emitter';
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_STORAGE_BUCKET,
} from 'react-native-dotenv';

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
        backgroundColor: 'blue',
    },
});

export class HandleBoot extends PureComponent {
    async componentDidMount() {
        const token = await AsyncStorage.getItem('fb_token');
        this.handleUserNavigation(token);
    }

    handleUserNavigation = (token) => {
        if (token) {
            emitter.emit('new_user_token', token);
            this.props.navigation.navigate('main');
        } else {
            this.props.navigation.navigate('welcome');
        }
    }

    render() {
        return <View style={styles.container}/>;
    }
}

HandleBoot.propTypes = {
    navigation: PropTypes.object,
};
