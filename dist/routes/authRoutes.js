"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes = express_1.default.Router();
const authController_1 = __importDefault(require("@controllers/authController"));
authRoutes.post('/', authController_1.default.login);
authRoutes.get('/', authController_1.default.logout);
exports.default = authRoutes;
