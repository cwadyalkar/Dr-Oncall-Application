const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
name : {
    type:String,
    required : true
},
email:{
    type:String,
    required : true
},
password : {
    type:String,
    required : true
},
isAdmin:{
    type:Boolean,
    default:false
},
isDoctor:{
    type:Boolean,
    default:false
},
notification:{
    type:Array,
    default:[]
},
seenNotification:{
    type:Array,
    default:[]
}


})

const userModel = mongoose.model('users',userSchema)
module.exports = userModel