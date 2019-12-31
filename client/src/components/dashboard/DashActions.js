import React from 'react'
import { Link } from 'react-router-dom';
import { FaUser , FaBlackTie , FaUserGraduate } from 'react-icons/fa';


export const DashActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-primary">
        <FaUser/>
        Edit Profile
      </Link>
      <Link to="/edit-experience" className="btn btn-primary">
        <FaBlackTie/>
        Add Experience
      </Link>
      <Link to="/edit-education" className="btn btn-primary">
        <FaUserGraduate/>
        Add Education
      </Link>
    </div>
  )
}
