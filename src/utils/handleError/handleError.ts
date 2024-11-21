import { Prisma } from "@prisma/client";

export const handleError = (e: Prisma.PrismaClientKnownRequestError) => {
    switch(e.code){
        case 'P2002':
            return {code: 'P2002', message: e?.meta?.target +" já cadastrado"}
        default:
            return {code: '0000', message: "Erro interno do servidor"}
    }
}

export const missingField = {code: "MISSING_FIELDS", message: "Um ou mais campos obrigatórios não foram preenchidos"}
export const unauthorized = {code: 'UNAUTHORIZED', message: 'Acesso não autorizado'}
export const invalidCredentials = {code: 'INVALID_CREDENTIALS', message: 'Email e/ou senha inválido(s)'}


export default {handleError, missingField, unauthorized, invalidCredentials }