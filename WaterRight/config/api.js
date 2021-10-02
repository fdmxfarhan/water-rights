import axios from 'axios';

// url = "http://192.168.38.1:3000";
url = "http://185.81.96.93";
api = axios.create({baseURL: url})
module.exports = api;