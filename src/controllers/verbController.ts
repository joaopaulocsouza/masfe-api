import { Request, Response } from "express";
import prisma from "../config/db";
import { verifyJWT } from "../utils/verifyJWT/verifyJWT";
import { GarretArr, GarretVars } from "../utils/defines/defines";
import handleResponse from "../utils/handleResponse/handleResponse";

const item = "Verbo"

const createVerb = async (req: Request, res: Response) => {
    const {verb, dimension, ...rest} = req.body 
    if(!verb || !dimension){
       return handleResponse.handleCreateRes({code: "CRT-03", res})
    }
    try{
        const {token} = req.cookies
        const validate = await verifyJWT(token)
        if(!validate){
           return handleResponse.handleErrorRes({code: "ERR-02", res})
        }
        const result = await prisma.verb.create({data: {verb, dimension, user_id: validate!}})
        setTimeout(async () => {
            GarretArr.forEach(async (e, idx) => {
                if(rest[e])  console.log({verb_id: result.id, garret_id: (idx+1).toString()})
                if(rest[e]) await prisma.verbGarret.create({data: {verb_id: result.id, garret_id: (idx+1).toString()}})           
                });
        }, 2000)
        setTimeout(async () => {
            let garret: any = {}
            const r = await prisma.verb.findUnique({
                where: {id: result.id.toString()},
                select: {
                    verbGarret: {
                        select: {
                            garret_id: true
                        }
                    }
                }
            })
            r?.verbGarret.forEach((e: any) => {
                Object.assign(garret, {
                    [GarretVars[Number(e.garret_id)-1]]: true
                })
            })
            return handleResponse.handleCreateRes({code: "CRT-01", res, item, content: {...result, ...garret}})
        }, 2000)
    }catch(e: any){
       return handleResponse.handleErrorRes({code: e.code, res, item})
    }
};

const getVerb = async (req: Request, res: Response) => {
    const {id, user_verbs} = req.query
    let garret = {}
    try{ 
        const {token} = req.cookies
        const validate = await verifyJWT(token)
        if(!validate){
           return handleResponse.handleErrorRes({code: "ERR-02", res})
        }
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
                    id: true,
                    dimension: true
                }
            })
            result?.verbGarret.forEach((e: any) => {
                Object.assign(garret, {
                    [GarretVars[Number(e.garret_id)-1]]: true
                })
            })
           return handleResponse.handleGetRes({code: "GET-01", res, content: {...result, ...garret}})
        } 
        if(user_verbs){
            
            const result = await prisma.verb.findMany({
                where: {user_id: validate??""},
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
           return handleResponse.handleGetRes({code: "GET-01", res, content: result})
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
       return handleResponse.handleGetRes({code: "GET-01", res, content: result})
    }catch(e: any){
       return handleResponse.handleErrorRes({code: e.code, res, item})
    }
};


const updateVerb = async (req: Request, res: Response) => {
    const {verb, dimension, removeGarret, id, ...rest} = req.body 
    try{
        const {token} = req.cookies
        const validate = await verifyJWT(token)
        if(!validate){
           return handleResponse.handleErrorRes({code: "ERR-02", res})
        }
        if(removeGarret){
            GarretArr.forEach(async (e, idx) => {
                if(rest[e]){
                await prisma.verbGarret.delete({
                    where: 
                    { verb_id_garret_id: 
                        {
                            garret_id: (idx+1).toString(), 
                            verb_id: id.toString()
                        }
                    }})      
                }     
            });
        }else{
            await prisma.verb.update({
                where: {id: id.toString()},
                data: {verb, dimension}
            })
            GarretArr.forEach(async (e, idx) => {
                if(rest[e]) await prisma.verbGarret.create({data: {verb_id: id, garret_id: (idx+1).toString()}})           
            });
        }
        setTimeout(async () => {
            let garret: any = {}
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
            result?.verbGarret.forEach((e: any) => {
                Object.assign(garret, {
                    [GarretVars[Number(e.garret_id)-1]]: true
                })
            })
            return handleResponse.handleUpdateRes({code: "UPD-01", res, item, content: {...result, ...garret}})
        }, 2000)
    }catch(e: any){
        console.log(e)
       return handleResponse.handleErrorRes({code: e.code, res, item})
    }
};

const deleteVerb = async (req: Request, res: Response) => {
    const { id } = req.query
    try{
        const {token} = req.cookies
        const validate = await verifyJWT(token)
        if(!validate){
           return handleResponse.handleErrorRes({code: "ERR-02", res})
        }
        await prisma.verb.delete({where: {id: id?.toString()}});
       return handleResponse.handleDeleteRes({code: 'DEL-01', res, item});
    }catch(e: any){
        console.log(e)
       return handleResponse.handleErrorRes({code: e.code, res, item})
    }
}


export default { createVerb, updateVerb, deleteVerb, getVerb }
