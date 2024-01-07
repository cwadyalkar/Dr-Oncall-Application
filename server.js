const express = require('express')
const colors =  require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const doctorRoute = require('./routes/doctorRoutes')
const path = require('path')




// static files

// dot env config
dotenv.config

// mongodb connection
connectDB()

const app = express();
const port = 8080;

// middlewares
app.use(express.json())
app.use(morgan('dev'))

// routes

app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
})
app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/doctor',doctorRoute)





app.listen(port,()=>{
    console.log(`Listening to the port ${port}`.bgCyan.white)
})