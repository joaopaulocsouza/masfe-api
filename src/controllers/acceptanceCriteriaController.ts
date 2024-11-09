import { Request, Response } from "express";
import prisma from "../config/db";
import { handleError, missingField } from "@utils/handleError/handleError";

const createAcceptanceCriteria = async (req: Request, res: Response) => {
    if(!req.body.criteria){
        res.status(400).json(missingField)
    }
    try{
        const ac = await prisma.accetanceCriteria.create({data: req.body})
        res.status(201).json(ac)
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
};

const getAcceptanceCriteria = async (req: Request, res: Response) => {
  const {id, user_id} = req.query
  try{      
      if(id){
          const ac = await prisma.accetanceCriteria.findUnique({where: {
              id: id.toString(),
            }})
            if(!ac){
                res.status(404).json({message: 'Critério de aceitação não encontrado'})
            }
            res.status(201).json(ac)
        } else if(user_id){
            const ac = await prisma.accetanceCriteria.findMany({
                where: {
                    user_id: user_id.toString()
                },
            })
            if(!ac){
                res.status(404).json({message: 'Nenhum critério de aceitação foi encontrado'})
            }
            res.status(200).json(ac)
        }else {
            const ac = await prisma.accetanceCriteria.findMany()
            res.status(200).json(ac)
        }
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
};


const updateAcceptanceCriteria = async (req: Request, res: Response) => {
  try {
    const {id, ...data} = req.body
    const ac = await prisma.accetanceCriteria.update({data, where: {id: id}})
    res.status(200).json(ac)
  } catch(e: any){88
    res.status(500).json(handleError(e))
  }
};

const deleteAcceptanceCriteria = async (req: Request, res: Response) => {
    const { id } = req.query
    try{

      if(!id){
          res.status(404).json({ message: 'Critério de aceitação não encontrado' });
        }
        try {
            const ac = await prisma.accetanceCriteria.delete({where: {id: id?.toString()}});
            if (ac) {
                res.status(200).json(ac);
            } else {
                res.status(404).json({ message: 'Critério de aceitação não encontrado' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
}


export default { createAcceptanceCriteria, deleteAcceptanceCriteria, getAcceptanceCriteria, updateAcceptanceCriteria }
