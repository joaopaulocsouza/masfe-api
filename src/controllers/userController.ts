// import User from "@models/user"
import { Request, Response } from "express";
import prisma from "../config/db";
import { encrypt } from "@utils/hash/hash";
import { handleError, missingField } from "@utils/handleError/handleError";

const createUser = async (req: Request, res: Response) => {
  if(!req.body.email || !req.body.password || !req.body.password || !req.body.birthday){
    res.status(400).json(missingField)
  }
  try{
    const password = await encrypt(req.body.password)
    const user = await prisma.user.create({data: {...req.body, password}})
    res.status(201).json(user)
  }catch(e: any){
    res.status(500).json(handleError(e))
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const {id} = req.query
  try{
    if(id){
      const users = await prisma.user.findUnique({where: {
        id: id.toString(),
      }})
      if(!users){
        res.status(404).json({message: "Usuário não encontrado"})
      }
      res.status(200).json(users)
    } else {
      const users = await prisma.user.findMany()
      res.status(200).json(users)
    }
  }
  catch(e: any){
    res.status(500).json(handleError(e))
  }
};


const updateUser = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const {id, ...data} = req.body
    const user = await prisma.user.update({data, where: {id: id}})
    res.status(200).json(user)
  }catch(e: any){
    res.status(500).json(handleError(e))
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.query
  if(!id){
    res.status(404).json({ message: 'User not found' });
  }
  try {
    const deletedUser = await prisma.user.delete({where: {id: id?.toString()}});
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch(e: any){
    res.status(500).json(handleError(e))
  }
}


export default { getAllUsers, createUser, updateUser, deleteUser }
