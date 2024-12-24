import { Request, Response } from "express";
import prisma from "../config/db";
import { handleError } from "@utils/handleError/handleError";
import handleResponse from "@utils/handleResponse/handleResponse";

const item = "Persona"

const createPersona = async (req: Request, res: Response) => {
    if(!req.body.name){
        handleResponse.handleCreateRes({code: "CRT-03", res, item})
    }
    try{
        await prisma.persona.create({data: {...req.body, user_id: "832d64d2-034f-46f2-8b5c-93f211be98e3", age: Number(req.body.age)}})
        handleResponse.handleCreateRes({code: "CRT-01", res, item})
    }catch(e: any){
        handleResponse.handleErrorRes({code: e.code, res, item})
    }
};

const getPersona = async (req: Request, res: Response) => {
  const {id, user_id} = req.query
  try{      
      if(id){
          const persona = await prisma.persona.findUnique({where: {
              id: id.toString(),
            }})
            handleResponse.handleGetRes({code: "GET-01", res, content: persona})
        } else if(user_id){
            const persona = await prisma.persona.findMany({
                where: {
                    user_id: user_id.toString()
                }
            })
            handleResponse.handleGetRes({code: "GET-01", res, content: persona})
        }else {
            const persona = await prisma.persona.findMany()
            handleResponse.handleGetRes({code: "GET-01", res, content: persona})
        }
    }catch(e: any){
        handleResponse.handleErrorRes({code: e.code, res, item})
    }
};


const updatePersona = async (req: Request, res: Response) => {
  try {
    const {id, ...data} = req.body
    await prisma.persona.update({data, where: {id: id}})
    handleResponse.handleCreateRes({code: "UPD-01", res})
  } catch(e: any){
    handleResponse.handleErrorRes({code: e.code, res, item})
  }
};

const deletePersona = async (req: Request, res: Response) => {
    const { id } = req.query
    try{
        await prisma.persona.delete({where: {id: id?.toString()}});
        handleResponse.handleErrorRes({code: "DEL-01", res, item})
    }catch(e: any){
        handleResponse.handleErrorRes({code: e.code, res, item})
    }
}


export default { createPersona,deletePersona, getPersona, updatePersona}
