import express from "express"
const accetanceCriteriaRoutes = express.Router()
import acceptanceCriteriaController from "@controllers/acceptanceCriteriaController"

accetanceCriteriaRoutes.post('/', acceptanceCriteriaController.createAcceptanceCriteria)
accetanceCriteriaRoutes.get('/', acceptanceCriteriaController.getAcceptanceCriteria)
accetanceCriteriaRoutes.put('/', acceptanceCriteriaController.updateAcceptanceCriteria)
accetanceCriteriaRoutes.delete('/', acceptanceCriteriaController.deleteAcceptanceCriteria)

export default accetanceCriteriaRoutes