import { Request, Response } from "express";
import prisma from "../config/db";
import { generateAC } from "../utils/generateAC/generateAC";
import handleResponse from "../utils/handleResponse/handleResponse";
import { verifyJWT } from "../utils/verifyJWT/verifyJWT";

const item = "UX Correlation"

const createUxCorrelation = async (req: Request, res: Response) => {
    const {name, description, persona_id, verb_id, dimension} = req.body

    if(!name || !description || !persona_id || !verb_id || !dimension){
        return handleResponse.handleCreateRes({code: "CRT-03", res, item})
    }
    try{
        const {token} = req.cookies
        const validate = await verifyJWT(token)
        if(!validate){
            return handleResponse.handleErrorRes({code: "ERR-02", res})
        }
        const ux = await prisma.uxCorrelation.create({data: {name, description, persona_id, verb_id, dimension, user_id: validate??""}})
        const ac = await generateAC({dimension_number: dimension, description, persona: persona_id, verb: verb_id})
        const acparsed = JSON.parse(ac?.replace(/^```json\n/, "").replace(/\n```$/, "")??"")

        acparsed.acceptanceCriteria.forEach(async (relations: any) => {
            const relation = await prisma.relationUXAC.create({data: {relation: relations.relation, ux_id: ux.id}})
            relations.criteria.forEach(async (criteria: any) => {
                await prisma.acceptanceCriteria.create({data: {criteria, relation_id: relation.id}})
            })
        });

        setTimeout(async ()=>{
            const result = await prisma.uxCorrelation.findUnique({
                where:{
                id: ux.id.toString()
            },
            select: {
                id: true,
                name: true,
                persona: {
                    select: {
                        name: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                },
                description: true,
                relationUXAC: {
                    select: {
                        relation: true,
                        acceptanceCriteria: {
                            select: {
                                criteria: true,
                            }
                        }
                    }
                },
                dimension: true,
                verb: true
            }
          })
          return handleResponse.handleCreateRes({code: "CRT-01", res, item, content: result})
        }, 3000)
        }catch(e: any){
            return handleResponse.handleErrorRes({code: e.code, res, item})
        }
};

const getUxCorrelation  = async (req: Request, res: Response) => {
  const {id, user_id} = req.query

  try{      
    const {token} = req.cookies
    const validate = await verifyJWT(token)
    if(!validate){
        return handleResponse.handleErrorRes({code: "ERR-02", res})
    }
      if(id){
        const result = await prisma.uxCorrelation.findUnique({
            where:{
                id: id.toString()
            },
            select: {
                id: true,
                name: true,
                persona: {
                    select: {
                        name: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                },
                description: true,
                relationUXAC: {
                    select: {
                        relation: true,
                        acceptanceCriteria: {
                            select: {
                                criteria: true,
                            }
                        }
                    }
                },
                dimension: true,
                verb: true
            }
          })
          return handleResponse.handleGetRes({code: "GET-01", res, content: result})
      }
      if(user_id){
        const result = await prisma.uxCorrelation.findMany({
            select: {
                id: true,
                name: true,
                persona: true,
                user: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                user_id: validate!
            }
        })
        return handleResponse.handleGetRes({code: "GET-01", res, content: result})
      }
      const result = await prisma.uxCorrelation.findMany({
        select: {
            id: true,
            name: true,
            persona: true,
            user: {
                select: {
                    name: true
                }
            }
        }
      })
      return handleResponse.handleGetRes({code: "GET-01", res, content: result})
    }catch(e: any){
        return handleResponse.handleErrorRes({code: e.code, res, item})
    }
};


const updateUxCorrelation  = async (req: Request, res: Response) => {
  try {
    const {token} = req.cookies
    const validate = await verifyJWT(token)
    if(!validate){
        return handleResponse.handleErrorRes({code: "ERR-02", res})
    }
    const {id, ...data} = req.body
    const ux = await prisma.uxCorrelation.update({data, where: {id: id}})
    const relation = await prisma.relationUXAC.findMany({where: {ux_id: id}})
    relation.forEach(async (r: any) => {
        await prisma.relationUXAC.delete({where: {id: r.id}})
    })
    const ac = await generateAC({dimension_number: ux.dimension, description: ux.description, persona: ux.persona_id, verb: ux.verb_id})
    const acparsed = JSON.parse(ac?.replace(/^```json\n/, "").replace(/\n```$/, "")??"")

    acparsed.acceptanceCriteria.forEach(async (relations: any) => {
        const relation = await prisma.relationUXAC.create({data: {relation: relations.relation, ux_id: ux.id}})
        relations.criteria.forEach(async (criteria: any) => {
            await prisma.acceptanceCriteria.create({data: {criteria, relation_id: relation.id}})
        })
    });


    setTimeout(async ()=>{
        const result = await prisma.uxCorrelation.findUnique({
            where:{
            id: ux.id.toString()
        },
        select: {
            id: true,
            name: true,
            persona: {
                select: {
                    name: true
                }
            },
            user: {
                select: {
                    name: true
                }
            },
            description: true,
            relationUXAC: {
                select: {
                    relation: true,
                    acceptanceCriteria: {
                        select: {
                            criteria: true,
                        }
                    }
                }
            },
            dimension: true,
            verb: true
        }
      })
      return handleResponse.handleUpdateRes({code: "UPD-01", res, item, content: result})
    }, 3000)
  } catch(e: any){
    return handleResponse.handleErrorRes({code: e.code, res, item})
  }
};

const deleteUxCorrelation  = async (req: Request, res: Response) => {
    const { id } = req.query
    try{  
        const {token} = req.cookies
        const validate = await verifyJWT(token)
        if(!validate){
            return handleResponse.handleErrorRes({code: "ERR-02", res})
        }
        if(!id){
            return handleResponse.handleErrorRes({code: "ERR-01", res, item})
        }
        await prisma.uxCorrelation.delete({where: {id: id?.toString()}});
        return handleResponse.handleDeleteRes({code: "DEL-01", res, item})
    }catch(e: any){
        return handleResponse.handleErrorRes({code: e.code, res, item})
    }
}


export default { createUxCorrelation, deleteUxCorrelation, getUxCorrelation, updateUxCorrelation }
