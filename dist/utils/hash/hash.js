"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encrypt = async (text) => {
    return await bcrypt_1.default.hash(text, 13);
};
exports.encrypt = encrypt;
const compare = async (text, hash) => {
    return await bcrypt_1.default.compare(text, hash);
};
exports.compare = compare;
