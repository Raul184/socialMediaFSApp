import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { FaTimes , FaThumbsDown , FaThumbsUp } from 'react-icons/fa';
//redux
import { connect } from 'react-redux'
import { addLikes , removeLikes , deletePost } from '../../actions/posts'

const PostItem = ({ 
  post: { _id , text , name , comments , avatar , user , likes , date } , 
  auth ,
  addLikes ,
  removeLikes ,
  deletePost
  }) => {
    return (
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt=""
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on {<Moment format="YYYY/MM/DD">{date}</Moment>}
        </p>
        <button onClick={() => addLikes(_id)} type="button" className="btn btn-light">
          <FaThumbsUp />
          <span>{likes.length}</span>
        </button>
          <button onClick={() => removeLikes(_id)} type="button" className="btn btn-light">
            <FaThumbsDown />
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion 
            <span className='comment-count'>{comments.length}</span>
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button onClick={() => deletePost(_id)} type="button" className="btn btn-danger">
              <FaTimes />
            </button>
          )}
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object,
  auth: PropTypes.object,
  deletePost: PropTypes.func.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeLikes: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(
  mapStateToProps ,
  { addLikes , removeLikes , deletePost }
)(PostItem)
