"use strict";
require("dotenv").config();
const express=require("express");
const config=require("./config.js")
const mongoose =require("mongoose") ;
const router=require("./routes/home.js")
const Book=require("./models/bookModels.js")
const app=express()
const cors=require("cors")
app.use(express.json())
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["GET","PUT","POST","DELETE"],
//     allowedHeaders:["Content-Type"]
// }))
app.use(cors())
app.use("/",router)
mongoose.connect(config.DB_URL.replace("<password>",config.password)).then(()=>{
    console.log("DB Connected")
    app.listen(config.port,()=>{
        
    })
}).catch(err=>{
    console.log(err)
})