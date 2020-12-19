const testAPI = require('axios');
/**
 * Axios defaults
 */
// axios.defaults.baseURL = 'http://149.28.158.115:3000'
testAPI.defaults.baseURL = 'http://localhost:8080/api';

// Headers
testAPI.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
// testAPI.defaults.headers.common.Accept = 'application/json';

export default testAPI;
