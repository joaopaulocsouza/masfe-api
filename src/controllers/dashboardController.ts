import { Request, Response } from "express";
import prisma from "../config/db";
import { verifyJWT } from "@utils/verifyJWT/verifyJWT";
import { Garret } from "@utils/defines/defines";
import handleResponse from "@utils/handleResponse/handleResponse";

const getDashboard = async (req: Request, res: Response) => {
    try{        
        const {cookie} = req.headers
        const validate = !!cookie?await verifyJWT(cookie):null
        if(!validate){
            handleResponse.handleErrorRes({code: "ERR-02", res})
        }
        const garret = await prisma.verbGarret.groupBy({
            _count: {
                verb_id: true
            },
            by: ["garret_id"],
        })

        const count_verbs = await prisma.uxCorrelation.groupBy({
            by: ["verb_id"],
            _count: true,
            take: 10,
            orderBy: {
                _count: {
                    verb_id: "desc"
                }
            }
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
            },
            where: {
                user_id: validate??""
            }
        })
        
        handleResponse.handleGetRes({code: 'GET-01', res, content: {garret: resGarret, verbs: resVerbs, uxCorrelations}})
    }catch(e: any){
        console.log(e)
        handleResponse.handleErrorRes({code: e.code, res})
    }

  };
  
  export default {getDashboard}