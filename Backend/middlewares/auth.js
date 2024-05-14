const jwt = require("jsonwebtoken")

module.exports = function(req,res,next) {
    const token = req.header("token")
    if(!token) return res.status(401).json({message: "auth error"})
    try{
        const decoded = jwt.verify(token,"teddybear")
        next()
    } catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}

