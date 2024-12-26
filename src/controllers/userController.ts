// import User from "@models/user"
import { Request, Response } from "express";
import prisma from "../config/db";
import { encrypt } from "../utils/hash/hash";
import { verifyJWT } from "../utils/verifyJWT/verifyJWT";
import handleResponse from "../utils/handleResponse/handleResponse";
import jwt from 'jsonwebtoken'

const item = "Usuário "

const createUser = async (req: Request, res: Response) => {
  if(!req.body.email || !req.body.password || !req.body.password || !req.body.birthday){
    return handleResponse.handleCreateRes({code: "CRT-02", res, item })
  }
  try{
    const password = await encrypt(req.body.password)
    const {id} = await prisma.user.create({data: {...req.body, password}})
    const token = jwt.sign({id}, process.env.SECRET!, {expiresIn: 20000})

    return handleResponse.handleLoginRes({code: "LGN-01", res, content: {token, options: {maxAge: 20000, httpOnly: true} }})
  }catch(e: any){
    return handleResponse.handleErrorRes({code: e.code, res, item })
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const {id} = req.query
  try{
    const {token} = req.cookies
    const validate = await verifyJWT(token)
    if(!validate){
      return handleResponse.handleErrorRes({code: "ERR-02", res})
    }
    if(id){
      const users = await prisma.user.findUnique({where: {
        id: id.toString(),
      }})
      return handleResponse.handleGetRes({code: "GET-01", res, item, content: users })
    } else {
      const users = await prisma.user.findMany()
      return handleResponse.handleGetRes({code: "GET-01", res, item, content: users })
    }
  }
  catch(e: any){
    return handleResponse.handleErrorRes({code: e.code, res, item })
  }
};


const updateUser = async (req: Request, res: Response) => {
  const {token} = req.cookies
  const validate = await verifyJWT(token)
  if(!validate){
      handleResponse.handleErrorRes({code: "ERR-02", res})
  }
  
  const {id, ...data} = req.body
  if(!id){
    return handleResponse.handleErrorRes({code: "ERR-01", res, item })
  }
  try {
    await prisma.user.update({data, where: {id: id}})
    return handleResponse.handleCreateRes({code: "UPD-01", res, item })
  }catch(e: any){
    return handleResponse.handleErrorRes({code: e.code, res, item })
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const {token} = req.cookies
  const validate = await verifyJWT(token)
  if(!validate){
    return handleResponse.handleErrorRes({code: "ERR-02", res})
  }

  const { id } = req.query
  if(!id){
    return handleResponse.handleErrorRes({code: "ERR-01", res, item })
  }
  try {
    await prisma.user.delete({where: {id: id?.toString()}})
  } catch(e: any){
    return handleResponse.handleErrorRes({code: e.code, res, item })
  }
}


export default { getAllUsers, createUser, updateUser, deleteUser }
