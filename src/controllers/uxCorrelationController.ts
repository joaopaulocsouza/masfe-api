import { Request, Response } from "express";
import prisma from "../config/db";
import { handleError, missingField } from "@utils/handleError/handleError";
import { Dimension } from "@utils/defines/defines";
import { generateAC } from "@utils/generateAC/generateAC";
import handleResponse from "@utils/handleResponse/handleResponse";

const item = "UX Correlation"

const createUxCorrelation = async (req: Request, res: Response) => {
    const {name, description, persona_id, verb_id, dimension} = req.body

    if(!name || !description || !persona_id || !verb_id || !dimension){
        handleResponse.handleCreateRes({code: "CRT-03", res, item})
    }
    try{
        const ux = await prisma.uxCorrelation.create({data: {name, description, persona_id, verb_id, dimension, user_id: '832d64d2-034f-46f2-8b5c-93f211be98e3'}})
        const ac = await generateAC({dimension_number: dimension})
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
          handleResponse.handleCreateRes({code: "CRT-01", res, item, content: result})
        }, 3000)
        }catch(e: any){
            handleResponse.handleErrorRes({code: e.code, res, item})
        }
};

const getUxCorrelation  = async (req: Request, res: Response) => {
  const {id, user_id} = req.query

  try{      
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
          handleResponse.handleGetRes({code: "GET-01", res, content: result})
            return
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
      handleResponse.handleGetRes({code: "GET-01", res, content: result})
    }catch(e: any){
        handleResponse.handleErrorRes({code: e.code, res, item})
    }
};


const updateUxCorrelation  = async (req: Request, res: Response) => {
  try {
    const {id, ...data} = req.body
    await prisma.uxCorrelation.update({data, where: {id: id}})
    setTimeout(async ()=>{
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
      handleResponse.handleCreateRes({code: "UPD-01", res, item, content: result})
    }, 500)
  } catch(e: any){
    handleResponse.handleErrorRes({code: e.code, res, item})
  }
};

const deleteUxCorrelation  = async (req: Request, res: Response) => {
    const { id } = req.query
    try{
        if(!id){
          handleResponse.handleErrorRes({code: "ERR-01", res, item})
        }
        await prisma.uxCorrelation.delete({where: {id: id?.toString()}});
        handleResponse.handleDeleteRes({code: "DEL-01", res, item})
    }catch(e: any){
        handleResponse.handleErrorRes({code: e.code, res, item})
    }
}


export default { createUxCorrelation, deleteUxCorrelation, getUxCorrelation, updateUxCorrelation }
