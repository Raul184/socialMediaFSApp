import React , { useState } from 'react'
import PropTypes from 'prop-types'
import { Link , withRouter } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
//packs
import { FaUser } from 'react-icons/fa';


const Register = ({ setAlert , register , history }) => {
  const [ formData , setData ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name , email , password ,password2 } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== password2){
      setAlert('Passwords don\'t match' , 'danger')
    }
    else {
      register({ name , email , password })
      history.push('/dashboard');
    }
  }

  const handleChange = e => {
    setData({
      ...formData ,
      [ e.target.name ] : e.target.value 
    })
  }
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <FaUser/>Create your account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type ="text" 
            placeholder ="Name" 
            name ="name" 
            onChange ={e => handleChange(e)}
            value ={name}
            required
          />
        </div>
        <div className="form-group">
          <input 
            type ="email" 
            placeholder ="Email" 
            name ="email"
            onChange ={e => handleChange(e)}
            value ={email} 
            required
          />
          <small className="form-text">
            Please , if you want a profile image use a Gravatar email.
          </small>
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            minLength="6"
            onChange ={e => handleChange(e)}
            value={password} 
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Confirm Password" 
            name="password2" 
            minLength="6" 
            onChange ={e => handleChange(e)}
            value={password2}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register"/>
      </form> 
      <p className="my-1">Already have an account? <Link to='/login'>Sign In</Link></p>
    </>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
}

export default connect(
  null ,
  { setAlert , register }
)(withRouter(Register));
