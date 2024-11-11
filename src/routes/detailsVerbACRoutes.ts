import express from "express"
const detailsVerbACRoutes = express.Router()
import detailsVerbACControler from "@controllers/detailsVerbACController"

detailsVerbACRoutes.post('/', detailsVerbACControler.createDetailsVerbAC)
detailsVerbACRoutes.get('/', detailsVerbACControler.getDetailVerbAC)
detailsVerbACRoutes.put('/', detailsVerbACControler.updateDetailVerbAC)
detailsVerbACRoutes.delete('/', detailsVerbACControler.deleteDetailVerbAC)

export default detailsVerbACRoutes