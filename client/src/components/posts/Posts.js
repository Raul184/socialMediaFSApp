import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
// import Spinner from '../layout/tenor.gif'
//redux
import { connect } from 'react-redux'
import { getPosts } from '../../actions/posts'
//comps.
import PostItem from './PostItem';
import PostForm from './PostForm'

const Posts = ({ getPosts , post : { posts , loading } }) => {
  useEffect(
    () => {
      getPosts();  
    }, 
  [getPosts])

  return (
    <>
      <h1 className="large text-primary">Welcome to the community</h1>
      <PostForm />
      <div className="posts">
        {posts.map( post => <PostItem key={post._id} post={post}/> )}
      </div>
    </>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  post: state.posts
})

export default connect(
  mapStateToProps ,
  { getPosts }
)(Posts)
