"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verbAcRoutes = express_1.default.Router();
const verbAcController_1 = __importDefault(require("@controllers/verbAcController"));
verbAcRoutes.post('/', verbAcController_1.default.createVerbAC);
verbAcRoutes.get('/', verbAcController_1.default.getVerbAC);
verbAcRoutes.put('/', verbAcController_1.default.updateVerbAC);
verbAcRoutes.delete('/', verbAcController_1.default.deleteVerbAC);
exports.default = verbAcRoutes;
