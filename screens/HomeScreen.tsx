import * as React from 'react';


//import { View ,ScrollView} from '../components/Themed';
import { Text  } from 'react-native-elements';

import { View ,ScrollView} from 'react-native';

import {
  Image,
  StyleSheet,
  ActivityIndicator,

} from 'react-native';

import {ApiService,PredictionResponse} from "../components/api";
import {AppConfig} from "../config"
import { Icon, ListItem} from 'react-native-elements';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';

import * as ImageManipulator from 'expo-image-manipulator';
import * as SplashScreen from 'expo-splash-screen';


type State = {
    image: ImageManipulator.ImageResult|null; 
    predictionData:PredictionResponse|null;
    loading: boolean;
    appIsReady: boolean;

  
};

  
export default class HomeScreen extends React.Component {

  state:State = {
    image: null,
    predictionData: null,
    loading: false,
    appIsReady: false

  }

  async componentDidMount() {
    // Prevent native splash screen from autohiding
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
  }
  prepareResources = async () => {

    this.setState({ appIsReady: true }, async () => {
      await SplashScreen.hideAsync();
    });
  };

  render() {

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.container} >

                <View style={styles.titleContainer}>
                    <Text h1 >{AppConfig.title}</Text>

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
    let predictiopnResponse =  this.state.predictionData;
    if (this.state.loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>
    } else if (predictiopnResponse?.predictions ) {

        const predictions = predictiopnResponse.predictions.sort((a, b) => b.prob - a.prob).slice(0, 3);
        console.log(predictions)
        return (
            <View style={styles.predictionsContentContainer}>
                <Text h3>Predictions</Text>
                <View>
                    {
                        predictions.map((item, index) => (

                            <ListItem key={index} >
                                <ListItem.Content >

                                  <ListItem.Title>{item.class}</ListItem.Title>
                                  <ListItem.Subtitle>{`output: ${item.output}  prob: ${item.prob}`}</ListItem.Subtitle>
                                </ListItem.Content>

                              </ListItem>

                          
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

_classifyImage = async (imageURI:string) => {

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
    //paddingTop: 10,

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
