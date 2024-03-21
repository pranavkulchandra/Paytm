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

router.post("/transfer", authMiddleware, async (req, res) => { 

    const session = await mongoose.startSession(); 

     session.startTransaction()
try {
    

    const { amount , toUserId } = req.body;


    const fromUserAccount = await Account.findOne({userId : req.userId})
    if (!fromUserAccount) { 
        session.abortTransaction();
        return res.status(401).json({ Message : "User not found"})
    }

    if(fromUserAccount.balance < amount) { 
         session.abortTransaction(); 
       return  res.status(403).json({ Message : "Insufficient Balance "})
    }

    const toUserAccount = await Account.findOne({ userId : toUserId})
    console.log(toUserAccount)
    


    if(!toUserAccount) { 
        session.abortTransaction()
        return res.status(401).json({Message : "To user not found."})
    }

    await Account.updateOne({ userId : req.userId}, {$inc : { balance : -amount}}, {session});
    await Account.updateOne({ userId : toUserId}, { $inc : { balance : amount}}, {session});

    session.commitTransaction();
    res.status(200).json({ MEssage  : "Transaction Successfull"})
    

} catch (error) {
   return res.status(400).json({Error : error, Message : "From Catch "})
}

})



module.exports = router