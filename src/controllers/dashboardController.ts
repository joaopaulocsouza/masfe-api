import { Request, Response } from "express";
import prisma from "../config/db";
import { verifyJWT } from "@utils/verifyJWT/verifyJWT";
import { unauthorized } from "@utils/handleError/handleError";
import { Garret } from "@utils/defines/defines";
import handleResponse from "@utils/handleResponse/handleResponse";

const getDashboard = async (req: Request, res: Response) => {
    // const validate = await verifyJWT(req.headers.cookie??"")
    // if(!validate){
    //     res.status(401).json(unauthorized)
    // }
    try{        
        const garret = await prisma.verbGarret.groupBy({
            _count: {
                verb_id: true
            },
            by: ["garret_id"]
        })

        const count_verbs = await prisma.uxCorrelation.groupBy({
            by: ["verb_id"],
            _count: true,
            take: 10,
            orderBy: {
                _count: {
                    verb_id: "desc"
                }
            },
        })
        const resVerbs = await Promise.all(
                     count_verbs.map(async (item) => {
                        const verb = await prisma.verb.findUnique({where: {id: item.verb_id}})
                        return {name: verb?.verb??"", value: item._count}
                    })
                )
        const resGarret = garret.map(item => ({name: Garret[Number(item.garret_id)], value: item._count.verb_id}))
        const uxCorrelations = await prisma.uxCorrelation.findMany({
            take: 20,
            select: {
                id: true,
                name: true,
                dimension: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })
        
        handleResponse.handleGetRes({code: 'GET-01', res, content: {garret: resGarret, verbs: resVerbs, uxCorrelations}})
    }catch(e: any){
        console.log(e)
        handleResponse.handleErrorRes({code: e.code, res})
    }

  };
  
  export default {getDashboard}