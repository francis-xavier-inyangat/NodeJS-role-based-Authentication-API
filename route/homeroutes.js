const express = require('express');
const passport = require('passport');
const router = express.Router();

const mongoose = require('mongoose');
const manager = require('../models/manager');

// requiring the file that our server will use to post the data
const Manager =require("../models/manager")
const Userlogin = require("../models/Userlogin")
//const Registration = require('../models/Registration'); web browser
// web browser is requesting for the form data  posted
router.get('/',(req,res) =>{
    res.render('register',{title:'Home Route Register form'});
});

//web browser is requesting for the form data posted in the database
router.get('/users', (req, res) => {
    Manager.find().then((usermanager) => {
            res.render('index', { title: 'listing of managers', usermanager })
        })
        .catch(() => {
            res.send('something went wrong')
        })
});


router.post('/' ,async (req ,res) => {  
try{
    const manager = new Manager(req.body);
    await manager.save()
    console.log(req.body)
    res.render('page');
}
catch(err){
    res.status(404).render('register')
}
});


router.get('/credits', (req, res) => {
 res.render('page', { title: 'page' });
});



   //SIGN UP
router.get('/userregister',(req,res)=>{
    res.render('signup')
})
// register in DB
router.post('/userregister', async(req,res)=> {
    try{
     const userregister = new Userlogin(req.body);
     console.log(userregister)

    await Userlogin.register(userregister, req.body.password,(err)=>{
        if(err){
            throw err;
        }
        res. redirect('/signin')

     })    
    }
    catch(err){
     res.status(400).send('something went wrong')
    //  res.status(400).render('userregister')
     // 'userregister is a pug filename'
    }
});

   



// SIGN IN
router.get('/signin', (req, res) => {
    res.render('login', { title: 'Login' });
   });

router.post('/signin', passport.authenticate('local',{failureRedirect:'/signin'}), 
(req,res)=>{
    console.log(req.body);
    req.session.user = req.user
    // take user to dashborad on successful login
    res.redirect('/credits');
});











module.exports = router;


