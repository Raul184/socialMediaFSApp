import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE ,
  PROFILE_ERROR
} from './types';

// GET current User profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const req = await axios.get('/api/profile/me');
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
    dispatch(setAlert( error.response.data.msg , 'danger' ));
  }
}

// Create or Update a Profile
export const createProfile = ( formData , history , edit=false ) => 
  async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': "application/json"
        }
      }
      const res = await axios.post( '/api/profile' , formData , config );
      dispatch({
        type: GET_PROFILE ,
        payload: res.data
      });

      let editP = edit ? 'Profile Update' : 'Profile Created'
      dispatch( setAlert( editP , 'success'));
      if(!edit){
        history.push('/dashboard')
      }
    } 
    catch (err) {
      dispatch({
        type: PROFILE_ERROR ,
        payload: { msg: err.response.statusText  , status: err.response.status }
      });  
    }
}