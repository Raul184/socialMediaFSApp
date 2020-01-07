import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
//spinner to be added in the future
//redux
import { connect } from 'react-redux';
import { getPost } from '../../actions/posts';

const Post = ({ post, loading , getPost , match , auth: { date , user } }) => {
  useEffect(() => {
    getPost(match.params.id)  
  }, 
  [getPost])
  return loading || post === null ? 
    'Spinner loading to be added' 
    :
    <>
    <Link to='/posts' className='btn'>Go back</Link>
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={post.post.avatar}
            alt=""
          />
          <h4>{post.post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.post.text}</p>
        <p className="post-date">
          Posted on {<Moment format="YYYY/MM/DD">{date}</Moment>}
        </p>
      </div>
    </div>
    </>
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  post: state.posts ,
  loading: state.posts.loading,
  auth: state.auth
})
export default connect(
  mapStateToProps ,
  { getPost }
)(Post)
