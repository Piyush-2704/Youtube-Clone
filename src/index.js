import express from "express";
import connectDB from "./database/index.js"
import {app} from "./app.js";
/*require('dotenv').config({path:'./env'})*/
import dotenv from "dotenv";
dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    try{
        app.on("error",(error)=>{
            console.log("ERROR:",error);
            throw error;
        })
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`server is running at port: ${process.env.PORT}`);
        });
    }
    catch(error){
        console.log("there was some error with the app:",error);
    }
    
})
.catch((error)=>{
    console.log("database connection failed:",error)
})
/*
;(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR:",error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port ${process.env.PORT}`);
        })
    }
    catch (error){
        console.error("ERROR:",error)
        throw error;
    }
})()
*/