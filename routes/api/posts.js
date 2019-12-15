const express = require('express');
const router = express.Router();
const middleware = require('../../Middleware/auth');
const { check , validationResult } = require('express-validator');
//Models
const PostsSchema = require('../../models/Posts');
const User = require('../../models/User');
const Profile = require('../../models/Profile');


// @route     POST api/posts
// @desc      Post something
// @access    Private 
router.post(
  '/' , 
  [ middleware ,
    [
      check('text' , 'Please, introduce some text').not().isEmpty()
    ]
  ],
  async (req, res) => 
  {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }
    //Everything ok ==> Get Data from User's post
    try {
      const { text } = req.body;
      //Grab avatar and name from User json in DB
      const user = await User.findById(req.user.id).select('-password');
    
      const userPost = new PostsSchema({
        user: req.user.id ,
        text ,
        name: user.name ,
        avatar: user.avatar 
      });
      const post = await userPost.save()
      res.json(post);
    } 
    catch (error) {
      console.error(error);
      res.status(500).send('Server Error');  
    }
});

// @route     GET api/posts
// @desc      Get all posts
// @access    Private 
router.get(
  '/' ,
  middleware ,
  async( req, res ) => {
    try {
      const posts = await PostsSchema.find.sort({ date: -1});
      if(!posts){
        return res.status(404).json({ msg: 'Sorry , the dog eat all posts'})
      }
      res.json(posts);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');  
    }
  }
)

// @route     GET api/posts/:id
// @desc      Get post by id
// @access    Private 
router.get(
  '/:id' ,
  middleware ,
  async( req, res ) => {
    try {
      const post = await PostsSchema.findById(req.params.id);
      if(!post){
        return res.status(404).json({ msg: 'Post not found'})
      }
      res.json(post);
    } 
    catch (error) {
      console.error(error.message);
      if(error.kind === 'ObjectId'){
        return res.status(404).json({ msg: 'Post not found'})
      }
      res.status(500).send('Server Error');  
    }
  }
)

// @route     DELETE api/posts/:id
// @desc      Delete a post
// @access    Private 
router.delete(
  '/:id' ,
  middleware,
  async( req , res ) => {
    try {
      const post = await PostsSchema.findById( req.params.id );
      //Checks 
      if(!post){
        return res.status(404).json({ msg: 'Post not found'})
      } 
      //current User owns it?
      if(post.user.toString() !== req.user.id)
      {
        return res.status(401).json({ msg: 'User not authorized'})
      }
      else{
        await post.remove();
        return res.json({ msg: 'Post removed'});
      }
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
)
module.exports = router;