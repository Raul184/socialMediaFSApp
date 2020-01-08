import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
//spinner to be added in the future
import Comments from './Comments'
import Comment from './Comment'
//redux
import { connect } from 'react-redux';
import { getPost } from '../../actions/posts';

const Post = ({ posts , loading , getPost , match , auth: { date , user } }) => {
  useEffect(() => {
    getPost(match.params.id)  
  }, 
  [ getPost , match.params.id ])
  return loading  || posts === null ? 
    'Spinner loading to be added' 
    :
    <>
    <Link to='/posts' className='btn'>Go back</Link>
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={posts.avatar}
            alt=""
          />
          <h4>{posts.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{posts.text}</p>
        <p className="post-date">
          Posted on {<Moment format="YYYY/MM/DD">{date}</Moment>}
        </p>
      </div>
    </div>
    <Comments postId={posts._id}/>
    {
      posts.comments.map(el => {
        return <Comment key={el._id} comment={el} postId={posts._id} />
      })
    }
    </>
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  posts: state.posts.post ,
  loading: state.posts.loading,
  auth: state.auth
})
export default connect(
  mapStateToProps ,
  { getPost }
)(Post)
