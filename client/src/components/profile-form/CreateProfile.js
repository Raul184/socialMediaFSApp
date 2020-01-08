import React , { useState } from 'react'
import PropTypes from 'prop-types'
import { Link , withRouter } from 'react-router-dom'
import { FaTwitter , FaFacebook , FaYoutube , FaInstagram , FaLinkedin } from 'react-icons/fa';
//rdx
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile , history }) => {
  const [ data , setData ] = useState({
    company: '' ,
    website: '' ,
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '' ,
    twitter: ' ',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });
  const { 
    company ,website , location, status, skills, githubusername, bio, twitter, facebook, linkedin,
    youtube,instagram 
  } = data;
  
  const [ displaySocial , toggleSocial ] = useState(false);

  const handleChange = e => {
    setData({
      ...data ,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = e => {
    e.preventDefault();
    createProfile( data , history );
    history.push('/dashboard')
  }
  return (
    <>
      <h1 className="large">Create profile</h1>
      <p className="lead">Some interesting facts about you</p>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <small>* required fields</small>
        <div className="form-group">
          <select name="status" value={status} onChange={handleChange} >
            <option value="0">--</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small>* Experience degree</small>
        </div>
        <div className="form-group">
          <input type="text" onChange={handleChange}placeholder="Company" name="company" value={company}/>
        </div>
        <div className="form-group">
          <input type="text" onChange={handleChange}name="website" placeholder="Web" value={website}/>
        </div>
        <div className="form-group">
          <input type="text" onChange={handleChange}name="location" placeholder="location" value={location}/>
          <small className="form-text">Country / city</small>
        </div>
        <div className="form-group">
          <input type="text" onChange={handleChange}name="skills" placeholder="Skills" value={skills} required/>
          <small className="form-text">* / Comma separated value ( JS , php , java ...)</small>
        </div>
        <div className="form-group">
          <input type="text" onChange={handleChange}name="githubusername" placeholder="Github account name" value={githubusername}/>
        </div>
        <div className="form-group">
          <small className="form-text">What about you?</small>
          <input type="text" onChange={handleChange}name="bio" placeholder="brief bio" value={bio}/>
        </div>
        <div className="my-2">
          <button className="btn" onClick={() => toggleSocial(!displaySocial)}>
            Social media
          </button>
        </div>
        {
          displaySocial && <>
            <div className="form-group social-input">
              <FaTwitter style={styles}/>
              <input type="text" onChange={handleChange} name="twitter" placeholder="Twitter url" value={twitter}/>
            </div>
            <div className="form-group social-input">
              <FaFacebook style={styles}/>
              <input type="text" onChange={handleChange} name="facebook" placeholder="Facebook url" value={facebook}/>
            </div>
            <div className="form-group social-input">
              <FaYoutube style={styles}/>
              <input type="text" onChange={handleChange} name="youtube" placeholder="Youtube url" value={youtube}/>
            </div>
            <div className="form-group social-input">
              <FaLinkedin style={styles}/>
              <input type="text" onChange={handleChange} name="linkedin" placeholder="Linkedin url" value={linkedin}/>
            </div>
            <div className="form-group social-input">
              <FaInstagram style={styles}/>
              <input type="text" onChange={handleChange} name="instagram" placeholder="Instagram url" value={instagram}/>
            </div>  
          </>
        }
        <input type="submit" className="btn btn-primary"/>
        <Link to='/dashboard' className="btn btn-light my-1">Back</Link>
      </form>
    </>
  )
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
}

const styles = {
  width: "2em" ,
  height: "2em" ,
  margin: "1em" ,
}

export default connect(
  null ,
  { createProfile }
)(withRouter(CreateProfile));
