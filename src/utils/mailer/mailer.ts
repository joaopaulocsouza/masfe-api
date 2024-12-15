require('dotenv').config()
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    port: 465,
    host: process.env.MAIL_HOST,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    }
})

export const sendEmail = async (mailData: any) => {
  try{
    console.log({
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    })
    const info = transporter.sendMail(mailData)
    return info
  }catch(e){
    return e
  }

}