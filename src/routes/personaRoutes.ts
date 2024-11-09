import express from "express"
const personaRoutes = express.Router()
import personaController from "@controllers/personasController"

personaRoutes.post('/', personaController.createPersona)
personaRoutes.get('/', personaController.getPersona)
personaRoutes.put('/', personaController.updatePersona)
personaRoutes.delete('/', personaController.deletePersona)

export default personaRoutes