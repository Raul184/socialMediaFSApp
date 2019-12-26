import axios from 'axios';

const setAuthToken = token => {
  if(token){
    axios.defaults.headers['x-auth-token'] = token;
    return ;
  }
  else{
    delete axios.defaults.headers.common['x-auth-token'];
    return ;
  }
}

export default setAuthToken;