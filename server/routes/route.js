const {  sendEmailOtp, verifyEmailOtp } = require('../controller/OtpController')
const { register, login, verifyTokenMiddleWare } = require('../controller/UserController')


const router=require('express').Router()


router.post('/register',register)
     .post('/login',login)
     .post('/send-email-otp',sendEmailOtp)
     .get('/verify-email-otp',verifyEmailOtp)
     .get('/protected',verifyTokenMiddleWare)


module.exports = router