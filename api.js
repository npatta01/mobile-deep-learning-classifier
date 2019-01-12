import {AppConfig} from "./config";

const host = AppConfig.host;


const axiosClient = axios.create({
    baseURL: host,
    timeout: 50000, //50 seconds
});

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

    static predict = async (uri) => {
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        let data = new FormData();
        data.append('file', {
            uri: uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });

        console.log(data);
        const response = await axiosClient.post('/api/classify', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'

            }
        });

        console.log(response.data);

        return response.data
    }

}

export {ApiService};