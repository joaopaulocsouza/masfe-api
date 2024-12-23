import { Request, Response } from "express";
import prisma from "../config/db";
import { handleError, missingField } from "@utils/handleError/handleError";

const createPersona = async (req: Request, res: Response) => {
    if(!req.body.name){
        res.status(400).json(missingField)
    }
    try{
        const persona = await prisma.persona.create({data: {...req.body, user_id: "36f065e2-7cd4-4a9f-8b82-2bdfd0553543", age: Number(req.body.age)}})
        res.status(201).json(persona)
    }catch(e: any){
        console.log(e)
        res.status(500).json(handleError(e))
    }
};

const getPersona = async (req: Request, res: Response) => {
  const {id, user_id} = req.query
  try{      
      if(id){
          const persona = await prisma.persona.findUnique({where: {
              id: id.toString(),
            }})
            if(!persona){
                res.status(404).json({message: 'Persona não encontrada'})
            }
            res.status(200).json(persona)
        } else if(user_id){
            const persona = await prisma.persona.findMany({
                where: {
                    user_id: user_id.toString()
                }
            })
            if(!persona){
                res.status(404).json({message: 'Nenhuma Persona foi encontrada'})
            }
            res.status(200).json(persona)
        }else {
            const persona = await prisma.persona.findMany()
            res.status(200).json(persona)
        }
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
};


const updatePersona = async (req: Request, res: Response) => {
  try {
    const {id, ...data} = req.body
    const persona = await prisma.persona.update({data, where: {id: id}})
    res.status(200).json(persona)
  } catch(e: any){88
    res.status(500).json(handleError(e))
  }
};

const deletePersona = async (req: Request, res: Response) => {
    const { id } = req.query
    try{

      if(!id){
          res.status(404).json({ message: 'Persona não encontrada' });
        }
        try {
            const persona = await prisma.persona.delete({where: {id: id?.toString()}});
            if (persona) {
                res.status(200).json(persona);
            } else {
                res.status(404).json({ message: 'persona não encontrada' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }catch(e: any){
        res.status(500).json(handleError(e))
    }
}


export default { createPersona,deletePersona, getPersona, updatePersona}
