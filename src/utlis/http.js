const axios = require('axios');
var {apiHost} = require('@config');
axios.defaults.baseURL = apiHost;
const httpReq = axios.create({
    timeout: 1000,
});
export default httpReq;