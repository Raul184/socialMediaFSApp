import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//comps.
import Spinner from '../layout/Spinner'
import Header from './Header'
import Main from './Main'
import ProfileExp from './ProfileExp'
import ProfileEdu from './ProfileEdu'
import ProfileGithub from './ProfileGithub'

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
  
  return profile !== null && !loading ? 
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
      <Main profile={profile}/>
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        {
          profile.experience.length > 0 ? 
            profile.experience.map(el => 
              <ProfileExp key={el._id} exp={el} />
            )
          : 
          <h4>No professional experiences listed</h4>
        }
      </div>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        {
          profile.education.length > 0 ? <>
            {profile.education.map(el => <ProfileEdu key={el._id} exp={el} />)}
          </> 
          : 
          <h4>No education listed</h4>
        }
      </div>
      {
      profile.githubusername && ( 
        <ProfileGithub name={profile.githubusername}/>
        )
      }
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
