import { Request, Response } from "express";
import prisma from "../config/db";
import { verifyJWT } from "@utils/verifyJWT/verifyJWT";
import { unauthorized } from "@utils/handleError/handleError";

const getDashboard = async (req: Request, res: Response) => {
    const validate = await verifyJWT(req.headers.cookie??"")
    if(!validate){
        res.status(401).json(unauthorized)
    }
    try{        
        const uxs = await prisma.uxCorrelation.findMany({
            take: 20,
            select: {
                name: true,
                description: true,
                persona: {
                    select: {
                        name: true,
                        occupation: true
                    }
                },
                verb_ac: {
                    select: {
                        verb: {
                            select: {
                                verb: true
                            }
                        },
                        ac: {
                            select: {
                                criteria: true
                            }
                        }
                    }
                }
            },
            where: {
                user_id: validate!
            }
        })
        
        const verbs = await prisma.verbAC.findMany({
            select: {
                id: true,
                verb: true,
                verb_id: true,
                _count: {
                    select: {
                        uxCorrelations: {

                        }
                    }
                }
            }
        })

        const acDimensionCount = await prisma.accetanceCriteria.groupBy({
            by: "dimension",
            _count: true,
        })

        console.log({
            uxs,
            verbs,
            dimensions: {
                acDimensionCount
            }
        })
    
        res.status(200).json({
            uxs,
            verbs,
            dimensions: {
                acDimensionCount
            }
        })
    }catch(e){
        return
    }

  };
  
  export default {getDashboard}