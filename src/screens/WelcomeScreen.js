import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slides } from 'components/Slides';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const SLIDE_DATA = [
    { text: 'Welcome to App' },
    { text: 'Do this to App, Magic!' },
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
