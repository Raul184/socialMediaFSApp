import React , { useState } from 'react' 
import PropTypes from 'prop-types'
import { Link , withRouter } from 'react-router-dom'
//redux
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile'
//icon
import { FaCodeBranch } from 'react-icons/fa';

const AddEducation = ({ addEducation , history}) => {
  const [ data , setData ] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '' ,
    to: '' ,
    current: false ,
    description: ''
  });
  const [ dateDisabled , toggleDisabled ] = useState(false);

  const { school , degree , fieldofstudy , from , to , current , description } = data;

  const handleChange = e => {
    setData({ 
      ...data ,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = e => {
    e.preventDefault();
    addEducation( data , history );
  }
  return (
    <>
      <h1 className="large text-primary">Add your education</h1>
      <p className="lead">
        Any bootcamp?
        <FaCodeBranch/>
      </p>
      <small>* required fields</small>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <small>* School</small>
          <input 
            type="text"
            name='school' 
            value={school}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <small>* Degree</small>
          <input 
            type="text"
            name='degree'
            value={degree}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <small>Field</small>
          <input 
            type="text"
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <small>From</small>
          <input 
            type="date"
            name='from'
            value={from}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="checkbox"
            name='current'
            value={current}
            checked={current}
            onChange={
              e => {
                setData({ ...data , current: !current })
                toggleDisabled(!dateDisabled);
              }
            }
          />{' '}Current
        </div>
        <div className="form-group">
          <small>To</small>
          <input 
            type="date"
            name='to'
            value={to}
            onChange={handleChange}
            disabled={dateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className="form-group">
          <textarea 
            name="description" 
            cols="30" 
            rows="5"
            placeholder="Job description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <input type="submit" className='btn btn-primary my-1'/>
        <Link to="/dashboard" className="btn btn-light my-1">Back</Link>
      </form>
    </>
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
}

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation))
