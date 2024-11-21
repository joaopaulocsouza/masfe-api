import { Request, Response } from "express";
import prisma from "../config/db";
import { handleError, invalidCredentials, missingField } from "@utils/handleError/handleError";
import { compare } from "@utils/hash/hash";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const login = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password){
        res.status(400).json(missingField)
    }
    try{
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            },
            select: {
                id: true,
                name: true,
                password: true
            }
        })
        if(user){
            const verifyCredentials = await compare(req.body.password, user?.password)
            if(verifyCredentials){
                const token = jwt.sign({id: user.id}, process.env.SECRET!, {expiresIn: 20000})
                res.cookie('token', token)
                res.status(200).json({name: user.name, message: "Login realizada com sucesso", code: "LOGIN_SUCESS"})
            }
            else res.status(400).json(invalidCredentials)
        }
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
}

const logout = async (req: Request, res: Response) => {
    res.clearCookie('token')
    res.status(200).json({message: "Deslogado com sucesso", code: "LOGOUT_SUCESS"})
}

export default { login, logout }
