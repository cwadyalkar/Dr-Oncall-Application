 const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../model/doctorModel");
JWT_SECRET = "CSWPPD!@1234";
const moment = require("moment");
const appointmentModel = require("../model/appointmentModel");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    req.body.password = hashedpassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({
      message: "Register Succesfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Registeration controller ${error.message}`,
    });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .send({ message: `User Not Found`, success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: `Invalid Email or Password`, success: false });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "10d" });
    res
      .status(200)
      .send({ message: "Login Success", success: true, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error in Login ${error.message}`,
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const applydoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor account`,
      data: {
        doctorId: newDoctor._id, //here i have doubt about id
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors"
        
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Applied Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctor",
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error in notification`,
      success: false,
      error,
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({
      status: "approved",
    });

    res.status(200).send({
      success: true,
      message: "Doctors List Fetch Succesfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Doctors",
      error,
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A New Notification Request From ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Booked Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error While Booking Appointment",
      error,
      success: false,
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notification Deleted Succesfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to delete all notification",
      error,
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if(appointments.length > 0) {
      return res.status(200).send({
        message: "Appointment not Available at this time",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointment Available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in Booking",
      success: false,
      error,
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const userAppointmentsController = async(req,res)=>{
  try {
    const appointments = await appointmentModel.find({userId : req.body.userId})
    res.status(200).send({
      message:'User Appointments Fetch Succesfully',
      success:true,
      data:appointments

    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success : false,
      error,
      message:'Error in User Appointment'
    })
  }
}
module.exports = {
  loginController,
  registerController,
  authController,
  applydoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  userAppointmentsController,
  bookingAvailabilityController,
};
