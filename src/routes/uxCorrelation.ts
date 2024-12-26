import express from "express"
const uxCorrelationRoutes = express.Router()
import uxCorrelationController from "../controllers/uxCorrelationController"

uxCorrelationRoutes.post('/', uxCorrelationController.createUxCorrelation)
uxCorrelationRoutes.get('/', uxCorrelationController.getUxCorrelation)
uxCorrelationRoutes.put('/', uxCorrelationController.updateUxCorrelation)
uxCorrelationRoutes.delete('/', uxCorrelationController.deleteUxCorrelation)

export default uxCorrelationRoutes