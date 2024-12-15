const { generateOtp } = require("../authentication/otp")
const { verifyToken } = require("../authentication/token")
const nodemailer = require('nodemailer');
const User = require("../models/User")


exports.sendEmailOtp=async(req,res)=>
{


    const token = req.headers.authorization
    const {email}=req.body

    const userToken=verifyToken(token)

    const otp=generateOtp()

    const user=await User.findById(userToken.userId);

    user.EmailOtp=otp;

    await user.save()

    
    

    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure : false,
        auth: {
          user:process.env.EMAIL,
          pass:process.env.APP_PASSWORD,
        },
       
      });

      const mailOption={
        from: {
          name:'Farmer Bazaar',
          address:process.env.EMAIL
        },
        to: [email],
        subject: 'Email OTP Verification',
        text: `Your OTP for verification is: ${otp}`,
      }
      
      const sendEmailOtp = async (transporter,mailOption) => {
        try{
          await transporter.sendMail(mailOption);

        }
        catch(err)
        {
            return res.status(500).json({message:"Error sending email",error:err})
        }

      };

     await sendEmailOtp(transporter,mailOption)
  
     return res.status(200).json({ message: 'OTP sent to email and mobile' });






    
}


exports.verifyEmailOtp=async(req,res)=>
{

  const token = req.headers.authorization

  const {otp}=req.body

  const usertoken=verifyToken(token);

  const user=await User.findById(usertoken.userId);

  if(user.EmailOtp===otp)
  {
    return res.status(200).json({message:'OTP verified'})
  }
  
  return res.status(500).json({message:'OTP not verified'})

  

}