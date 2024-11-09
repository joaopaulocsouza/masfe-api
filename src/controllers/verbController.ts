import { Request, Response } from "express";
import prisma from "../config/db";
import { handleError, missingField } from "@utils/handleError/handleError";

const createVerb = async (req: Request, res: Response) => {
    if(!req.body.verb){
        res.status(400).json(missingField)
    }
    try{
        const verb = await prisma.verb.create({data: req.body})
        res.status(201).json(verb)
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
};

const getVerb = async (req: Request, res: Response) => {
  const {id, user_id} = req.query
  try{      
      if(id){
          const verb = await prisma.verb.findUnique({where: {
              id: id.toString(),
            }})
            if(!verb){
                res.status(404).json({message: "Verbo não encontrado"})
            }
            res.status(201).json(verb)
        } else if(user_id){
            const verbs = await prisma.verb.findMany({where: {
                user_id: user_id.toString(),
            }})
            if(!verbs){
                res.status(404).json({message: "Nenhum verbo encontrado"})
            }
            res.status(201).json(verbs)
        }else {
            const verbs = await prisma.verb.findMany()
            res.status(201).json(verbs)
        }
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
};


const updateVerb = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const {id, ...data} = req.body
    const verb = await prisma.verb.update({data, where: {id: id}})
    res.status(201).json(verb)
  } catch(e: any){
    res.status(500).json(handleError(e))
  }
};

const deleteVerb = async (req: Request, res: Response) => {
    const { id } = req.query
    try{

      if(!id){
          res.status(404).json({ message: 'User not found' });
        }
        try {
            const deletedVerb = await prisma.verb.delete({where: {id: id?.toString()}});
            if (deletedVerb) {
                res.status(200).json(deletedVerb);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
}


export default { createVerb, updateVerb, deleteVerb, getVerb }
