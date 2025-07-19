import mongoose from "mongoose";

import {DB_NAME} from "../constants.js";

const connectDB = async ()=>{
    try{
        const conninst = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\nMONGO DB CONNECTED ${conninst.connection.host}`);
    }
    catch(error){
        console.log("ERROR:",error);
        process.exit(1);
    }
}

export default connectDB;