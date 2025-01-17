import { resCodes } from "./resCodes"
import { Response } from "express"

interface Props {
    code: string
    res: Response
    item?: string
    content?: any
}

export const handleErrorRes = ({code, res, item}: Props) => {
    switch(code){
        case "P2002":
            res.status(400).json({
                code: "CRT-02",
                message: item+resCodes["CRT-02"]
            })
            return
        case "P2003":
            res.status(400).json({
                code: "DEL-02",
                message: resCodes["DEL-02"]
            })
            return
        
        case 'ERR-01': case 'P2025':
            res.status(404).json({
                code: 'ERR-01',
                message: item+resCodes["ERR-01"]
            })
            return 
        case 'ERR-02':
            res.status(401).json({
                code: 'ERR-02',
                message: resCodes["ERR-02"]
            })
            return 
        default:
            res.status(500).json({
                code: "ERR-01",
                message: "Erro interno do servidor"
            })
    }
}

export const handleCreateRes = ({code, res, item, content}: Props) => {
    switch(code){
        case "CRT-01": 
            res.status(201).json({
                code: "CRT-01",
                message: item+resCodes["CRT-01"],
                content
            })
            return
        case "CRT-02":
            res.status(400).json({
                code: "CRT-02",
                message: item+resCodes["CRT-02"]
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

export const handleUpdateRes = ({code, res, item, content}: Props) => {
    switch(code){
        case "UPD-01": 
            res.status(201).json({
                code: "UPD-01",
                message: item+resCodes["UPD-01"],
                content
            })
            return
    }
}

export const handleDeleteRes = ({code, res, item}: Props) => {
    switch(code){
        case "DEL-01": 
            res.status(201).json({
                code: "DEL-01",
                message: item+resCodes["DEL-01"]
            })
            return
    }
}


export const handleGetRes = ({code, res, content}: Props) => {
    switch(code){
        case "GET-01": 
            res.status(200).json({
                code: "GET-01",
                content
            })
            return
    }
}

export const handleRegisterRes = ({code, res, content}: Props) => {
    switch(code){
        case "RGS-01": 
            res.cookie("token", content.token, {...content.options, sameSite: "none", secure: true}).json({
                code: "RGS-01",
                message: resCodes["RGS-01"]
            })
            return
        }
}

export const handleLoginRes = ({code, res, content}: Props) => {
 switch(code){
        case "LGN-01": 
            res.cookie("token", content.token, {...content.options, sameSite: "none", secure: true, path: "/"}).json({
                code: "LGN-01",
                message: resCodes["LGN-01"]
            })
            return
        case "LGN-02": 
            res.status(401).json({
                code: "LGN-02",
                message: resCodes["LGN-02"]
            })
            return
        case "LGN-03": 
            res.status(400).json({
                code: "LGN-03",
                message: resCodes["LGN-03"]
            })
            return
        case "LGT-01": 
            res.status(200).json({
                code: "LGT-01",
                message: resCodes["LGT-01"]
            })
            return
    }
}

export default {handleCreateRes, handleDeleteRes, handleErrorRes, handleLoginRes, handleUpdateRes, handleGetRes, handleRegisterRes}