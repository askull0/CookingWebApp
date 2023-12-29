import axios from 'axios';
//const axios = require('axios').default;

export default axios.create({
    baseURL: "http://localhost:9000/api/v1",
    'Content-Type': 'application/json'
})