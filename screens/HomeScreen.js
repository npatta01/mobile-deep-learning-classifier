import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator,

} from 'react-native';
import {AppConfig} from "../config"


import {Text, Icon, FlatList, ListItem} from 'react-native-elements';

import {Permissions} from 'expo';

import {ImagePicker, Asset, ImageManipulator} from 'expo';
import {ApiService} from "../api";


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        image: {},
        predictionData: null,
        loading: false
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <View style={styles.titleContainer}>
                        <Text h1>{AppConfig.title}</Text>

                    </View>

                    <View style={styles.actionsContainer}>

                        <View style={styles.callToActionContainer}>
                            <Icon
                                name='camera-alt' raised onPress={this._pickImageFromCamera}/>

                            <Icon
                                name='image' raised onPress={this._pickImageFromLibrary}/>
                        </View>

                    </View>

                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={{height: 200, width: 200}}/>

                    </View>


                    <View style={styles.predictionsContainer}>
                        {this.renderPredictions()}
                    </View>
                </View>

            </ScrollView>
        );
    }


    renderPredictions() {

        if (this.state.loading) {
            return <ActivityIndicator size="large" color="#0000ff"/>
        } else if (this.state.predictionData) {
            let {class: predictedClass, predictions} = this.state.predictionData;
            predictions = predictions.sort((a, b) => b.loss - a.loss).slice(0, 3);
            console.log(predictions)
            return (
                <View style={styles.predictionsContentContainer}>
                    <Text h3>Predictions</Text>
                    <View>
                        {
                            predictions.map((item, index) => (
                                <ListItem
                                    key={index}
                                    title={item.class}
                                    subtitle={`output: ${item.output}  prob: ${item.prob}`} hideChevron={true}
                                />
                            ))
                        }
                    </View>

                </View>
            )
        } else {
            return null
        }
    }


    _verifyPermissions = async () => {
        console.log("Verifying Permissions");
        const { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            const { status, permissions }  = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
           
            if (status === 'granted') {
                console.log("Permissions granted");
                return true
            } else {
                alert('Hey! You have not enabled selected permissions');
                return false
            }

        }else{
            return true;
        }
    };

    _pickImageFromLibrary = async () => {
        const status = await this._verifyPermissions();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (result.cancelled) {
            console.log("Cancelled")
        } else {

            this._processImage(result);
        }
    };

    _pickImageFromCamera = async () => {
        const status = await this._verifyPermissions();

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (result.cancelled) {
            console.log("Cancelled")
        } else {
            this._processImage(result);

        }

    };

    _processImage = async (imageData) => {

        const resizedResult = await ImageManipulator.manipulateAsync(
            imageData.uri,
            [{resize: {width: 400}}],
            {compress: 0.7}
        );

        console.log(resizedResult);

        this.setState({image: {uri: imageData.uri}, loading: true});


        await this._classifyImage(imageData.uri)
    };

    _classifyImage = async (imageURI) => {

        try {
            const predictionData = await ApiService.predict(imageURI);

            this.setState({predictionData: predictionData, loading: false});

        } catch (e) {
            this.setState({loading: false});
            alert(e);
            console.log(e)

        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,

    },

    contentContainer: {
        paddingTop: 10,
        marginTop: 5,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 10,
        flex: 2,
        justifyContent: 'center',
    },
    actionsContainer: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
    },
    imageContainer: {
        flex: 4,
        alignItems: 'center',

    },
    callToActionContainer: {
        flex: 1,
        flexDirection: "row"
    },
    feedBackContainer: {
        flex: 1,
    },

    feedBackActionsContainer: {
        flex: 1,
        flexDirection: "row"
    },

    predictionsContainer: {
        flex: 4,
        padding: 10,
        justifyContent: 'center',

    },

    predictionsContentContainer: {
        flex: 4,
        padding: 10,

    },

    predictionRow: {
        flexDirection: "row",
        //justifyContent: "space-between"
    },


    predictionRowCategory: {
        flex: 1,
        justifyContent: "space-between"
    },

    predictionRowLabel: {
        flex: 1,
        justifyContent: "space-between"

    }
});
