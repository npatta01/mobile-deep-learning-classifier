import {AppConfig} from "../config";

const host = AppConfig.host;
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { FileSystemUploadType } from "expo-file-system";

const axiosClient = axios.create({
    baseURL: host,
    timeout: 50000, //50 seconds
});

interface Prediction{
    class:string,
    output:number,
    prob:number
}

interface PredictionResponse{
    class:string,
    predictions:Prediction[]
}


class ApiService {

    static ping = async () => {
        const results = await axiosClient.get('/ping');
        console.log(results.data);
        return results.data
    };

    static loadClasses = async () => {
        const results = await axiosClient.get('/api/classes');
        const data = results.data;
        console.log(data);
        return data
    };

    static predict = async (uri:string) => {
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        // let data = new FormData();
        // data.append('file', {
        //     uri: uri,
        //     name: `photo.${fileType}`,
        //     type: `image/${fileType}`,
        // });

        // console.log(data);
        // const response = await axiosClient.post('/api/classify', data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Accept': 'application/json'

        //     }
        // });

        // console.log(response.data);

        // https://github.com/expo/expo/issues/10313
        const uploadType= FileSystemUploadType.MULTIPART;
        let predictions:Prediction[]|null = null;
        const response = await FileSystem.uploadAsync(`${host}/api/classify`, uri, {
            uploadType: uploadType,
            httpMethod: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            fieldName: "file",
            mimeType: `image/${fileType}`,
            parameters: {
               // "uploadType" :uploadType
            }
        });

        console.log(response);

        if (response.status == 200){
            return  JSON.parse(response.body) as PredictionResponse ;
        }else{
            return null;
        }
    }

}

export {ApiService,Prediction,PredictionResponse};