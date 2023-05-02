const jwt=require("jsonwebtoken")

const auth=(req, res, next)=>{
    let token=req.headers.authorization
    if(token){
        // console.log(token)
        try {
            const decoded=jwt.verify(token.split(" ")[1],"masai")
            console.log(decoded)
            if(decoded){
                req.body.ownerId=decoded.ownerId
                req.body.owner=decoded.owner
                next()
            }else{
                res.send({"msg":"Please Login!"})
            }
        } catch (err) {
            res.status(400).send({"err":err.message})
        }
    }else{
        res.send({"msg":"Please Login!!!"})
    }
}

module.exports={
    auth
}