import axios from 'axios';

// url = "http://192.168.14.60:3000";
url = "https://mirab.ir";
api = axios.create({baseURL: url})
module.exports = api;