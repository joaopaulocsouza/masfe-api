import express from "express"
const recoverRoutes = express.Router()
import recoverController from "../controllers/recoverController"

recoverRoutes.get('/', recoverController.sendCodeRecoverAcc)

export default recoverRoutes