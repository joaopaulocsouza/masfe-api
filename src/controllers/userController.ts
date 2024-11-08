// import User from "@models/user"
import { Request, Response } from "express";
import prisma from "../config/db";
import { encrypt } from "@utils/hash/hash";

const createUser = async (req: Request, res: Response) => {
  try{
    const password = await encrypt(req.body.password)
    console.log({name: "joao", email: "joao", password: "12355"})
    const user = await prisma.user.create({data: {name: "joao", email: "joao", password: "12355"}})
    res.status(201).json(user)
  }catch(e){
    res.status(500)
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const {id} = req.query

  if(id){
    const users = await prisma.user.findUnique({where: {
      id: id.toString(),
    }})
    if(!users){
      res.status(404).json({message: "Usuário não encontrado"})
    }
    res.status(201).json(users)
  } else {
    const users = await prisma.user.findMany()
    res.status(201).json(users)
  }
};


const updateUser = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const {id, ...data} = req.body
    const user = await prisma.user.update({data, where: {id: id}})
    res.status(201).json(user)
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.query
  console.log(id)
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
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}


export default { getAllUsers, createUser, updateUser, deleteUser }
