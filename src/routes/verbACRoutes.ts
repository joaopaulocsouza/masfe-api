import express from "express"
const verbAcRoutes = express.Router()
import verbAcController from  '@controllers/verbAcController'

verbAcRoutes.post('/', verbAcController.createVerbAC)
verbAcRoutes.get('/', verbAcController.getVerbAC)
verbAcRoutes.put('/', verbAcController.updateVerbAC)
verbAcRoutes.delete('/', verbAcController.deleteVerbAC)

export default verbAcRoutes