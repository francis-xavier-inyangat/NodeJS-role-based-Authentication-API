//this type of file describes the nature of datat that the server is going to receive
const mongoose = require("mongoose");

//the physical space where our form data is going to be stored has been described)
const passportLocalMongoose =require('passport-local-mongoose');
const userloginSchema = new mongoose.Schema({
    username:{
        type : String,
        //First name aims at removing the spaces after the text or string 
        trim :true, 
        unique:true,
    },
    email:{
        type:String,
        //First name aims at removing the spaces after the text or string 
        trim:true, 
        //incase u want the field to be left empty put that specification on line 17
        required:'please enter valid email',
        unique:true,
    },
    password:{
        type : String ,
        
        },
})

userloginSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
}),


//exporting our Schema(the physical space where our form data is going to be stored has been described)
module.exports = mongoose.model("Userlogin" , userloginSchema);