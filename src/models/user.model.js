import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    usename:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname:{
        type:String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String, // cloudinary url
        required: true,
    },
    coverimage:{
        type: String, // cloudinary url
    },
    watchHistory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    password:{
        type: String,
        required: [true, "password is needed"]
    },
    refershToken:{
        type: String,
    }
},{timestamps: true});

UserSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10);
    next();
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

UserSchemamethods.generateAccessToken = async function(){
    return await jwt.sign(
        {_id:this._id,email:this.email,username:this.username},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIERY}
    )
}

UserSchemamethods.generateRefressToken = async function(){
    return await jwt.sign(
        {_id:this._id},
        process.env.REFRESS_TOKEN_SECRET,
        {expiresIn: process.env.REFRESS_TOKEN_EXPIERY}
    )
}

export const User = mongoose.model("User",UserSchema);