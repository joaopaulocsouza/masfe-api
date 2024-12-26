import { Request, Response } from "express";
import prisma from "../config/db";
import { compare } from "../utils/hash/hash";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import handleResponse from "@utils/handleResponse/handleResponse";
dotenv.config()


const login = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password){
        return handleResponse.handleLoginRes({code: "LGN-03", res} )
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
                return handleResponse.handleLoginRes({code: "LGN-01", res, content: {token, options: {maxAge: 20000, httpOnly: true} }})
            }
            else return handleResponse.handleLoginRes({code: "LGN-02", res} )
        }
    }catch(e: any){
        return handleResponse.handleErrorRes({code: e.code, res, item: "Usuário"})
    }
}

const logout = async (req: Request, res: Response) => {
    try{
       res.clearCookie('token')
       return handleResponse.handleLoginRes({code: "LGT-01", res} )
    }catch(e: any){
        return handleResponse.handleErrorRes({code: e.code, res, item: "Usuário"})
    }
}

export default { login, logout }
