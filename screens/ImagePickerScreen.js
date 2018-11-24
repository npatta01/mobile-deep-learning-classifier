import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,

} from 'react-native';

import { Button, Text, Icon , ListItem, FlatList} from 'react-native-elements';

import { Permissions} from 'expo';
  
import { ImagePicker,  Asset, ImageManipulator } from 'expo';

import axios from 'axios';

import humanFormat from 'human-format';


const data = {
  class: "bibimbap",
  predictions: [
    {
      class: "apple_pie", 
      loss: 0.15876001119613647
    }, 
    {
      class: "baby_back_ribs", 
      loss: 0.09508383274078369
    }, 
  ]
};



export default class ImagePickerScreen extends React.Component {
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
            <Text h1>What Food Is It? </Text>

          </View>

            <View style={styles.actionsContainer}>

                <View style={styles.callToActionContainer}>
                  <Icon
                    name='camera-alt' raised onPress={this._takeImage}/>

                  <Icon
                    name='image' raised onPress={this._pickImage}/>
                </View>

            </View>

          <View style={styles.imageContainer}>
            <Image source={this.state.image} style={{height: 200, width: 200}} />

          </View>


          <View style={styles.predictionsContainer}>
            {this.renderPredictions()}
          </View>
        </View>

     </ScrollView>
    );
  }

  renderPredictions () {
    
    if (this.state.loading){
      return <ActivityIndicator size="large" color="#0000ff" />
    }else if (this.state.predictionData){
      let {class: predictedClass,  predictions} = this.state.predictionData;
       predictions = predictions.sort((a,b) => b.loss - a.loss).slice(0,3);
       console.log(predictions)
      return (
         <View style={styles.predictionsContentContainer}>
            <Text h3>Predictions</Text>
            <Text h5>Most likely:   {predictedClass} </Text>
            <Text h3>Other possibilities</Text>
            <View>
              {predictions.map(p => {
                return (
                    <View key={p.class}  style={styles.predictionRow}>
                      <Text>{p.class}</Text>
                      <Text>loss: {p.loss}</Text>
                    </View>
                );
              })}
            </View>

            <View style={styles.feedBackContainer}>
                <Text h4  >Feedback</Text>
                <View style={styles.feedBackActionsContainer}>
                  <Icon
                      name='md-happy' raised onPress={this._takeImage} type="ionicon"/>

                  <Icon
                      name='md-sad' raised onPress={this._pickImage} type="ionicon"/>

                </View>

            </View>

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


    if (result.cancelled){
      console.log("Cancelled")
    }else{

      this._updateState(result);

    }





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

    if (result.cancelled){
      console.log("Cancelled")
    }else{
      this._updateState(result);

    }

  };

  _updateState = async (result) =>{
    
    const resizedResult = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: {width:400 }}],
      {  compress: 0.7}
    );
    
    console.log(resizedResult)

    this.setState({image: {uri: resizedResult.uri}, loading: true});
    await this._classifyImage(resizedResult.uri)
  }

  _classifyImage = async (uri ) => {
    let url = 'https://np-food-classifier.herokuapp.com/api/classify'
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    const data = new FormData();
    data.append('file', {
      uri: uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });


    try {
      const results = await axios.post(url,data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'

        },
        timeout: 2 * 60 * 1000, // 2 mins
      });
      console.log(results.data)
      this.setState({predictionData: results.data, loading: false });

    }catch (e){
      this.setState({loading: false });
      alert(e)
      console.log(e)

    }


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#fff',
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
  //  backgroundColor: "red",
    justifyContent: 'center',
  },
  actionsContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    flex: 1, 
  },
  imageContainer: {
    flex: 4 ,
    alignItems: 'center',

  },
  callToActionContainer: {
    flex: 1,
    flexDirection : "row"
  },
  feedBackContainer: {
    flex: 1,
  },

  feedBackActionsContainer: {
    flex: 1,
    flexDirection : "row"
  },

  predictionsContainer: {
    flex: 4, 
   // alignItems: "flex-start",
   // flexShrink: 2,
   //  backgroundColor: "red",
    padding: 10,
    justifyContent: 'center',
    
  },

  predictionsContentContainer: {
    flex: 4, 
   // alignItems: "flex-start",
   // flexShrink: 2,
   //  backgroundColor: "red",
    padding: 10,
    //justifyContent: 'center',
    //alignItems: 'center',

  },

  predictionRow: {
    //flex: 1,
    flexDirection: "row",
  //  alignItems: "flex-end",
  // borderColor: "red",
   // backgroundColor: "green",
    
    justifyContent: "space-between"


  },

  predictionRowCategory: {
    flex: 1,
    justifyContent: "space-between"
  },
  
  predictionRowlabel: {
    flex: 1, 
    justifyContent: "space-between"

  }
});
