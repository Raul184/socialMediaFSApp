const express = require('express');
const db = require('./config/db');

const PORT = process.env.PORT || 5000;
//Connect to Database
db();


const app = express(  
  () => console.log('Server up and running')
).listen(PORT);

