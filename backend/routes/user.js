const express = require("express");
const {z} = require("zod")
const {User, Account } = require("../db/db")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const SECRET = process.env.SECRET
const bcrypt = require("bcrypt")
const {authMiddleware} = require("./middleware");
const { use } = require("chai");

const router = express.Router(); 

const SignupBody = z.object({ 
    username : z.string(),
    password : z.string(),
    firstname : z.string(),
    lastname : z.string()

})

router.post("/signup", async(req, res) => { 
    const { success } = SignupBody.safeParse(req.body); 
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
     const userId = user._id; 


     await Account.create({
        userId : userId,
        balance : 1+ Math.random() * 1000
     })
    
     
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

//updte user API password 

const updatedBody = z.object({ 
    firstname : z.string().optional(),
    lastname : z.string().optional(),
    password : z.string().optional()
})


router.put("/update/password", authMiddleware, async (req ,res) => { 

    const { success, data } = updatedBody.safeParse(req.body)

    if (!success) { 
        return res.status(403).json({ Message : "Invalid Input"})
    }

    try {
        const user = await User.findById(req.userId)
        if ( !user ) { 
            return res.status(401).json({ Message : "User with UserId not found"})
        }

        if ( !data.password ) { 
            res.status(401).json({ Message : "Password not found in data"})
        }

        user.password = data.password

        await user.save()
        return res.status(200).json({Message : "User updaed sucessfully"})
    } catch (error) {
        return res.status(401).json({error : error})
    }

})

//update user firstname or lastname 

const updatedDetails = z.object({ 
    firstname : z.string().optional(),
    lastname : z.string().optional()
})

router.put("/update/details", authMiddleware, async(req, res) => { 
    const {success, data} = updatedDetails.safeParse(req.body);

    if (! success ) { 
        return res.status(403).json({Message : "Invalid Input try again "})
    }


    try {
        if ( req.userId ) {
            const user = await User.findById(req.userId);

            if (!user) { 
                return res.status(402).json({ Message : "User not found"})
            }

            if ( data.firstname ) {
                user.firstname = data.firstname 
             }

             if ( data.lastname ) {  
                user.lastname = data.lastname
             }
            
            await user.save()

            return res.status(200).json({ Message : "User details updated Sucessfully", firstname : user.firstname})
        }


    } catch (error) {
        res.status(500).json({Message :  "An error occured while updating user" ,Error : error})        
    }
})


// get users route 


router.get("/bulk", authMiddleware, async( req, res) => { 

    
    const filter = req.query.filter || ""; 
    
    if ( filter ) { 
        try {
            
            const users = await User.find({ 
                $or: [{ 
                    firstname : { 
                        "$regex" : filter
                    }, 
                } , { 
                    lastname : { 
                        "$regex" : filter
                    }
                }]
            })

            if (users && users.length > 0) { 
                res.json({ 
                    user : users.map(user=> ({
                        firstname : user.firstname, 
                        lastname : user.lastname, 
                        username : user.username,
                        _id : user._id
                    }))
                })
            }
 
        } catch (error) {
            res.status(406).json({ Message : "Error in finding users"})
            
        }
    } else {
      res.status(407).json({Message : "Issue with filter"})
    }
})

router.get("/me", authMiddleware, async( req, res) => { 
    const user = await User.findOne({_id : req.userId})
    console.log(user, req.userId,  "/me")
    if ( user )  { 
        res.status(200).json({username : user.firstname })
    } else { 
        res.status(403).json({ Message : "User not found"})
    }
})



module.exports = router;