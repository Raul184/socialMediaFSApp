import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//icons
import { FaTwitter , FaFacebook , FaYoutube , FaInstagram , FaLinkedin } from 'react-icons/fa';


const Header = ({ 
  profile: { status , company , location , website , social ,
  user: { name , avatar }
  }
}) => {
  return (
    <div className="profile-top bg-primary my-1">
      <img 
        src={avatar} 
        alt="" 
        className="round-img my-1"
      />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status}{company && <span>{company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        { website && <Link to={website}/> }
        { social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter/></a>
        )}
        { social && social.facebook && (
          <a target="_blank" rel="noopener noreferrer" href={social.facebook}><FaFacebook/></a>
        )}
        { social && social.instagram && (
          <a target="_blank" rel="noopener noreferrer" href={social.instagram}><FaInstagram/></a>
        )}
        { social && social.youtube && (
          <a target="_blank" rel="noopener noreferrer" href={social.youtube}><FaYoutube/></a>
        )}
        { social && social.aedin && (
          <a target="_blank" rel="noopener noreferrer" href={social.linkedin}><FaLinkedin/></a>
        )}
      </div>
    </div>
  )
}

Header.propTypes = {
 profile: PropTypes.object.isRequired,
}

export default Header
