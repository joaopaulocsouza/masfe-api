import { Request, Response } from "express";
import prisma from "../config/db";
import { handleError } from "@utils/handleError/handleError";
import { verifyJWT } from "@utils/verifyJWT/verifyJWT";
import { GarretArr, GarretVars } from "@utils/defines/defines";
import handleResponse from "@utils/handleResponse/handleResponse";

const createVerb = async (req: Request, res: Response) => {
    const {verb, dimension, ...rest} = req.body 
    if(!verb || !dimension){
        handleResponse.handleCreateRes({code: "CRT-03", res})
        return
    }
    try{
        const result = await prisma.verb.create({data: {verb, dimension, user_id: "832d64d2-034f-46f2-8b5c-93f211be98e3"}})
        GarretArr.forEach(async (e, idx) => {
            if(rest[e]) await prisma.verbGarret.create({data: {verb_id: result.id, garret_id: (idx+1).toString()}})           
        });
        handleResponse.handleCreateRes({code: "CRT-01", res})
    }catch(e: any){
        console.log(e)
        handleResponse.handleErrorRes({code: e.code, res})
    }
};

const getVerb = async (req: Request, res: Response) => {
    const {id, user_verbs} = req.query
    let garret = {}

    const userId = 'c3b80ba7-b01b-44b2-a36d-24309a324997'
    // if(!userId){
    //     res.status(401).json({message: 'É necessaário realizar o login para acessar essa página'})
    // }

    try{ 
        if(id){
            const result = await prisma.verb.findUnique({
                where: {id: id.toString()},
                select: {
                    verb: true,
                    verbGarret: {
                        select: {
                            garret_id: true
                        }
                    },
                    dimension: true
                }
            })
            result?.verbGarret.forEach(e => {
                Object.assign(garret, {
                    [GarretVars[Number(e.garret_id)-1]]: true
                })
            })
            res.status(200).json({verb: result?.verb, dimension: result?.dimension, ...garret})
            return
        } 
        if(user_verbs){
            const result = await prisma.verb.findMany({
                where: {user_id: userId.toString()},
                select: {
                    verb: true,
                    id: true,
                    dimension: true,
                    verbGarret: {
                        select: {
                            garret: {
                                select: {
                                    element: true
                                }
                            }
                        }
                    }
                }
            })
            res.status(200).json(result)
            return
        }  
        
        const result = await prisma.verb.findMany({
            select: {
                verb: true,
                id: true,
                dimension: true,
                verbGarret: {
                    select: {
                        garret: {
                            select: {
                                element: true
                            }
                        }
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })
        res.status(200).json(result)
      
    }catch(e: any){
        handleResponse.handleErrorRes({code: e.code, res})
    }
};


const updateVerb = async (req: Request, res: Response) => {
    const {verb, dimension, removeGarret, id, ...rest} = req.body 
    try{
        if(removeGarret){
            console.log(rest)
            GarretArr.forEach(async (e, idx) => {
                if(rest[e]) await prisma.verbGarret.delete({
                    where: 
                    { verb_id_garret_id: 
                        {
                            garret_id: (idx+1).toString(), 
                            verb_id: id.toString()
                        }
                    }})           
            });
            res.status(200).json({code: 'DEL-01'})
            return
        }
        await prisma.verb.update({
            where: {id: id.toString()},
            data: {verb, dimension}
        })
        GarretArr.forEach(async (e, idx) => {
            if(rest[e]) await prisma.verbGarret.create({data: {verb_id: id, garret_id: (idx+1).toString()}})           
        });
        handleResponse.handleUpdateRes({code: "UPD-01", res})
    }catch(e: any){
        handleResponse.handleErrorRes({code: e.code, res})
    }
};

const deleteVerb = async (req: Request, res: Response) => {
    const { id } = req.query
    try{
        const deletedVerb = await prisma.verb.delete({where: {id: id?.toString()}});
        if (deletedVerb) {
            res.status(200).json(deletedVerb);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }catch(e: any){
        handleResponse.handleErrorRes({code: e.code, res})
    }
}


export default { createVerb, updateVerb, deleteVerb, getVerb }
