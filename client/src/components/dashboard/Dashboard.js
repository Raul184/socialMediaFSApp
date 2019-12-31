import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
//redx
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
//comps.
import Spinner from '../layout/Spinner';
import { DashActions } from './DashActions';


const Dashboard = ({ profile : { profile , loading } ,  auth: { user } , getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  },
  //eslint-disable-next-line 
  [])
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
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile ,
  auth: state.auth
})
export default connect(
  mapStateToProps ,
  { getCurrentProfile }
)(Dashboard);
