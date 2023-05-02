const express=require("express")
const postRouter=express.Router()
const {PostModel}=require("../model/Post.model")

postRouter.post("/create",async(req, res)=>{
    try {
        const post=await new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"Post has been add"})

    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

postRouter.get("/", async(req, res)=>{
    try {
        const post=await PostModel.find({ownerID:req.body.ownerID})
        res.status(200).send(post)
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

postRouter.patch("/update/:postId",async(req, res)=>{
    let {postId}=req.params
    let post=await PostModel.findOne({_id:postId})
    try {
        if(req.body.ownerID!==post.ownerID){
            res.status(200).send({"msg":"You are not authorized to do this action, Please Login first"})
        }else{
            await PostModel.findByIdAndUpdate({_id:postId}, req.body)
            res.status(200).send(`The Post with ID ${postId} Has been Updated`)
        }
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

postRouter.delete("/update/:postId",async(req, res)=>{
    let {postId}=req.params
    let post=await PostModel.findOne({_id:postId})
    try {
        if(req.body.ownerID!==post.ownerID){
            res.status(200).send({"msg":"You are not authorized to do this action, Please Login first"})
        }else{
            await PostModel.findByIdAndDelete({_id:postId}, req.body)
            res.status(200).send(`The Post with ID ${postId} Has been Deleted`)
        }
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

module.exports={
    postRouter
}