const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function( req, res , next ){
  //Get token
  const token = req.header('x-auth-token');

  if(!token){
    res.status(401).json({ err: 'No token , authoritazion denied'});
  }
  try {
    const decoded = jwt.verify(token , config.get('jwtSecret'));
    
    req.user = decoded.user;
    next();  
  } 
  catch (error) {
    res.status(401).json({ err: 'Token not valid'})
  }
}