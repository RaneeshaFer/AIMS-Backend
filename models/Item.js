import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemid: {
    type: String,
    required: true,
    unique: true
  },
  iname: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image:{
    type:[String],
    default:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
      //"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdefault-web-banner&psig=AOvVaw2x6WE5CjiVh33G4DSHGv-s&ust=1748271532811000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDA_5bxvo0DFQAAAAAdAAAAABAE"

}

  
})

const Item = mongoose.model("item", itemSchema);

export default Item
