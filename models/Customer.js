
import mongoose from "mongoose";

const customerSchema=new mongoose.Schema({
    cid:{
        type:String,
        required:true,
        unique:true
    },
    cname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    telephone:{
        type:Number,
        required:true
    },
    image:{
        type:[String],
        default:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="

    }

})
const Customer=mongoose.model("customer",customerSchema)

export default Customer