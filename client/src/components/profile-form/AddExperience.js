import React , { useState } from 'react'
import { Link , withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { FaCodeBranch } from 'react-icons/fa'

const AddExperience = ({  addExperience , history }) => {
  const [ data , setData ] = useState({
    title: '' ,
    company: '' ,
    location: ' ' ,
    from: '' ,
    to: '' ,
    current: false ,
    description: ''
  })
  const [ toDateDisabled , toggleToDate ] = useState(false);

  const { title , company , location , from , to , current , description } = data;

  const handleChange = e => {
    setData({
      ...data ,
      [e.target.name] : e.target.value
    });
  }
  const handleSubmit = e => {
    e.preventDefault();
    addExperience(data , history);
  }
  return (
    <>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <FaCodeBranch /> 
        Add any developer/programming positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <small>* job title</small>
          <input 
            type="text"  
            name="title" 
            value={title} 
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <small>* Company</small>
          <input 
            type="text"  
            name="company" 
            value={company} 
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <small>Location</small>
          <input 
            type="text"  
            name="location"
            value={location} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input 
            type="date" 
            name="from"
            value={from} 
            onChange={handleChange} 
            required
          />
        </div>
          <div className="form-group">
            <p>
              <input 
                type="checkbox" 
                name="current" 
                value={current}
                checked={current}
                onChange={ e => {
                  setData({
                    ...data ,
                    current: !current
                  });
                  toggleToDate(!toDateDisabled)
                }}
              /> 
              {' '}Current Job
            </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input 
            type="date" 
            name="to"
            value={to} 
            onChange={handleChange}
            disabled={ toDateDisabled ? 'disabled' : ''} 
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} 
            onChange={handleChange}
          >  
          </textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
      </form>  
    </>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(
  mapStateToProps ,
  { addExperience }
)(withRouter(AddExperience));
