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
                }
            },
            where: {
                user_id: validate!
            }
        })
        
        res.status(200).json({
            uxs,
        })
    }catch(e){
        return
    }

  };
  
  export default {getDashboard}