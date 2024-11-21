require('dotenv').config()
import jwt from "jsonwebtoken"

export const verifyJWT = async (value: string) => {
    const token = value.split("=")[1]
    try{
        const cookie = jwt.verify(token, process.env.SECRET!) as {id: string}
        return cookie.id
    }catch(e){
        return null
    }
}