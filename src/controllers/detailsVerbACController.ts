import { Request, Response } from "express";
import prisma from "../config/db";
import { handleError, missingField } from "@utils/handleError/handleError";

const createDetailsVerbAC = async (req: Request, res: Response) => {
    try{
        const detail = await prisma.detailsVerbAC.create({data: req.body})
        res.status(201).json(detail)
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
};

const getDetailVerbAC = async (req: Request, res: Response) => {
  const {id, verb_id, ac_id} = req.query
  try{      
      if(id){
          const detail = await prisma.detailsVerbAC.findUnique({where: {
              id: id.toString(),
            }})
            if(!detail){
                res.status(404).json({message: ''})
            }
            res.status(201).json(detail)
        } else if(verb_id){
            const detail = await prisma.detailsVerbAC.findMany({
                where: {
                    verb_id: verb_id.toString()
                },
                select: {
                    acs: true
                }
            })
            if(!detail){
                res.status(404).json({message: ''})
            }
            res.status(200).json(detail)
        }
        else if(ac_id){
            const detail = await prisma.detailsVerbAC.findMany({
                where: {
                    ac_id: ac_id.toString()
                },
            })
            if(!detail){
                res.status(404).json({message: ''})
            }
            res.status(200).json(detail)
        }else {
            const details = await prisma.detailsVerbAC.findMany()
            res.status(200).json(details)
        }
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
};


const updateDetailVerbAC = async (req: Request, res: Response) => {
  try {
    const {id, ...data} = req.body
    const detail = await prisma.detailsVerbAC.update({data, where: {id: id}})
    res.status(200).json(detail)
  } catch(e: any){
    res.status(500).json(handleError(e))
  }
};

const deleteDetailVerbAC = async (req: Request, res: Response) => {
    const { id } = req.query
    try{

      if(!id){
          res.status(404).json({ message: '' });
        }
        try {
            const detail = await prisma.detailsVerbAC.delete({where: {id: id?.toString()}});
            if (detail) {
                res.status(200).json(detail);
            } else {
                res.status(404).json({ message: '' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
}


export default { createDetailsVerbAC, getDetailVerbAC, updateDetailVerbAC, deleteDetailVerbAC }
