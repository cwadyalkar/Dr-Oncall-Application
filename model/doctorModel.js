const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema(
  {
    userId :{
      type:String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "experienced is required"],
    },
    feesPerCounsultation: {
      type: Number,
      required: [true, "fees is required"],
    },
    timings: {
      type: Array,
      required: true,
    },  
    status:{
        type:String,
        default:'pending'
    },
    notification:{
      type:Array,
      default:[]
  },
  seenNotification:{
      type:Array,
      default:[]
  }
  },
  { timestamps: true }
);
const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
