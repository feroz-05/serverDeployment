const express = require('express');
const mongoose = require('mongoose');
const user = require('./UserSchema');

const app = express();

app.use(express.json());

const port = 3000;


mongoose.connect("mongodb+srv://ferozcollegeuse:feroz0125@ferozcluster01.h7aiv.mongodb.net/ferozdb").then(()=>{
    console.log("Mongodb Server Cloud is connected");
}).catch((err)=>{
    console.log(err);
})

function CreateUser(name,email,password){
    const newUser = new user({
        name:name,
        email:email,
        password:password
    })
    
    try{
        newUser.save();
        console.log("User Saved");
    }catch(err){
        console.log(err);
        
    }
}


app.get("/",(req,res)=>{
    res.send("Hello World");
    const name = "Feroz";
    const email = "feroz@gmail.com";
    const password = "feroz";
    CreateUser(name,email,password);
})

app.listen(port,()=>{
    console.log("Server is Listining on port" + port);
})



