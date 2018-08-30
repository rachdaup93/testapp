import React from 'react';
import Clarifai from 'clarifai';
import { CLARIFAI_API_KEY } from 'react-native-dotenv';
import { StyleSheet, Text, View } from 'react-native';
import { LoadingOverlay } from 'screens/Loading/LoadingOverlay';
import { MainNavigator } from 'Navigation';

const app = new Clarifai.App({
    apiKey: CLARIFAI_API_KEY,
});

export const CameraContext = React.createContext();

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export class App extends React.Component {
    state = {
        showLoading: false,
    };

    componentDidUpdate() {
        console.log('laksdjf', this.state.showLoading);
    }

    showLoader = () => this.setState({ showLoading: true });

    hideLoader = () => this.setState({ showLoading: false });

    render() {
        const ctx = {
            app,
            showLoader: this.showLoader,
            hideLoader: this.hideLoader,
        };

        return (
            <View style={styles.container}>
                <LoadingOverlay
                    visible={this.state.showLoading}
                />
                <CameraContext.Provider value={ctx}>
                    <MainNavigator/>
                </CameraContext.Provider>
            </View>
        );
    }
}
