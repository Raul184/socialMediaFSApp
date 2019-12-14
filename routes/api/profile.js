const express = require('express');
const router = express.Router();
const middleware = require('../../Middleware/auth');
// Model
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route   GET api/profile/me
// @desc    Get current User profile
// @access Private 
router.get(
  '/me' ,
  middleware,
  async (req, res) => {
  try {
    // Find Profile ?
    const profile = 
      await Profile.findOne({ user: req.user.id }).populate(
        'user', [ 'name' , 'avatar' ]
      );

    if(!profile){
      res.status(400).json({ msg: 'Sorry , profile not found for current user'});
    }
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');  
  }
})


module.exports = router;