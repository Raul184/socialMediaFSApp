import React from 'react'
import PropTypes from 'prop-types'
import { FaCode, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Nav = ({ isAuth , logout }) => {
  return (
    <nav className="navbar bg-dark">
      <h1><Link to=""><FaCode />Social & Devs</Link></h1>
      <ul>
        <li><Link to="">Developers</Link></li>
        { isAuth ? 
          <li><Link to="#" onClick={logout}><FaSignOutAlt />{' '}Logout</Link></li> 
          : 
          <>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          </>
        }        
      </ul>
    </nav>
  )
}

Nav.propTypes = {
  isAuth: PropTypes.bool.isRequired,
}
const mapStateToProps = state => ({
  isAuth : state.auth.isAuthenticated 
});

export default connect(
  mapStateToProps ,
  { logout }
)(Nav)
