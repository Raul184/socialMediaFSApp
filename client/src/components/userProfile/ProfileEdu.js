import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'


const ProfileEdu = ({
  exp: { school , degree , fieldofstudy , current , to , from , description}}
  ) => {
    return <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> - 
        {!to ? 'Now' : <Moment format="YYYY/MM/DD">{from}</Moment>}
      </p>
      <p><strong>Degree:</strong>{degree}</p>
      <p><strong>Field of Study:</strong><span> {fieldofstudy}</span></p>
      <p><strong>Description:</strong><span> {description}</span></p>
    </div>
  
}

ProfileEdu.propTypes = {
  exp: PropTypes.object.isRequired,
}

export default ProfileEdu
