import {
  GET_PROFILE , 
  PROFILE_ERROR ,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE_EXPERIENCE_SUCCESS,
  DELETE_PROFILE_EDUCATION_SUCCESS,
  DELETE_PROFILE_EDUCATION_FAIL,
  DELETE_PROFILE_EXPERIENCE_FAIL,
  GET_PROFILES,
  GET_REPOS
} from '../actions/types';


const initState = {
  profile: null ,
  profiles: [] ,
  repos: [] ,
  loading: true ,
  error: {}
}

export default function( state = initState , action){
  const { type , payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state ,
        ...payload ,
        loading: false
      }
    case GET_PROFILES:
      return {
        ...state ,
        ...payload , 
        loading: false 
      }
    case GET_REPOS:
      return {
        ...state , 
        repos: payload ,
        loading: false
      }
    case PROFILE_ERROR:
    case DELETE_PROFILE_EDUCATION_FAIL:
    case DELETE_PROFILE_EXPERIENCE_FAIL:
      return {
        ...state ,
        error: payload ,
        loading: false ,
        profile: null       
      }
    case CLEAR_PROFILE:
      return {
        ...state , 
        profile: null ,
        repos: [] ,
        loading: false
      }
    case UPDATE_PROFILE:
      return {
        ...state ,
        profile: payload ,
        loading: false
      }
    case DELETE_PROFILE_EXPERIENCE_SUCCESS:
    case DELETE_PROFILE_EDUCATION_SUCCESS:
      return {
        ...state ,
        profile: payload ,
        loading: false
      }
    default:
      return state;
  }
}