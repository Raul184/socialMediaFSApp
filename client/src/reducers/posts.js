import {
  GET_POSTS ,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST
} from '../actions/types';



const initState = {
  posts: [] ,
  post: null , 
  loading: true ,
  error: {} 
}

export default ( state = initState , action ) => {
  const { type , payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state ,
        posts: payload ,
        loading: false 
      }
    case ADD_POST:
      return {
        ...state ,
        posts: [ payload , ...state.posts ] ,
        loading: false
      }
    case POST_ERROR:
      return {
        ...state ,
        loading: false , 
        error: payload 
      }
    case UPDATE_LIKES:
      return {
        ...state ,
        posts: 
          state.posts.map( post => post._id === payload.id ? { ...post , likes: payload.likes } : post ) ,
        loading: false 
      }
    case DELETE_POST:
      return {
        ...state ,
        posts: state.posts.filter( p => p._id !== payload ) ,
        loading: false
      }
    default:
      return state;
  }
}