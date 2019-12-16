import React , { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
//packs
import { FaUser } from 'react-icons/fa';
import axios from 'axios';


const Login = props => {
  const [ formData , setData ] = useState({
    email: '',
    password: ''
  });
  const { email , password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const handleChange = e => {
    setData({
      ...formData ,
      [ e.target.name ] : e.target.value 
    })
  }
  return (
    <>
      <h1 className="large text-primary">Sign in</h1>
      <p className="lead">
        <FaUser/>Sign into your account 
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type ="email" 
            placeholder ="Email" 
            name ="email"
            onChange ={e => handleChange(e)}
            value ={email} 
            required
          />
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
        <input type="submit" className="btn btn-primary" value="Log in"/>
      </form> 
      <p className="my-1">Don't have an account? <Link to='/register'>Sign Up</Link></p>
    </>
  )
}

Login.propTypes = {

}

export default Login
