import express from "express"
const authRoutes = express.Router()
import authController from "../controllers/authController"

authRoutes.post('/', authController.login)
authRoutes.get('/', authController.logout)

export default authRoutes