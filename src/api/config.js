// client.js

var pack = require('axios');

var axios = pack.create({
  baseURL: 'http://104.197.180.47/peruven/api/',
  //baseURL: 'http://104.197.180.47/sistema-administrativo/api/'
});

export default axios;
