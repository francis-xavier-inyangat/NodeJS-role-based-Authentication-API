const express = require ("express");
const mongoose = require('mongoose');
const passport = require('passport');
const path = require("path")
// //requiring express sesssion 
const expressSession = require('express-session')({
  secret: 'secret',
 resave: false,
saveUninitialized: false
});
const homeroutes = require('./route/homeroutes')

const registerroutes = require('./route/registerroutes')

const Userlogin = require('./models/Userlogin')
// const signinRoutes =require('./route/loginroutes')
const userroutes = require('./route/userroutes')


//instatiating the express server
const app = express()


// we dont require "nodemon" becoz we configured that in the "package.json"

let config = require('./config/database')

//setting up mongoose
require('dotenv').config();


//connect mongoose
mongoose.connect(config.database,{ useNewUrlParser: true });
const db = mongoose.connection;



// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', function(err){
  console.error(err);
});


// views settings or configurations
app.set('view engine', 'pug');
app.set('views', './views');


// we are setting up our middleware / configuring it(comes first  before th)
// line 37 is very important :- responsible for parsing form data into the node server)
app.use(express.urlencoded({extended: true}));
//to access static files the server checks the public folder
app.use(express.static(path.join(__dirname, 'public')));
// setting the sessions
app.use(expressSession);
//initiazing passport and they shd be like this constantly they  are methods(line 43-44)
app.use(passport.initialize());
app.use(passport.session());

passport.use(Userlogin.createStrategy());
passport.serializeUser(Userlogin.serializeUser());
passport.deserializeUser(Userlogin.deserializeUser());

// //create a checker
// const loginchecker = function(res, req, next){
//   if (req.path != '/login' && req.path != '/' && !req.session.user){
//     res.redirect ('/')
//   }
//   next()
// };
// app.use(loginchecker)

//routes specify the content that we are looking for or the locations
// setting up routes
app.use('/', homeroutes)
app.use('/register', registerroutes)
// app.use('/signin', signinRoutes);
app.use('/userregister', userroutes);


//handling non existing routes
app.get('*', (req, res)=> {
  res.status(404).send('OOPS! WRONG ADDRESS')
 })


// server
app.listen(3002, ()=> console.log("Listening on Port 3002"));


