const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  text:{
    type: String ,
    required: true
  },
  name:{
    type: String ,
  },
  avatar:{
    type: String ,
  },
  likes:[
    {
      //which user likes the post
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  comments: [
    {
      //which user likes the post
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String ,
        required: true
      },
      name: {
        type: String ,
      },
      avatar: {
        type: String ,
      },
      date: {
        type: Date ,
        default: Date.now
      }
    }
  ]
})

const PostsModel = mongoose.model( 'posts' , PostSchema );

module.exports = PostsModel;