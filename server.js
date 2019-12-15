const express = require('express');
const db = require('./config/db');
const PORT = process.env.PORT || 5000;

//Server
const app = express();
//Database
db();
//Middleware to parser req
app.use( express.json({ extended: false }));



app.get('/' , ( req , res ) => res.send('Server running'));

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin , Content-Type , Authorization, x-id , Content-Length , X-Requested-With , x-auth-token , user-agent");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Defined routes
app.use('/api/users' , require('./routes/api/users'))
app.use('/api/auth' , require('./routes/api/auth'))
app.use('/api/profile' , require('./routes/api/profile'))
app.use('/api/posts' , require('./routes/api/posts'))




app.listen(PORT);

