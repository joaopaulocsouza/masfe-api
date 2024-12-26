import { Request, Response } from "express";
import { missingField } from "../utils/handleError/handleError";
import { sendEmail } from "../utils/mailer/mailer";
require('dotenv').config()

const sendCodeRecoverAcc = async (req: Request, res: Response) => {
    if(!req.body.email){
        res.status(400).json(missingField)
    }
    try{
        const mail = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Seu código para recuperação de conta",
            html: `<h1>Olá João</h1><p>Seu código é 000000</p>`
        }
        await sendEmail(mail)
    }catch(e: any){
        console.log(e)
        // res.status(500).json(handleError(e))
    }
};

export default { sendCodeRecoverAcc }