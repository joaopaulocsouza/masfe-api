import { Request, Response } from "express";
import prisma from "../config/db";
import handleResponse from "../utils/handleResponse/handleResponse";
import { verifyJWT } from "../utils/verifyJWT/verifyJWT";

const item = "Persona"

const createPersona = async (req: Request, res: Response) => {
    
    if(!req.body.name){
        return handleResponse.handleCreateRes({code: "CRT-03", res, item})
    }
    try{
        const token = req.headers.authorization??''
        const validate = await verifyJWT(token)
        if(!validate){
            handleResponse.handleErrorRes({code: "ERR-02", res})
        }
        const persona = await prisma.persona.create({data: {...req.body, user_id: validate, age: Number(req.body.age)}})
        return handleResponse.handleCreateRes({code: "CRT-01", res, item,  content: persona})
    }catch(e: any){
        return handleResponse.handleErrorRes({code: e.code, res, item})
    }
};

const getPersona = async (req: Request, res: Response) => {
  const {id, user: user_id} = req.query
  try{      
      const token = req.headers.authorization??''
      const validate = await verifyJWT(token)
      if(!validate){
          return handleResponse.handleErrorRes({code: "ERR-02", res})
      }
      if(id){
          const persona = await prisma.persona.findUnique({where: {
              id: id.toString(),
            }})
            return handleResponse.handleGetRes({code: "GET-01", res, content: persona})
        } else if(user_id){
            const persona = await prisma.persona.findMany({
                where: {
                    user_id: validate??""
                }
            })
            return handleResponse.handleGetRes({code: "GET-01", res, content: persona})
        }else {
            const persona = await prisma.persona.findMany()
            return handleResponse.handleGetRes({code: "GET-01", res, content: persona})
        }
    }catch(e: any){
        return handleResponse.handleErrorRes({code: e.code, res, item})
    }
};


const updatePersona = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization??''
    const validate = await verifyJWT(token)
    if(!validate){
        return handleResponse.handleErrorRes({code: "ERR-02", res})
    }
    const {id, ...data} = req.body
    const persona = await prisma.persona.update({data, where: {id: id}})
    return handleResponse.handleUpdateRes({code: "UPD-01", res, item, content: persona})
  } catch(e: any){
    return handleResponse.handleErrorRes({code: e.code, res, item})
  }
};

const deletePersona = async (req: Request, res: Response) => {
    const { id } = req.query
    try{
        const token = req.headers.authorization??''
        const validate = await verifyJWT(token)
        if(!validate){
            return handleResponse.handleErrorRes({code: "ERR-02", res})
        }
        await prisma.persona.delete({where: {id: id?.toString()}});
        return handleResponse.handleDeleteRes({code: "DEL-01", res, item})
    }catch(e: any){
        return handleResponse.handleErrorRes({code: e.code, res, item})
    }
}


export default { createPersona,deletePersona, getPersona, updatePersona}
