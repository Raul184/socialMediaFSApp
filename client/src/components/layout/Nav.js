import React from 'react'
import PropTypes from 'prop-types'
import { FaCode, FaSignOutAlt , FaUserCircle} from 'react-icons/fa';
import { Link } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Nav = ({ isAuth , logout }) => {
  return (
    <nav className="navbar bg-dark">
      <h1><Link to=""><FaCode />Social & Devs</Link></h1>
      <ul>
        { isAuth ? 
          <>
            <li>
              <Link to="/dashboard">
              <FaUserCircle style={{"marginRight": "5px"}} />
              <span>Dashboard</span></Link>
            </li>
            <li><Link to="/posts">Posts</Link></li> 
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="#" onClick={logout}><FaSignOutAlt />{' '}Logout</Link></li> 
          </>
          : 
          <>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/profiles">Developers</Link></li>
          </>
        }        
      </ul>
    </nav>
  )
}

Nav.propTypes = {
  isAuth: PropTypes.bool,
}
const mapStateToProps = state => ({
  isAuth : state.auth.isAuthenticated 
});

export default connect(
  mapStateToProps ,
  { logout }
)(Nav)
