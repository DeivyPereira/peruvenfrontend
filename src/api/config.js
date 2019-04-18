// client.js
import localStorage from 'reactive-localstorage';
var pack = require('axios');

var axios = pack.create({
  //baseURL: 'http://localhost/peruven/',
  baseURL: 'http://104.197.180.47/peruven/api/'
});

localStorage.on('change', ( key, value ) => {
  if( key === "token" ){
    axios.defaults.headers.common[ "Authorization" ] = value;
  }
})

axios.defaults.headers.common[ "Authorization" ] = window.localStorage.token;

export default axios;
