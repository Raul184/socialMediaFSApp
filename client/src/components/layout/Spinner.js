import React from 'react'
import spinner from './tenor.gif'


export default () => (
  <div style={styles}>
    <img src={spinner} alt=".." style={{ width: "50%"}}/>
  </div>
  
)

const styles = {
  width: "100%" , 
  margin: "0 auto",
  textAlign: "center"
}
