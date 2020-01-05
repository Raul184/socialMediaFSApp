import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/tenor.gif'
//redux
import { connect } from 'react-redux'
import { getPosts } from '../../actions/posts'


const Posts = ({ getPosts , posts : { posts , loading } }) => {
  useEffect(
    () => {
      getPosts();  
    }, 
  [getPosts])

  return (
    <>
      
    </>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(
  mapStateToProps ,
  { getPosts }
)(Posts)
