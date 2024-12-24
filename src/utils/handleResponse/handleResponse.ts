import { resCodes } from "./resCodes"
import { Response } from "express"

interface Props {
    code: string
    res: Response
}

export const handleErrorRes = ({code, res}: Props) => {
    switch(code){
        case "P2002":
            res.status(400).json({
                code: "CRT-02",
                message: resCodes["CRT-02"]
            })
            return
        case "P2003":
            res.status(400).json({
                code: "DEL-02",
                message: resCodes["DEL-02"]
            })
            return
        default:
            res.status(500).json({
                code: "ERR-01",
                message: "Erro interno do servidor"
            })
    }
}

export const handleCreateRes = ({code, res}: Props) => {
    switch(code){
        case "CRT-01": 
            res.status(201).json({
                code: "CRT-01",
                message: resCodes["CRT-01"]
            })
            return
        case "CRT-02":
            res.status(400).json({
                code: "CRT-02",
                message: resCodes["CRT-02"]
            })
            return
        case "CRT-03":
            res.status(400).json({
                code: "CRT-03",
                message: resCodes["CRT-03"]
            })
            return
    }

}

export const handleUpdateRes = ({code, res}: Props) => {
    switch(code){
        case "UPD-01": 
            res.status(201).json({
                code: "UPD-01",
                message: resCodes["UPD-01"]
            })
            return
    }
}

export const handleDeleteRes = ({code, res}: Props) => {

}

export const handleLoginRes = ({code, res}: Props) => {

}

export default {handleCreateRes, handleDeleteRes, handleErrorRes, handleLoginRes, handleUpdateRes}