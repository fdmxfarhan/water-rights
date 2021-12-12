import axios from 'axios';

url = "http://192.168.14.126:3000";
// url = "https://meeraab.com";

api = axios.create({
    baseURL: url,
    timeout: 5000,
})

module.exports = api;
