const { JWT } = require("jsonwebtoken");

const SECRET = process.env.SECRET

const authMiddleware = (req, res, next ) => { 
    const authHeaders = req.headers.authorization; 

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) { 
        return res.status(401).json({Message : "Bearer not correct"})
    }

    const token = authHeaders.split(" ")[1]; 

    try {
        const decoded = JWT.verify(token, SECRET) 

        if(decoded.userId) {
        req.userId = decoded.userId; 
        next()
    } else { 
        return res.status(403).json({Message : "UserId not found in token"})
    }

    } catch (error) {
        return res.status(403).json({ Message : "Token error "})        
    }

}

module.exports = { authMiddleware }