import express from "express"
const dashboardRoutes = express.Router()
import dashboardController from "@controllers/dashboardController"

dashboardRoutes.get('/', dashboardController.getDashboard)

export default dashboardRoutes