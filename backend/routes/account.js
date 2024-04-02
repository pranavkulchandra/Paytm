const express = require("express")
const { authMiddleware } = require("./middleware")
const { Account }  = require("../db/db")
const mongoose = require("mongoose");
const {z } = require("zod")

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
        res.status(500).json({ Message : "UserId not found"})
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
   return res.status(500).json({Error : error, Message : "From Catch "})
}

})

router.post("/addamount", authMiddleware, async(req, res) => { 

    const session = await mongoose.startSession(); 
    const amountBody = z.object({ 
        amount : z.number()
    })
    session.startTransaction();
    try {
        const  parsedamount  = amountBody.safeParse(req.body)

        if (parsedamount.error) { 
            await session.abortTransaction();
            return res.status(401).json({Message : "Validataion error", error})
        }

        const {amount} = parsedamount.data
    

    if ( amount < 0 ) { 
        await session.abortTransaction();
        return res.status(401).json({Message : "Amount cannot be negative"})
    }
  

    const UserAccount = await Account.findOne({ userId : req.userId})
    if (!UserAccount) { 
        await session.abortTransaction();
        return res.status(403).json({ Message : "User Account not found"})
    }

    const updatedUserAccount  = await Account.findOneAndUpdate({userId : req.userId}, { $inc :  {balance : amount }}, {session, new:true} )

    // const NewUserAccBal = await Account.findOne({userId : req.userId})
    // console.log(NewUserAccBal, "New users")
    // const balance = NewUserAccBal.balance
    // console.log(balance, "from balance ")

    const balance = updatedUserAccount.balance
    


    session.commitTransaction(); 
    return res.status(200).json({ Message : "Balance Updated", balance : balance})

    } catch (error) {
      return  res.status(500).json({Message : "Server Error", error})
    }
})

module.exports = router