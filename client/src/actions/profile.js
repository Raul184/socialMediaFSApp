import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE ,
  PROFILE_ERROR
} from './types';

// GET current User profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const req = await axios.get('http://localhost:5000/api/profile/me');
    dispatch({
      type: GET_PROFILE ,
      payload: req.data
    });
  } 
  catch (error) {
    dispatch({
      type: PROFILE_ERROR ,
      payload: { msg: error.response.data.msg  , status: error.response.status }
    });  
  }
}