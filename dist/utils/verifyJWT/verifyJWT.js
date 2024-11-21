"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = async (value) => {
    const token = value.split("=")[1];
    try {
        const cookie = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        return cookie.id;
    }
    catch (e) {
        return null;
    }
};
exports.verifyJWT = verifyJWT;
