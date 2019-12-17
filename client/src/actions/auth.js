import { REGISTER_SUCCESS , REGISTER_FAIL, SET_ALERT } from './types';
import axios from 'axios';
//actions
import { setAlert } from './alert';


// REGISTER AN USER
export const register = ({ name , email , password }) => 
  async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({name , email , password });
    try {
      const res = await axios.post('api/users' , body , config );
      dispatch({
        type: REGISTER_SUCCESS ,
        payload: res.data
      });
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