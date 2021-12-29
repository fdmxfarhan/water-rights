import axios from 'axios';

// url = "http://192.168.14.83:3000";
// url = "https://meeraab.com";
url = "https://juniorcup.ir";

api = axios.create({
    baseURL: url,
    timeout: 5000,
})

module.exports = api;
