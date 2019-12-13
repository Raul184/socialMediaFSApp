const express = require('express');
const router = express.Router();
const middleware = require('../../Middleware/auth');
const User = require('../../models/User');


// @route     GET api/auth
// @desc      Log in User 
// @access    Public 
router.get('/' , middleware , async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error ');
  }
})


module.exports = router;