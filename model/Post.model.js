const mongoose=require("mongoose")

const PostSchema=mongoose.Schema({
    title:({type:String, required:true}),
    body:({type:String, required:true}),
    device :({type:String, required:true}),
    ownerId :({type:String, required:true}),
    owner :({type:String, required:true}),
    
})

const PostModel=mongoose.model("post", PostSchema)

module.exports={
    PostModel
}