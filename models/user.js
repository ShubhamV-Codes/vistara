const mongoose = require('mongoose');   
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
    // Here We dont define Username and Password because passport-local-mongoose did that By default
});

userSchema.plugin(passportLocalMongoose);  // It creates automatically username,password,hashing,salting by default
module.exports = mongoose.model("User", userSchema);