import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
//redux
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/posts'

const Comment = ({ 
  deleteComment , 
  comment : { _id , text , avatar , name , user , date } , 
  postId , 
  auth 
}) => (
    <div className="post bg-white my-1 p-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt="" className="round-img"/>
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        { !auth.loading && user === auth.user._id && (
          <button
            type='button'
            className="btn btn-danger" 
            onClick={e => deleteComment( postId , _id )}
          >X
          </button>)
        }
      </div>
    </div>
  )

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment:PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(
  mapStateToProps ,
  { deleteComment }
)(Comment)
