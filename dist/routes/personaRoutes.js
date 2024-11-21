"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personaRoutes = express_1.default.Router();
const personasController_1 = __importDefault(require("@controllers/personasController"));
personaRoutes.post('/', personasController_1.default.createPersona);
personaRoutes.get('/', personasController_1.default.getPersona);
personaRoutes.put('/', personasController_1.default.updatePersona);
personaRoutes.delete('/', personasController_1.default.deletePersona);
exports.default = personaRoutes;
