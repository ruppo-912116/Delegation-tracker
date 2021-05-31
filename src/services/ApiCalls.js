const axios = require('axios');


const instance = axios.create({
    baseURL: '[BASE_URL_HERE]',
    headers: {
        'Access-Control-Allow-Origin': true,
        //"X-Requested-With": "XMLHttpRequest"
    }
  });


  export default instance;