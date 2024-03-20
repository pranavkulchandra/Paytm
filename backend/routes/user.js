const express = require("express");
const {z} = require("zod")
const {User } = require("../db/db")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const SECRET = process.env.SECRET
const bcrypt = require("bcrypt")
const authMiddleware = require("./middleware")

const router = express.Router(); 

const SignupBody = z.object({ 
    username : z.string(),
    password : z.string(),
    firstname : z.string(),
    lastname : z.string()

})


router.post("/signup", async(req, res) => { 
    console.log(req.body)
    const { success } = SignupBody.safeParse(req.body); 
    console.log(success)
    if ( !success) { 
       return res.status(411).json({ Message : `Email already taken / Incorrect password`})
    }


    try { 

    const existingUser = await User.findOne({
        username : req.body.username
    })
    if (existingUser ) { 
       return res.status(411).json({ Message : `Email already taken / Incorrect email inputs`})
    }

    const user = await User.create({  
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
     })
        console.log(user)
        
    
    const token = jwt.sign({ 
        userId : user._id 
    },SECRET)
    return res.status(200).json({ 
        Message : "User Sucessfull created", 
        token : token
    })


} catch (e) { 
    console.log(e)
}
})


const SignInBody= z.object({ 
    username : z.string().email(),
    password : z.string()
})

router.post("/login", async( req, res) => { 
    const { success, data } = SignInBody.safeParse(req.body);

    if ( !success ) { 
        return res.status(401).json({Message : "Incorrect inputs/ email taken"})
    }

    const user = await User.findOne({
        username : data.username
    })

    if (!user) { 
        return res.status(401).json({ message : "User not found"})
    }

    const verifiedPass = await bcrypt.compare(data.password, user.password)
    if( !verifiedPass) { 
        return res.status(402).json({Message  : "Incorrect password"})
    }

    const token = jwt.sign({ 
        userId : user._id
    }, SECRET); 
    

    res.status(201).json({ Message : "Sucessfully Loggedin", token})
})


module.exports = router;