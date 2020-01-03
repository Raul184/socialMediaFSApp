import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux'
import { deleteExp } from '../../actions/profile'


const Experiences = ({ experience , deleteExp }) => {
  const experiences = experience.map( 
    exp => ( 
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{exp.from}</Moment>
          {' '}
          - 
          { exp.to === null ? 
            ' Now ' 
            :
            <Moment format='YYYY/MM/DD'>{exp.to}</Moment> 
          }
        </td>
        <td style={{'display': 'flex' , 'justifyContent': 'center'}}>
          <button 
            className="btn btn-danger"
            onClick={() => deleteExp(exp._id)}
          >
            Delete
          </button>
        </td>
        
    </tr> 
  ))
  return (
    <div style={{'margin': '20px'}}>
      <h3 className='my-2'>Experience</h3>
      <table className="table" style={{'width': '100%'}}>
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  )
}

Experiences.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExp: PropTypes.func.isRequired,
}

export default connect(
  null ,
  { deleteExp }
)(Experiences)
