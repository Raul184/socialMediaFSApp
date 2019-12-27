import { 
  REGISTER_SUCCESS , 
  REGISTER_FAIL , 
  AUTH_ERROR , 
  USER_LOADED ,
  LOGIN_FAIL ,
  LOGIN_SUCCESS, 
  LOGOUT ,
  CLEAR_PROFILE
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
//actions
import { setAlert } from './alert';



// Verify registrated/logged in USER and load it in the client side
export const loadUser = () => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');  
    dispatch({
      type: USER_LOADED ,
      payload: res.data
    });
  } 
  catch (error) {
    dispatch({
      type: AUTH_ERROR 
    });
  }
};

// REGISTER AN USER
export const register = ({ name , email , password }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({name , email , password });
    try {
      const res = await axios.post('/api/users' , body , config );
      dispatch({
        type: REGISTER_SUCCESS ,
        payload: res.data
      });
      dispatch( loadUser() );
      return ;
    } 
    catch (error) {
      const err = error.response.data.errors;
      if(err){
        err.forEach(el => dispatch( setAlert( el.msg , 'danger')))
      } 
      dispatch({
        type: REGISTER_FAIL
      });
    }
  }


// LOGIN AN USER
export const login = ( email , password ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ email , password });
  try {
    const res = await axios.post('/api/auth' , body , config );
    console.log(res);

    dispatch({
      type: LOGIN_SUCCESS ,
      payload: res.data
    });
    dispatch( loadUser() );
  } 
  catch (error) {
    const err = error.response.data.errors; 
    if(err){
      err.forEach(el => dispatch( setAlert( el.msg , 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL 
    }) 
  }
}

// LOGOUT
export const logout = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  })
  dispatch({
    type: LOGOUT
  })
}