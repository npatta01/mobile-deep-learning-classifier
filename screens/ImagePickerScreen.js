import React from 'react';
import {
  Image,
  StyleSheet,
  Button,
  Text,
  View,
} from 'react-native';
import { Permissions} from 'expo';
  
import { ImagePicker } from 'expo';

import axios from 'axios';


export default class ImagePickerScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    image: {},
    predictionData: null
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text> Image Classifier </Text>
          </View>

          <View style={styles.getStartedContainer}>
            <View>
              <Button
                      title="Pick an image from camera roll"
                      onPress={this._pickImage}
                    />
            </View>

            <View>
              <Button
              title="Take an image"
              onPress={this._takeImage}
            />
           </View>

          <Image source={this.state.image} style={{height: 200, width: 200}} />

          </View>


          <View> 
            {this.renderPredictions()}
          </View>
        </View>

     </View>
    );
  }

  renderPredictions () {
    
    if (this.state.predictionData){
      let {class: predictedClass,  predictions} = this.state.predictionData;
       predictions = predictions.sort((a,b) => b.loss - a.loss).slice(0,3);
       console.log(predictions)
      return (
         <View>
            <Text>Predicted Class: {predictedClass}</Text>
            {predictions.map(p => {
              return (
              <Text key={p.class}>class:{p.class} ; loss: {p.loss} </Text>               );
            })}
            
        </View>
      
      
      )
    }else{
      return null
    }
  }
  _pickImage = async () => {
    const status = await  this._verifyPermissions();

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);
    this._updateState(result);


  }

  _verifyPermissions = async () =>{
    console.log("In verify  Image")

    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
      const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      
      if (cameraPermission.status  === 'granted' && cameraRollPermission.status === 'granted') {
        console.log("Permissions granted")
        return true
      }else{
        alert('Hey! You heve not enabled selected permissions');
        return false
      }

    }
  }

  
  _takeImage = async () => {
    console.log("Before verify permission")

    const status = await  this._verifyPermissions();
    console.log("In Take Image")
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);
    this._updateState(result);

  };

  _updateState = async (result) =>{
    this.setState({image: {uri: result.uri}});
    await this._classifyImage(result.uri)
  }

  _classifyImage = async (uri ) => {
    let url = 'https://food-img-classifier.herokuapp.com/classify'
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    const data = new FormData();
    data.append('file', {
      uri: uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });


    const results = await axios.post(url,data, {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'

      }});
    console.log(results.data)

    this.setState({predictionData: results.data});

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  
});
