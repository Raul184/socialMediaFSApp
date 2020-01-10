import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
//redux
import { connect } from 'react-redux'
import { getGithub } from '../../actions/profile'
import Spinner from '../layout/Spinner'


const ProfileGithub = ({ name , getGithub , repos }) => {
  useEffect(() => {
    console.log(name);
    getGithub(name);  
  }, 
  [getGithub , name])
  return <div className="profile-github">
    <h2 className="text-primary">Github repos</h2>
    {
      repos === null ? <Spinner/> : (
        repos.map( el => <div key={el._id} className="repo bg-white p-1 my-1">
          <div>
            <h4><a href={el.html_url} target="_blank" rel="noopener noreferrer">
              {el.name}  
            </a></h4>
            <p>{el.description}</p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">
                Stars: {el.stargazers_count}
              </li>
              <li className="badge badge-dark">
                Watchers: {el.watchers_count}
              </li>
              <li className="badge badge-light">
                Forks: {el.forks_count}
              </li>
            </ul>
          </div>
        </div>)  
      )
    }
  </div>
}

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithub: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(
  mapStateToProps ,
  { getGithub }
)(ProfileGithub)
