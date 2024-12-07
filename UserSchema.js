const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type:String, required:true, default:"Randomuser"},
    email: {type:String, required:true, default:"Randomuser"},
    password:{type:String, required:true},
})

const user = mongoose.model("user", userSchema);
module.exports = user;