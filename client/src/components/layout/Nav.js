import React from 'react'
import PropTypes from 'prop-types'
import { FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Nav = props => {
  return (
    <nav className="navbar bg-dark">
      <h1><Link to=""><FaCode />Social & Devs</Link></h1>
      <ul>
        <li><Link to="">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  )
}

Nav.propTypes = {

}

export default Nav
