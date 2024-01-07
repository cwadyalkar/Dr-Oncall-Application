const express = require('express');
const { loginController,userAppointmentsController,applydoctorController,bookingAvailabilityController, getAllNotificationController,bookAppointmentController,getAllDoctorsController,registerController, authController,deleteAllNotificationController } = require('../controllers/userCtrl');
const authMiddleware = require('../model/middleware/authMiddleware');


const router = express.Router();

router.post('/login',loginController)
router.post('/register',registerController)
router.post('/getUserData',authMiddleware,authController)


router.post('/applydoctor',authMiddleware,applydoctorController)
router.post('/get-all-notification',authMiddleware,getAllNotificationController)
router.post('/delete-all-notification',authMiddleware,deleteAllNotificationController)
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

router.post('/book-appointment',authMiddleware,bookAppointmentController)
router.post('/booking-availability',authMiddleware,bookingAvailabilityController)
router.get('/user-appointments',authMiddleware,userAppointmentsController)


module.exports = router;