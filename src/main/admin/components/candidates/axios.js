import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.20.0.2:3001/',
    withCredentials: true,
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

export default instance;