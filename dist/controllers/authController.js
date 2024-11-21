"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const handleError_1 = require("@utils/handleError/handleError");
const hash_1 = require("@utils/hash/hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json(handleError_1.missingField);
    }
    try {
        const user = await db_1.default.user.findUnique({
            where: {
                email: req.body.email
            },
            select: {
                id: true,
                name: true,
                password: true
            }
        });
        if (user) {
            const verifyCredentials = await (0, hash_1.compare)(req.body.password, user?.password);
            if (verifyCredentials) {
                const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET, { expiresIn: 20000 });
                res.cookie('token', token);
                res.status(200).json({ name: user.name, message: "Login realizada com sucesso", code: "LOGIN_SUCESS" });
            }
            else
                res.status(400).json(handleError_1.invalidCredentials);
        }
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Deslogado com sucesso", code: "LOGOUT_SUCESS" });
};
exports.default = { login, logout };
