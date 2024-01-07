const mongoose = require("mongoose");
MONGO_URI = "mongodb://localhost:27017/doctor-appointment-app"
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI );
    console.log(`connection succesfull ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Server Issue ${error}`);
  }
};

module.exports = connectDB;
