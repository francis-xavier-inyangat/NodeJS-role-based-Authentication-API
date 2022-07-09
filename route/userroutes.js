const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const manager = require('../models/manager');

// requiring the file that our server will use to post the data
const Manager =require("../models/manager")



router.get('/userregister',(req,res)=>{
    res.render('signup')

})
//post method for when login details are authenicated



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





module.exports = router;

