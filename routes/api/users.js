const express = require('express');
const router = express.Router();
//Validations
const { check , validationResult } = require('express-validator');
// Model for User
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// @route   POST api/users
// @desc    Register Users
// @access  Public   
router.post(
  '/' , 
  [
    check('name' , 'Please , input your name').not().isEmpty(),
    check('email', 'Please input a valid email address').isEmail(),
    check('password', 'Please input a password with 6 or more characters').isLength({ min: 6 })
  ] , 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name , email , password } = req.body;

    try {
      // User exists ?
      let user = await User.findOne({ email });
      if(user){
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
      }
      //Get an avatar for User 
      const avatar = gravatar.url( email , {
        s: '200',
        r: 'pg',
        d: 'mm' 
      })
      //Create User
      user = new User({ name , email , password , avatar });
        
      //Encrypt Password
          //hashing tool
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash( password , salt ); 
        
      await user.save();
      // GENERATE and Return JWT to the browser
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign( 
        payload , 
        config.get('jwtSecret') ,
        { expiresIn: 3600 } ,
        (err, token) => 
        {
          if(err) throw err ;
          res.json({token}) 
        }
      )
    }  
    catch (error) 
    {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;