"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes = express_1.default.Router();
const userController_1 = __importDefault(require("@controllers/userController"));
userRoutes.post('/', userController_1.default.createUser);
userRoutes.get('/', userController_1.default.getAllUsers);
userRoutes.put('/', userController_1.default.updateUser);
userRoutes.delete('/', userController_1.default.deleteUser);
exports.default = userRoutes;
