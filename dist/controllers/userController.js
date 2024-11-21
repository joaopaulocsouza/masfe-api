"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const hash_1 = require("@utils/hash/hash");
const handleError_1 = require("@utils/handleError/handleError");
const createUser = async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.password || !req.body.birthday) {
        res.status(400).json(handleError_1.missingField);
    }
    try {
        const password = await (0, hash_1.encrypt)(req.body.password);
        const user = await db_1.default.user.create({ data: { ...req.body, password } });
        res.status(201).json(user);
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const getAllUsers = async (req, res) => {
    const { id } = req.query;
    try {
        if (id) {
            const users = await db_1.default.user.findUnique({ where: {
                    id: id.toString(),
                } });
            if (!users) {
                res.status(404).json({ message: "Usuário não encontrado" });
            }
            res.status(200).json(users);
        }
        else {
            const users = await db_1.default.user.findMany();
            res.status(200).json(users);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({});
    }
};
const updateUser = async (req, res) => {
    console.log(req.body);
    try {
        const { id, ...data } = req.body;
        const user = await db_1.default.user.update({ data, where: { id: id } });
        res.status(200).json(user);
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const deleteUser = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.status(404).json({ message: 'User not found' });
    }
    try {
        const deletedUser = await db_1.default.user.delete({ where: { id: id?.toString() } });
        if (deletedUser) {
            res.status(200).json(deletedUser);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
exports.default = { getAllUsers, createUser, updateUser, deleteUser };
