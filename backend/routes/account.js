const express = require("express")
const { authMiddleware } = require("./middleware")
const { Account }  = require("../db/db")
const mongoose = require("mongoose");

const router = express.Router()

router.get("/balance",authMiddleware, async( req, res)=> { 
    const userId = req.userId
    if ( userId) { 
        try {
            const account = await Account.findOne({ 
                userId : userId
            })    
            if (account) { 
                res.status(200).json({ balance : account.balance})
            } else { 
                res.status(401).json({ Message : "Account not found"})
            }

        } catch (error) {
            
        }
    } else { 
        res.status(401).json({ Message : "UserId not found"})
    }
})



module.exports = router