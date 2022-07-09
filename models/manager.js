//this type of file describes the nature of datat that the server is going to receive
const mongoose = require("mongoose");
//the physical space where our form data is going to be stored has been described)
const managerSchema = new mongoose.Schema({
    firstname:{
        type : String,
        //First name aims at removing the spaces after the text or string 
        trim : true, 
    },
    secondname: {
        type : String ,trim: true,
       
        },
     maritalstatus: {
            type : String ,trim: true,
            },
    dob: {
        type : Date,
     },
    gender: {
         type : String
        },
    phonenumber: {
        type : String ,
             },
    role: {
        type : String ,
         },
})
//exporting our Schema(the physical space where our form data is going to be stored has been described)
    module.exports = mongoose.model("Manager" , managerSchema);