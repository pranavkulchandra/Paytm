const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const app = express()
const rootRouter = require("./routes/index")
const userRouter = require("./routes/user")
require("dotenv").config();
const bodyParser  = require("body-parser")

const port = 3000
const mongoString = process.env.MongoDBString
const SECRET = process.env.SECRET


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors())
app.use(express.json())
app.use("/api/v1", rootRouter)
app.use("/api/v1/user", userRouter)
mongoose.connect(mongoString)




app.listen(port, ()=> { 
    console.log(`backend running on port ${port}`)
})


