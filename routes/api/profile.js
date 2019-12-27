const express = require('express');
const router = express.Router();
const middleware = require('../../Middleware/auth');
// Model
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check , validationResult } = require('express-validator');
// Request ==> Hit third party Api from Server Side of App
const request = require('request');
const config = require('config');


// @route   GET api/profile/me
// @desc    Get current User profile
// @access Private 
router.get(
  '/me' ,
  middleware,
  async (req, res) => {
  try {
    // Find Profile ?
    const profile = await Profile.findOne({ user: req.user.id }).populate( 
      'user', 
      [ 'name' , 'avatar' ]
    );

    if(!profile){
      return res.status(400).json({ msg: 'No associated profile for this user'});
    }
    res.json({ profile });
  } 
  catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');  
  }
})


// @route   POST api/profile/me
// @desc    Create/Update an User profile
// @access Private 
router.post(
  '/me' ,
  [ middleware , 
  check( 'status' , 'Status is required').not().isEmpty() ,
  check( 'skills' , 'Skills is required').not().isEmpty()
  ],
  async ( req , res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    // Get Data
    const { 
      company ,
      website ,
      location ,
      bio ,
      status ,
      githubusername ,
      skills ,
      youtube ,
      facebook ,
      twitter ,
      instagram ,
      linkedin
    } = req.body;
    // Build profile obj to send to DB
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    //social (initialize)
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;
   
    console.log(profileFields);
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if(profile){
        //then update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id } ,
          { $set: profileFields } ,
          { new: true }
        );
          // and return the new updated profile
        return res.json({profile})
      }
      // If the profile don't exists => Create 
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } 
    catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  } 
)

// @route   GET api/profile
// @desc    Get all profiles
// @access Public
router.get(
  '/',
  async (req , res) => {
    try {
      const profiles = await Profile.find().populate('user', [ 'name' , 'avatar' ]);
      res.json({profiles})
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
)

// @route   GET api/profile/user/:user_id
// @desc    Get profile by userID
// @access Public
router.get(
  '/user/:user_id',
  async (req , res) => {
    try {
      const userProfile = await Profile.findOne({ user: req.params.user_id }).populate('user', [ 'name' , 'avatar' ]);
      if(!userProfile){
        return res.status(400).json({ msg: 'Profile not found'});
      }
      res.json({ userProfile })
    } 
    catch (error) {
      console.error(error.message);
      error.kind === 'ObjectId' ? 
        res.status(400).json({ msg: 'Profile not found'})
        :
        res.status(500).send('Server Error');
    }
  }
)

// @route   DELETE api/profile
// @desc    Delete profile , user & posts 
// @access Private
router.delete(
  '/' ,
  middleware ,
  async (req , res) => {
    try {
      // Remove Profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove User
      await User.findOneAndRemove({ _id: req.user.id });
      res.json({ msg: 'User deleted'});  
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
)

// @route   PUT api/profile/experience
// @desc    Update profile experience 
// @access Private
router.put(
  '/experience' ,
  [ middleware ,
    [
      check('title' , 'Title field is required').not().isEmpty() ,
      check('company' , 'Company field is required').not().isEmpty() ,
      check('from' , 'Date field is required').not().isEmpty()
    ]
  ] , 
  async ( req , res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    const { title , 
      company , 
      location , 
      from , 
      to , 
      current , 
      description } = req.body ;
    
      //Field in DB
    const nueExperience = {
      title , company , location , from , to , current , description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.unshift(nueExperience);
      await profile.save();
      res.json(profile);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server error..');
    }
  }
)

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete profile experience 
// @access Private
router.delete(
  '/experience/:exp_id' ,
  middleware ,
  async ( req , res ) => 
  {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      //Get Index to remove
      const removeI = 
        profile.experience.map(item => item.id).indexOf(req.params.exp_id);
      //remove & Save
      profile.experience.splice( removeI , 1 );
      await profile.save();

      res.json(profile);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');  
    }
  }
)

// @route   PUT api/profile/education
// @desc    Update profile education 
// @access Private
router.put(
  '/education' ,
  [ middleware ,
    [
      check('school' , 'School field is required').not().isEmpty() ,
      check('degree' , 'Degree field is required').not().isEmpty() ,
      check('fieldofstudy' , 'Field of study is required').not().isEmpty() ,
      check('from' , 'Date field is required').not().isEmpty()
    ]
  ] , 
  async ( req , res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      school , 
      degree , 
      fieldofstudy , 
      from , 
      to , 
      current , 
      description } = req.body ;
    
      //Field in DB
    const nueEdu = {
      school , degree , fieldofstudy  , from , to , current , description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.unshift(nueEdu);
      await profile.save();
      res.json(profile);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server error..');
    }
  }
)

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete profile education
// @access  Private
router.delete(
  '/education/:edu_id' ,
  middleware ,
  async ( req , res ) => 
  {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //Get Index to remove
      const removeI = 
        profile.education.map(item => item.id).indexOf(req.params.edu_id);
      //remove & Save
      profile.education.splice( removeI , 1 );
      await profile.save();
      res.json(profile);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');  
    }
  }
)

// @route   GET api/profile/github/:username
// @desc    Get user repos
// @access  Public
router.get(
  '/github/:username' ,
  async (req , res) => {
    try {
      const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=${config.get('githubClientSecret')}` ,
        method: 'GET' ,
        headers: { 'user-agent' : 'node-js' }
      };

      request( options , ( error , response , body ) => {
        if(error) {
          console.log(error);
          return ;
        }
        if( response.statusCode !== 200 ){
          return res.status(404).json({ msg: "Github profile not found"});
        }
        res.json(JSON.parse(body));
      })
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
)


module.exports = router;