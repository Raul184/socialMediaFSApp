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
        //likes & comments to be added on UI ==> != req
      });
      const post = await userPost.save()
      res.json(post);
    } 
    catch (error) {
      console.error(error);
      res.status(500).send('Server Error');  
    }
});
// LIKE A POST
// @route     UPDATE api/posts/like/:id
// @desc      like a post
// @access    Private 
router.put(
  '/like/:id',
  middleware,
  async( req, res ) => {
    try {
      //Selec Post
      const post = await PostsSchema.findById( req.params.id );
      // liked?
      if(post.likes.filter(el => el.user.toString() === req.user.id).length > 0 ){
        return res.status(400).json({ msg: 'Post already liked'})
      }
      post.likes.push({ user: req.user.id });
      await post.save();
      res.json(post.likes);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server Error' });  
    }
  }
)
// UNLIKE A POST
// @route     UPDATE api/posts/unlike/:id
// @desc      like a post
// @access    Private 
router.put(
  '/unlike/:id',
  middleware,
  async( req, res ) => {
    try {
      //Selec Post
      const post = await PostsSchema.findById( req.params.id );
      // liked?
      if(post.likes.filter(el => el.user.toString() === req.user.id).length = 0 ){
        return res.status(400).json({ msg: 'Post yet to be liked'})
      }
      const rIndex = post.likes.map(el => el.user.toString()).indexOf(req.user.id);
      post.likes.splice(rIndex , 1);

      await post.save();
      res.json(post.likes);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server Error' });  
    }
  }
)
//===================================================================

// @route     GET api/posts
// @desc      Get all posts
// @access    Private 
router.get(
  '/' ,
  middleware ,
  async( req, res ) => {
    try {
      const posts = await PostsSchema.find();
      if(!posts){
        return res.status(404).json({ msg: 'Sorry , the dog eat all posts'})
      }
      return res.json(posts);
    } 
    catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');  
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
//=====================================================================

// COMMENTS
// @route     POST api/posts/comment/:id
// @desc      Comment on a post
// @access    Private 
router.post(
  '/comment/:id' , 
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
      const post = await PostsSchema.findById(req.params.id);

      const nueCommnet = {
        user: req.user.id ,
        text ,
        name: user.name ,
        avatar: user.avatar 
      };
      post.comments.unshift(nueCommnet);

      await post.save();
      res.json(post.comments);
    } 
    catch (error) {
      console.error(error);
      res.status(500).send('Server Error');  
    }
});

// @route     DELETE api/posts/comment/:id/:comment_id
// @desc      Delete a comment from a post
// @access    Private 
router.delete(
  '/comment/:id/:comment_id' ,
  middleware ,
  async ( req , res ) => {
    try {
      //Get comment
      const post = await PostsSchema.findById( req.params.id );
      const comment = post.comments.find(el => el.id === req.params.comment_id)
      //Check exists
      if(!comment){
        return res.status(404).json({ msg: 'Comment does not exists'});
      }
      //Check logIn User
      if(comment.user.toString() !== req.user.id ){
        return res.status(401).json({ msg: "Authorization denied"});
      }
      //Then remove
      post.comments.filter(el => el.id !== req.params.comment_id);

      await post.save();
      res.json(post.comments);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server Error'});  
    }
  }
)



module.exports = router;