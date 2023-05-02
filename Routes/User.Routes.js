const express=require("express")
const {UserModel}=require("../model/User.model")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")


userRouter.post("/register",async(req, res)=>{
    const {email, password, name, gender}=req.body

    try {
        bcrypt.hash(password, 5, async(err, hash)=>{
            if(err){
                res.status(400).send({"err":err.message})
            }else{
                const user=new UserModel({email, password:hash, name,gender})
                await user.save()
                res.status(200).send({"msg":"New User has been Added"})
            }
        })
        
    } catch (err) {
        res.status(400)
        res.send({"err":err.message})
    }
})

userRouter.post("/login",async(req, res)=>{
    const {email, password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password,(err, result)=>{
                if(result){
                    const token=jwt.sign({ownerId:user._id,owner:user.name},"masai")
                    res.status(200).send({"msg":"Login Successfully","token":token})
                }else{
                    res.status(400).send({"msg":"Something went wrong while hasing"})
                }
            })
        }else{
            res.status(200).send({"msg":"Wrong Details"})
        }
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

module.exports={
    userRouter
}