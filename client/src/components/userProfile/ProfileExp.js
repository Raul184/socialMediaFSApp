import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'


const ProfileExp = ({
  exp: { company , title , location , current , to , from , description}}
  ) => {
    return <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> - {' '}
        {!to ? 'Now' : <Moment format="YYYY/MM/DD">{from}</Moment>}
      </p>
      <p><strong>Position:</strong><span> {title}</span></p>
      <p><strong>Description:</strong><span> {description}</span></p>
    </div>
  
}

ProfileExp.propTypes = {
  exp: PropTypes.object.isRequired,
}

export default ProfileExp
