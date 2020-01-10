import React from 'react'
import PropTypes from 'prop-types'

const Main = ({ profile: { bio , skills , user: { name }}}) => {
  
  return <div className="profile-about bg-light p-2">
    { bio && 
      <>
        <h2 className="text-primary">{name}'s bio</h2>
        <p>{bio}</p>
        <div className="line"></div>
      </>
    }
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        { skills && skills.map( (el , i) => <div key={i} className="p-1">{el}</div>)}
      </div>
    </div>
}

Main.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default Main
