const express=require('express')
const { register, login, getUser } = require('../controller/user.controller')
const userRoute=express.Router()

userRoute
.route('/register')
.post(register)

userRoute
.route('/login')
.post(login)


userRoute
.route('/user')
.post(getUser)

module.exports=userRoute;