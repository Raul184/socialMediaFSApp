import { 
  POST_ERROR, 
  GET_POSTS ,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
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

// ADD Likes
export const addLikes = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES ,
      payload: { id , likes: res.data }
    })
  } 
  catch (error) {
    dispatch({
      type: POST_ERROR ,
      payload: { msg: error.response.statusText , status: error.response.status }
    })
  }
}

// REMOVE Likes
export const removeLikes = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES ,
      payload: { id , likes: res.data }
    })
  } 
  catch (error) {
    dispatch({
      type: POST_ERROR ,
      payload: { msg: error.response.statusText , status: error.response.status }
    })
  }
}

// REMOVE a Post
export const deletePost = id => async dispatch => {
  try {
    //eslint-disable-next-line
    const res = await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST ,
      payload: id
    })
    dispatch( setAlert( 'Post removed' , 'success'))
  } 
  catch (error) {
    dispatch({
      type: POST_ERROR ,
      payload: { msg: error.response.statusText , status: error.response.status }
    })
  }
}

// ADD a Post
export const addPost = data => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/posts/` , data , config);
    dispatch({
      type: ADD_POST ,
      payload: res.data
    })
    dispatch( setAlert( 'Post added' , 'success'))
  } 
  catch (error) {
    dispatch({
      type: POST_ERROR ,
      payload: { msg: error.response.statusText , status: error.response.status }
    })
  }
}

// GET a Post 
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    
    dispatch({
      type: GET_POST , 
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

// ADD a Comment
export const addComment = (id , data) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/posts/comment/${id}` , data , config);
    dispatch({
      type: ADD_COMMENT ,
      payload: res.data
    })
    dispatch( setAlert( 'Comment included' , 'success'))
  } 
  catch (error) {
    dispatch({
      type: POST_ERROR ,
      payload: { msg: error.response.statusText , status: error.response.status }
    })
  }
}

// DELETE a Comment
export const deleteComment = (postId , commentId) => async dispatch => {
  try {
    //eslint-disable-next-line
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT ,
      payload: commentId
    })
    dispatch( setAlert( 'Comment removed' , 'success'))
  } 
  catch (error) {
    dispatch({
      type: POST_ERROR ,
      payload: { msg: error.response.statusText , status: error.response.status }
    })
  }
}