import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    sid:{
        type:String,
        required:true,
        unique:true
    },
    sname:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    image:{
        type:[String],
        default:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="

    }

})
const Student=mongoose.model("student",studentSchema)

export default Student