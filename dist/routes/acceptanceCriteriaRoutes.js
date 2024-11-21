"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accetanceCriteriaRoutes = express_1.default.Router();
const acceptanceCriteriaController_1 = __importDefault(require("@controllers/acceptanceCriteriaController"));
accetanceCriteriaRoutes.post('/', acceptanceCriteriaController_1.default.createAcceptanceCriteria);
accetanceCriteriaRoutes.get('/', acceptanceCriteriaController_1.default.getAcceptanceCriteria);
accetanceCriteriaRoutes.put('/', acceptanceCriteriaController_1.default.updateAcceptanceCriteria);
accetanceCriteriaRoutes.delete('/', acceptanceCriteriaController_1.default.deleteAcceptanceCriteria);
exports.default = accetanceCriteriaRoutes;
