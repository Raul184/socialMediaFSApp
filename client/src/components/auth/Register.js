import React , { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
//packs
import { FaUser } from 'react-icons/fa';
import axios from 'axios';


const Register = props => {
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
      console.log('Alert on Redux');
    }
    else {
      const nueUser = { name , email , password };
      console.log(nueUser);
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
            required/>
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Confirm Password" 
            name="password2" 
            minLength="6" 
            onChange ={e => handleChange(e)}
            value={password2}
            required/>
        </div>
        <input type="submit" className="btn btn-primary" value="Register"/>
      </form> 
      <p className="my-1">Already have an account? <Link to='/login'>Sign In</Link></p>
    </>
  )
}

Register.propTypes = {

}

export default Register
