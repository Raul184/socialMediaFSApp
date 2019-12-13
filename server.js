const express = require('express');
// const db = require('./config/db');

const PORT = process.env.PORT || 5000;

const app = express();
//Connect to Database
// db();

app.get('/' , ( req , res ) => res.send('Server running'));
// Defined routes
app.use('/api/users' , require('./routes/api/users'))
app.use('/api/auth' , require('./routes/api/auth'))
app.use('/api/profile' , require('./routes/api/profile'))
app.use('/api/posts' , require('./routes/api/posts'))




app.listen(PORT);

