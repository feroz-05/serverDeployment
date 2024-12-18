const express = require('express');
const mongoose = require('mongoose');
const user = require('./UserSchema');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000;

mongoose.connect("mongodb+srv://ferozcollegeuse:feroz0125@ferozcluster01.h7aiv.mongodb.net/ferozdb").then(()=>{
    console.log("Mongodb Server Cloud is connected");
}).catch((err)=>{
    console.log(err);
});

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
    res.json({message:"Hello World"});
})

app.post("/register",async(req,res)=>{
    const {name, email, password} = req.body;
    if(name === "" || email === "" || password === ""){
        res.json({message:"Please fill all fields"})
    }else{
        const userExist = await user.findOne({email:email});
        if(userExist){
            res.json({message:"User Already Exist"});
        }else{
            CreateUser(name,email,password);
            console.log(name,email,password);
            console.log("User Created");
            res.status(200)
            res.json({message:"User Created Successfully"});
    }
}
})

app.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    if( email === "" || password === ""){
        res.json({message:"Please fill all fields"})
    }else{
        const userExist = await user.findOne({email:email});
        if (userExist){
            if(userExist.password === password){
            res.status(200)
            res.json({message:"Logged in"});
        }else{
            res.json({message:"user id and password does not match"});
        }
    }else{
        res.json({message:"user id and password does not match"});
    }
    
}
})

app.listen(port,()=>{
    console.log("Server is Listining on port" + port);
})



