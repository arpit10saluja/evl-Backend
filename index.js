const express=require("express")
const {connection}=require("./db")
require("dotenv").config()
const {auth}=require("./middleWare/auth.middleWare")
const app=express()
const {userRouter}=require("./Routes/User.Routes")
const{postRouter}=require("./Routes/Post.Route")


app.use(express.json())
app.get("/",(req, res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)

app.use(auth)
app.use("/posts", postRouter)


app.listen(process.env.port,async(req, res)=>{
    try {
        await connection
        console.log("Server is Up")
    } catch (err) {
        console.log(err)
        console.log("Can't connect to the server")
    }
})