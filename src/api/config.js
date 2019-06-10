// client.js
import localStorage from 'reactive-localstorage';
var pack = require('axios');

var axios = pack.create({
  //baseURL: 'http://localhost/peruven-api/',
  baseURL: 'https://www.enviosperuven.com/api/'
});

localStorage.on('change', ( key, value ) => {
  if( key === "token" ){
    axios.defaults.headers.common[ "Authorization" ] = value;
  }
})

axios.defaults.headers.common[ "Authorization" ] = window.localStorage.token;

export default axios;
