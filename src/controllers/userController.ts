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
    handleResponse.handleCreateRes({code: "CRT-02", res, item })
  }
  try{
    const password = await encrypt(req.body.password)
    const {id} = await prisma.user.create({data: {...req.body, password}})
    const token = jwt.sign({id}, process.env.SECRET!, {expiresIn: 20000})

    res.cookie('token', token)
    handleResponse.handleCreateRes({code: "CRT-01", res, item })
  }catch(e: any){
    handleResponse.handleErrorRes({code: e.code, res, item })
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const {id} = req.query
  try{
    const {cookie} = req.headers
    const validate = await verifyJWT(cookie??"")
    if(!validate){
        handleResponse.handleErrorRes({code: "ERR-02", res})
    }
    if(id){
      const users = await prisma.user.findUnique({where: {
        id: id.toString(),
      }})
      handleResponse.handleGetRes({code: "GET-01", res, item, content: users })
    } else {
      const users = await prisma.user.findMany()
      handleResponse.handleGetRes({code: "GET-01", res, item, content: users })
    }
  }
  catch(e: any){
    handleResponse.handleErrorRes({code: e.code, res, item })
  }
};


const updateUser = async (req: Request, res: Response) => {
  const {id, ...data} = req.body
  if(!id){
    handleResponse.handleErrorRes({code: "ERR-01", res, item })
  }
  try {
    const {cookie} = req.headers
    const validate = await verifyJWT(cookie??"")
    if(!validate){
        handleResponse.handleErrorRes({code: "ERR-02", res})
    }
    await prisma.user.update({data, where: {id: id}})
    handleResponse.handleCreateRes({code: "UPD-01", res, item })
  }catch(e: any){
    handleResponse.handleErrorRes({code: e.code, res, item })
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.query
  if(!id){
    handleResponse.handleErrorRes({code: "ERR-01", res, item })
  }
  try {
    const {cookie} = req.headers
    const validate = await verifyJWT(cookie??"")
    if(!validate){
        handleResponse.handleErrorRes({code: "ERR-02", res})
    }
    await prisma.user.delete({where: {id: id?.toString()}})
  } catch(e: any){
    handleResponse.handleErrorRes({code: e.code, res, item })
  }
}


export default { getAllUsers, createUser, updateUser, deleteUser }
