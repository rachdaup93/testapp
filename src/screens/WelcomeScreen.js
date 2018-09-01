import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slides } from 'components/Slides';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

const SLIDE_DATA = [
    { 
        id: "welcome_screen_0",
        header: "Welcome to CanIEatThis?",
        text: "An app that let's you vote on your next meal.",
        image: require('../../assets/images/hotDogs.jpg')
    },
    { 
        id: "welcome_screen_1",
        header: "Do this to App, Magic!",
        text: "Test paragraph here.",
        image: require('../../assets/images/hotDogs.jpg')
    },
];

export class WelcomeScreen extends Component {
    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <Slides
                    data={SLIDE_DATA}
                    onComplete={this.onSlidesComplete}
                />
            </View>
        );
    }
}

WelcomeScreen.propTypes = {
    navigation: PropTypes.object,
};
