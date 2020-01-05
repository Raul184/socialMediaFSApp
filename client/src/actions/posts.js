import { 
  POST_ERROR, 
  GET_POSTS 
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('api/posts');
    
    dispatch({
      type: GET_POSTS , 
      payload: res.data
    })
  } 
  catch (error) {
    
    dispatch({
      type: POST_ERROR ,
      payload: { msg: error.response.statusText , status: error.response.status }
    })
  }
}