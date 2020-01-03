import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux'
import { deleteEdu } from '../../actions/profile'

const Education = ({ education  , deleteEdu }) => {
  const educ = education.map( 
    edu => ( 
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{edu.from}</Moment>
          {' '}
          - 
          { edu.to === null ? 
            ' Now ' 
            :
            <Moment format='YYYY/MM/DD'>{edu.to}</Moment> 
          }
        </td>
        <td style={{'display': 'flex' , 'justifyContent': 'center'}}>
          <button  
            className="btn btn-danger"
            onClick={() => deleteEdu(edu._id)}
          >
            Delete
          </button>
        </td>    
    </tr> 
  ))
  return (
    <div style={{'margin': '20px'}}>
      <h3 className='my-2'>Education Credentials</h3>
      <table className="table" style={{'width': '100%'}}>
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educ}</tbody>
      </table>
    </div>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired ,
  deleteEdu: PropTypes.func.isRequired
}

export default connect(
  null,
  { deleteEdu }
)(Education)
