import axios from 'axios';

// url = "http://192.168.38.1:3000";
url = "https://juniorcupsetup.ir";
api = axios.create({baseURL: url})
module.exports = api;