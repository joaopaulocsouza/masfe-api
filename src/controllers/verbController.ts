import { Request, Response } from "express";
import prisma from "../config/db";
import { verifyJWT } from "@utils/verifyJWT/verifyJWT";
import { GarretArr, GarretVars } from "@utils/defines/defines";
import handleResponse from "@utils/handleResponse/handleResponse";

const item = "Verbo"

const createVerb = async (req: Request, res: Response) => {
    const {verb, dimension, ...rest} = req.body 
    if(!verb || !dimension){
        handleResponse.handleCreateRes({code: "CRT-03", res})
        return
    }
    try{
        const {cookie} = req.headers
        const validate = await verifyJWT(cookie??"")
        if(!validate){
            handleResponse.handleErrorRes({code: "ERR-02", res})
        }
        const result = await prisma.verb.create({data: {verb, dimension, user_id: validate!}})
        GarretArr.forEach(async (e, idx) => {
            if(rest[e]) await prisma.verbGarret.create({data: {verb_id: result.id, garret_id: (idx+1).toString()}})           
        });
        handleResponse.handleCreateRes({code: "CRT-01", res, item})
    }catch(e: any){
        handleResponse.handleErrorRes({code: e.code, res, item})
    }
};

const getVerb = async (req: Request, res: Response) => {
    const {id, user_verbs} = req.query
    let garret = {}


    try{ 
        const {cookie} = req.headers
        const validate = await verifyJWT(cookie??"")
        if(!validate){
            handleResponse.handleErrorRes({code: "ERR-02", res})
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
                    dimension: true
                }
            })
            result?.verbGarret.forEach(e => {
                Object.assign(garret, {
                    [GarretVars[Number(e.garret_id)-1]]: true
                })
            })
            handleResponse.handleGetRes({code: "GET-01", res, content: {verb: result?.verb, dimension: result?.dimension, ...garret}})
            return
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
            handleResponse.handleGetRes({code: "GET-01", res, content: result})
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
        handleResponse.handleGetRes({code: "GET-01", res, content: result})
    }catch(e: any){
        handleResponse.handleErrorRes({code: e.code, res, item})
    }
};


const updateVerb = async (req: Request, res: Response) => {
    const {verb, dimension, removeGarret, id, ...rest} = req.body 
    try{
        const {cookie} = req.headers
        const validate = await verifyJWT(cookie??"")
        if(!validate){
            handleResponse.handleErrorRes({code: "ERR-02", res})
        }
        if(removeGarret){
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
            handleResponse.handleErrorRes({code: 'DEL-01', item, res})
            return
        }
        await prisma.verb.update({
            where: {id: id.toString()},
            data: {verb, dimension}
        })
        GarretArr.forEach(async (e, idx) => {
            if(rest[e]) await prisma.verbGarret.create({data: {verb_id: id, garret_id: (idx+1).toString()}})           
        });
        handleResponse.handleUpdateRes({code: "UPD-01", res, item})
    }catch(e: any){
        handleResponse.handleErrorRes({code: e.code, res, item})
    }
};

const deleteVerb = async (req: Request, res: Response) => {
    const { id } = req.query
    try{
        const {cookie} = req.headers
        const validate = await verifyJWT(cookie??"")
        if(!validate){
            handleResponse.handleErrorRes({code: "ERR-02", res})
        }
        await prisma.verb.delete({where: {id: id?.toString()}});
        handleResponse.handleDeleteRes({code: 'DEL-01', res, item});
    }catch(e: any){
        console.log(e)
        handleResponse.handleErrorRes({code: e.code, res, item})
    }
}


export default { createVerb, updateVerb, deleteVerb, getVerb }
