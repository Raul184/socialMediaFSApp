const express = require('express');
const router = express.Router();
const middleware = require('../../Middleware/auth');
//Model
const User = require('../../models/User');
const { check , validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

// Match Tokens , Verify User and send it 
router.get(
  '/' ,
  middleware,
  async ( req , res ) => {
    try {
      const user = await User.findById( req.user.id ).select('-password');
      res.json(user);  
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
)
// @route     POST api/auth
// @desc      Authenticate User and get Token (Login)
// @access    Public 
router.post(
  '/' , 
  [
    check('email' , 'Please include a valid email').isEmail() ,
    check('password' , 'Password is required').exists()
  ] , 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email , password } = req.body;
    try 
    {
      const user = await User.findOne({ email });
      //User don't exists
      if(!user)
      {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
      }
      const isMatch = await bcrypt.compare( password , user.password )
      //Wrong password ?
      if(!isMatch)
      {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
      }
      const payload = {
        user: {
          id: user.id
        }
      }
      // JWT
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        ( err , token ) => { 
          if(err) throw err 
          res.json(token)
        }
      );
    } 
    catch (error) 
    {
      console.log(error.message);
      res.status(500).send('Server Error ');
    }
})
module.exports = router;