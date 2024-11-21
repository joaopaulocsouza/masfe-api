"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uxCorrelationRoutes = express_1.default.Router();
const uxCorrelationController_1 = __importDefault(require("@controllers/uxCorrelationController"));
uxCorrelationRoutes.post('/', uxCorrelationController_1.default.createUxCorrelation);
uxCorrelationRoutes.get('/', uxCorrelationController_1.default.getUxCorrelation);
uxCorrelationRoutes.put('/', uxCorrelationController_1.default.updateUxCorrelation);
uxCorrelationRoutes.delete('/', uxCorrelationController_1.default.deleteUxCorrelation);
exports.default = uxCorrelationRoutes;
