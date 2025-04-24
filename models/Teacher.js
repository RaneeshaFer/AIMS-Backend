import mongoose from "mongoose";

const teacherSchema=new mongoose.Schema({
    tid:{
        type:String,
        required:true,
        unique:true
    },
    tname:{
        type:String,
        required:true
    },
    address:{
        type:Number,
        required:true
    },
    dob:{
        type:Date,
        required:true
    }

})
const Teacher=mongoose.model("teacher",teacherSchema)

export default Teacher