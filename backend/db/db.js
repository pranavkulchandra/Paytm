const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const { object } = require("zod");

const userSchema = mongoose.Schema({ 
    firstname :  {
        type: String, 
        maxlength : 50, 
        minLength : 1, 
        required : true 

        
    } ,
    lastname  : { 
        type : String, 
        required: true, 
        trim : true, 
        minLength : 1, 
        maxLength: 50

    },
    password : {
        type: String, 
        required : true,
        minLength : 7,  
        maxLength : 100
    },
    username : {
        type : String, 
        required : true, 
        unique : true, 
        trim: true, 
        lowercase : true,
        minLength : 3, 
        maxLength : 30
    }
})


const accountsSchema = mongoose.Schema({ 
    userId : { 
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User", 
        required : true
    }, 
    balance : { 
        type : Number, 
        required : true
    }
})


userSchema.pre("save", async function(next) { 
    try{
        if (this.isModified("password")) { 
    
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
        }
        next()
} catch( e) { 
    next(e)
}
})

const User = mongoose.model("User", userSchema)
const Account = mongoose.model("Account", accountsSchema)

module.exports = {User, Account}

 

 