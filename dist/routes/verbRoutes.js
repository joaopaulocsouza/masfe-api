"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verbRoutes = express_1.default.Router();
const verbController_1 = __importDefault(require("@controllers/verbController"));
verbRoutes.post('/', verbController_1.default.createVerb);
verbRoutes.get('/', verbController_1.default.getVerb);
verbRoutes.put('/', verbController_1.default.updateVerb);
verbRoutes.delete('/', verbController_1.default.deleteVerb);
exports.default = verbRoutes;
