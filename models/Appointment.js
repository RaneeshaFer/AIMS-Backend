import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  aid: {
    type: String,
    required: true,
    unique: true
  },
  adate: {
    type: Date,
    required: true
  },
  cid: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  }
})

const Appointment = mongoose.model("appointment", appointmentSchema);

export default Appointment
