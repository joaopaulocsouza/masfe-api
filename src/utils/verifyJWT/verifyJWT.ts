require('dotenv').config()
import jwt from "jsonwebtoken"

export const verifyJWT = async (token: string) => {
    try{
        console.log(token)
        const cookie = jwt.verify(token, process.env.SECRET!) as {id: string}
        return cookie.id
    }catch(e){
        return null
    }
}