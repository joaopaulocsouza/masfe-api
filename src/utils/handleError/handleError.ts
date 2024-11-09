import { Prisma } from "@prisma/client";

export const handleError = (e: Prisma.PrismaClientKnownRequestError) => {
    switch(e.code){
        case 'P2002':
            return {code: 'P2002', message: e?.meta?.target +" já cadastrado"}
        default:
            return {code: '0000', message: "Erro interno do servidor"}
    }
}

export const missingField = {code: "ERR-001", message: "Um ou mais campos obrigatórios não foram preenchidos"}