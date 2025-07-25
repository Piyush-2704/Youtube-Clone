import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new mongoose.Schema({
    videofile:{
        tupe: String, //cloudinary url
        required: true,
    },
    thumbnail:{
        type: String, //cloudinary url
        required: true,
    },
    title:{
        type: String, 
        required: true,
    },
    discrption:{
        type: String,
        required: true,
    },
    duration:{
        type: Number, //cloudinary time
        required: true,
    },
    views:{
        type: Number,
        default: 0,
    },
    isPublished:{
        type: Boolean,
        default: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});

export const Video = mongoose.model("Video",VideoSchema);