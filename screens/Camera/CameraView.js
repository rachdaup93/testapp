import React, { Component } from 'react';
import axios from 'axios';
import Clarifai from 'clarifai';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import wrapWithContext from '../../components/wrapWithContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
    }
});

const CameraView = wrapWithContext(class CameraView extends Component {
    state = {
        hasCameraPermission: null, 
        type: Camera.Constants.Type.back,
        imageUri: null,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    cameraRef = React.createRef();

    takePicture = () => {
        const { app } = this.props;
        console.log(app, this.props, 'o');
        this.props.showLoader();

        setTimeout(() => {
            this.props.hideLoader();
        }, 5000)
        // process.nextTick = setImmediate;
        // this.cameraRef.current.takePictureAsync({ base64: true, quality: 1 })
        //     .then((image) => {
        //         console.log(image);
        //         this.setState({ imageUri: image.uri });
        //         // this.predictImage(app, image);
        //     })
        //     .catch((err) => {
        //         console.log(err, 'error');
        //     })
    }

    predictImage = (app, { base64 }) => {
        console.log('iran', app);
        app.models.predict(Clarifai.FOOD_MODEL, { base64 })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    } 

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else if (this.state.imageUri) {
            return ( 
                <View style={styles.container}>
                    <Image style={{ width: 400, height: 800}} source={{uri: this.state.imageUri}}></Image>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Camera
                        style={styles.cameraContainer}
                        type={this.state.type}
                        ref={this.cameraRef}
                    >
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                          }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                this.setState({
                                    type: this.state.type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back,
                                });
                            }}>
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.takePicture}
                            >
                                <Text style={{ fontSize: 30, marginTop: 20, color: 'white' }}>
                                    Take Picture
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
              </View>
          );
      }
  }
})

export default CameraView;