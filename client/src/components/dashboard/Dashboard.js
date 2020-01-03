import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
//redx
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { deleteAcc } from '../../actions/profile';
//comps.
import Spinner from '../layout/Spinner';
import { DashActions } from './DashActions';
import Experiences from './Experiences';
import Education from './Education';
//icon
import { FaUserMinus } from 'react-icons/fa'

const Dashboard = ({ profile : { profile , loading } ,  auth: { user } , getCurrentProfile , deleteAcc }) => {
  useEffect(() => {
    getCurrentProfile();
  },
  //eslint-disable-next-line 
  [ ])
  return loading && profile === null ? 
    <Spinner /> 
    :  
    <>
      <h1 className="large text-primary">hello</h1>
      <p className="lead">
        Welcome { user && user.name }
      </p>
      {profile !== null ? 
        <>
          <DashActions />
          <Education education={profile.education}/>
          <Experiences experience={profile.experience}/>

          <div className="my-2">
            <button 
              className="btn btn-danger"
              onClick={ () => deleteAcc() }
            >
              <FaUserMinus />{' '}
              Delete my account
            </button>
          </div>
        </>
        :
        <>
          <hr/>
          <Link to='/create-profile' className="btn btn-primary my-1">
            Create a profile
          </Link>
          <p><small>You have yet to create a profile , please add some info</small></p>
        </>
      }
    </>
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAcc: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile ,
  auth: state.auth
})
export default connect(
  mapStateToProps ,
  { getCurrentProfile , deleteAcc }
)(Dashboard);
