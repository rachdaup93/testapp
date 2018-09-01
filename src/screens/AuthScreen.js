import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { FACEBOOK_APP_ID } from 'react-native-dotenv';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export class AuthScreen extends Component {
    // need to invite Rachelle as FB tester for login
    facebookLogin = async () => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            FACEBOOK_APP_ID,
            { permissions: ['public_profile'] }
        );

        if (type === 'success') {
            await AsyncStorage.setItem('fb_token', token);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title='Login'
                    raised
                    onPress={this.facebookLogin}
                />
            </View>
        );
    }
}
