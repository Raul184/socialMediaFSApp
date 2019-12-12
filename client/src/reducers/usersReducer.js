import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT
} from '../actions/types';

const initState = {
  token: null ,
  isAuthenticated: false ,
  loading: false ,
  user: null ,
  error: null 
}

export default ( state=initState , action) => {
  switch(action.type){
    case REGISTER_SUCCESS:
      return {

      }
    default:
      return state;
  }
}