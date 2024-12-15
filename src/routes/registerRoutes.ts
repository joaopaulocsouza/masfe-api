import express from "express"
const registerRoutes = express.Router()
import userController from "@controllers/userController"

registerRoutes.post('/', userController.createUser)
export default registerRoutes
