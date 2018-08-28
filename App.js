import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './Navigation';
import Clarifai from 'clarifai';
import LoadingOverlay from './screens/Loading/LoadingOverlay'

require('dotenv').config()

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY,
})

export const CameraContext = React.createContext();

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});



export default class App extends React.Component {

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
                    <MainNavigator />
                </CameraContext.Provider>
            </View>
        );
    }
}
