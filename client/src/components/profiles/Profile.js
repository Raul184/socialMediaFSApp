import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
//Comps.
import ProfileItem from './ProfileItem'
import Spinner from '../layout/Spinner'
//redux
import { connect } from 'react-redux'
import { getAllProfiles } from '../../actions/profile'

const Profile = ({ getAllProfiles  , profile: { profiles , loading }}) => {
  useEffect(() => {
    getAllProfiles();
  }, 
  [getAllProfiles])
  
  return profiles && !loading ? 
  <>
    <h1 className="large text-primary">Developers</h1>
    <p className="lead">Browse and connect with developers</p>
    <div className="profiles">
      { profiles.length > 0 ? 
          profiles.map( el => 
            <ProfileItem key={el._id} prof={el} />
          )
        : 
        <>
          <h4> "Profiles not found.." </h4>
        </>
      }
    </div>
  </>
  :
  <Spinner />
}

Profile.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(
  mapStateToProps ,
  { getAllProfiles }
)(Profile)
