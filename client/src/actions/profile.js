import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE ,
  GET_PROFILES ,
  GET_REPOS ,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_PROFILE_EDUCATION_SUCCESS,
  DELETE_PROFILE_EDUCATION_FAIL,
  DELETE_PROFILE_EXPERIENCE_SUCCESS,
  DELETE_PROFILE_EXPERIENCE_FAIL,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
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

// GET ALL profiles
export const getAllProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })

  try {
    const res = await axios.get('/api/profile')
    dispatch({
      type: GET_PROFILES ,
      payload: res.data
    })
  } 
  catch (error) {
    dispatch({
      type: PROFILE_ERROR ,
      payload: { msg: error.response.data.msg  , status: error.response.status }
    });  
  }
}

// GET Profile BY ID
export const getProfileById = userId => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })

  try {
    const res = await axios.get(`/api/profile/${userId}`)
    dispatch({
      type: GET_PROFILE ,
      payload: res.data
    })
  } 
  catch (error) {
    dispatch({
      type: PROFILE_ERROR ,
      payload: { msg: error.response.data.msg  , status: error.response.status }
    });  
  }
}

// GET Github Repos for user Profile
export const getGithub = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`)
    dispatch({
      type: GET_REPOS ,
      payload: res.data
    })
  } 
  catch (error) {
    dispatch({
      type: PROFILE_ERROR ,
      payload: { msg: error.response.data.msg  , status: error.response.status }
    });  
    dispatch( setAlert( error.response.data.msg , "danger"))
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
      const res = await axios.post( '/api/profile/me' , formData , config );
      dispatch({
        type: GET_PROFILE ,
        payload: res.data
      });

      let editP = edit ? 'Profile Update' : 'Profile Created'
      dispatch( setAlert( editP , 'success'));
      if(edit){
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

//ADD Experience 
export const addExperience = (data , history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put(`api/profile/experience` , data , config );
    dispatch({
      type: UPDATE_PROFILE , 
      payload: res.data
    })
    dispatch( setAlert('Experience added' , 'success'));

    history.push('/dashboard')
  } 
  catch (error) {
    const errors = error.response.data.errors;
    errors && errors.forEach( err => setAlert( err.msg , 'danger' ));

    dispatch({
      type: PROFILE_ERROR ,
      payload: { msg: error.response.statusText , status: error.response.status }
    })
  }
}

//ADD Education 
export const addEducation = (data , history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put(`api/profile/education` , data , config );
    dispatch({
      type: UPDATE_PROFILE , 
      payload: res.data
    })
    dispatch( setAlert('Education added' , 'success'));

    history.push('/dashboard')
  } 
  catch (error) {
    const errors = error.response.data.errors;
    errors && errors.forEach( err => setAlert( err.msg , 'danger' ));

    dispatch({
      type: PROFILE_ERROR ,
      payload: { msg: error.response.statusText , status: error.response.status }
    })
  }
}

// DELETE Education
export const deleteEdu = id => async dispatch => {
  try {
    const profile = await axios.delete(`api/profile/education/${id}`)
    dispatch({
      type: DELETE_PROFILE_EDUCATION_SUCCESS ,
      payload: profile.data
    })
    dispatch( setAlert('Education deleted' , 'success'));  
  } 
  catch (error) {
    dispatch({
      type: DELETE_PROFILE_EDUCATION_FAIL ,
      payload: { msg: error.response.statusText , status: error.response.status }
    })
  }
}

// DELETE Experience
export const deleteExp = id => async dispatch => {
  try {
    const profile = await axios.delete(`api/profile/experience/${id}`)
    dispatch({
      type: DELETE_PROFILE_EXPERIENCE_SUCCESS ,
      payload: profile.data
    })
    dispatch( setAlert('Experience deleted' , 'success'));  
  } 
  catch (error) {
    dispatch({
      type: DELETE_PROFILE_EXPERIENCE_FAIL ,
      payload: { msg: error.response.statusText , status: error.response.status }
    })
  }
}


// DELETE account && profile
export const deleteAcc = () => async dispatch => {
  if(window.confirm('Are you sure? This canNOT be undone!'))
  {
    try {      
      await axios.delete('api/profile');

      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })

      dispatch( setAlert( 'Account deleted' , 'success' ))
    } 
    catch (error) {
      
    }
  }
}