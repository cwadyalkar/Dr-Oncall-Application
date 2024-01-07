const express = require('express')
const router = express.Router()
const {getAllDoctorsController, getAllUsersController,changeAccountStatusController} = require('../controllers/adminCtrl')
const authMiddleware = require('../model/middleware/authMiddleware');


router.get("/getAllUsers",authMiddleware,getAllUsersController)
router.get("/getAllDoctors",authMiddleware,getAllDoctorsController)
router.post("/changeAccountStatus",authMiddleware,changeAccountStatusController)



module.exports = router;
