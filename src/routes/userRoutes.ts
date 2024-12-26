import express from "express"
const userRoutes = express.Router()
import userController from "../controllers/userController"

userRoutes.post('/', userController.createUser)
userRoutes.get('/', userController.getAllUsers)
userRoutes.put('/', userController.updateUser)
userRoutes.delete('/', userController.deleteUser)

export default userRoutes
