import express from "express"
const verbRoutes = express.Router()
import verbController from "../controllers/verbController"

verbRoutes.post('/', verbController.createVerb)
verbRoutes.get('/', verbController.getVerb)
verbRoutes.put('/', verbController.updateVerb)
verbRoutes.delete('/', verbController.deleteVerb)

export default verbRoutes