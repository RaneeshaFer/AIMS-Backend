import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  oid: {
    type: String,
    required: true,
    unique: true
  },
  cid: {
    type: String,
    required: true
  },
  orderdate: {
    type: Date,
    required: true
  },
  itemid: {
    type: String,
    required: true
  }
});

const Order = mongoose.model("order", orderSchema);
export default Order
