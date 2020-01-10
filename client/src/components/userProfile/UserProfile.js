import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//comps.
import Spinner from '../layout/Spinner'
import Header from './Header'
//redux
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'


const UserProfile = ({ 
  profile: { profile , loading } , 
  auth , 
  getProfileById , 
  match : { params } 
}) => {
  useEffect(() => {
    getProfileById( params.userId )
  }, 
  [getProfileById , params.userId])
  
  return profile && !loading ? 
   <>
    <Link to='/profiles' className="btn btn-light">
      Back
    </Link>
    {
    auth.isAuthenticated && auth.loading === false && 
    auth.user._id === profile.user._id && (
      <Link to="/edit-profile">Edit Profile</Link>
      )
    }
    <div className="profile-grid my-1">
      <Header profile={profile}/>
    </div>
   </>
   :
   <Spinner /> 
}

UserProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile ,
  auth: state.auth
})
export default connect(
  mapStateToProps ,
  { getProfileById }
)(UserProfile)
