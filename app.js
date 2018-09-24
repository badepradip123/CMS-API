/*--- Required Dependencies for API*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
//----------------------------------------------

//--------Mongodb Database Connection --------------------//
//connect to database   
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
    console.log('connected to database '+ config.database);
});

//err
mongoose.connection.on('error', (err) => {
    console.log('database error: '+ err);
});
//--------Mongodb Database Connection --------------------//

const app = express();

const users = require('./routes/users'); 
const contacts = require('./routes/contacts'); 

const port = 3000;  // Port no.

//cors middleware
app.use(cors());

//body-parser middleware
app.use(bodyParser.json());

//passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

/* ----- Routes Of Contact and User Schema */
app.use('/users', users); 
app.use('/userContact',contacts);
//------------------------------------//


//index route
app.get('/', (req, res) => {
   res.send('Invalid point');
})

//start server
app.listen(port, () => {
    console.log('Server started on port:' + port);
});


