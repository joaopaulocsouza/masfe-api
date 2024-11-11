import { Request, Response } from "express";
import prisma from "../config/db";
import { handleError, missingField } from "@utils/handleError/handleError";

const createUxCorrelation = async (req: Request, res: Response) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json(missingField)
    }
    try{
        const ux = await prisma.uxCorrelation.create({data: req.body})
        res.status(201).json(ux)
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
};

const getUxCorrelation  = async (req: Request, res: Response) => {
  const {id, user_id} = req.query
  try{      
      if(id){
          const ux = await prisma.uxCorrelation.findUnique({where: {
              id: id.toString(),
            }})
            if(!ux){
                res.status(404).json({message: 'UX Correlation não encontrada'})
            }
            res.status(200).json(ux)
        } else if(user_id){
            const ux = await prisma.uxCorrelation.findMany({
                where: {
                    user_id: user_id.toString()
                }
            })
            if(!ux){
                res.status(404).json({message: 'Nenhuma UX Correlation foi encontrada'})
            }
            res.status(200).json(ux)
        }else {
            const ux = await prisma.uxCorrelation.findMany()
            res.status(200).json(ux)
        }
    }catch(e: any){
        console.log(e)
        res.status(500).json(handleError(e))
    }
};


const updateUxCorrelation  = async (req: Request, res: Response) => {
  try {
    const {id, ...data} = req.body
    const ux = await prisma.uxCorrelation.update({data, where: {id: id}})
    res.status(200).json(ux)
  } catch(e: any){88
    res.status(500).json(handleError(e))
  }
};

const deleteUxCorrelation  = async (req: Request, res: Response) => {
    const { id } = req.query
    try{

      if(!id){
          res.status(404).json({ message: 'UX Correlation não encontrada' });
        }
        try {
            const ux = await prisma.uxCorrelation.delete({where: {id: id?.toString()}});
            if (ux) {
                res.status(200).json(ux);
            } else {
                res.status(404).json({ message: 'UX correlation não encontrada' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
}


export default { createUxCorrelation, deleteUxCorrelation, getUxCorrelation, updateUxCorrelation }
