const express = require('express')
const authMiddleware = require('../model/middleware/authMiddleware');
const { getDoctorInfoController,updateStatusController,doctorAppointmentController,getDoctorByIdController,updateProfileController } = require('../controllers/doctorCtrl');

const router = express.Router()





router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)
router.post('/updateProfile',authMiddleware,updateProfileController)
router.post('/getDoctorById',authMiddleware,getDoctorByIdController)
router.get('/doctor-appointments',authMiddleware,doctorAppointmentController)
router.post('/update-status',authMiddleware,updateStatusController)

module.exports = router;
