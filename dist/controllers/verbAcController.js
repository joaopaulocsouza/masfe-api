"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const handleError_1 = require("@utils/handleError/handleError");
const createVerbAC = async (req, res) => {
    try {
        const detail = await db_1.default.verbAC.create({ data: req.body });
        res.status(201).json(detail);
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const getVerbAC = async (req, res) => {
    const { id, verb_id, ac_id } = req.query;
    try {
        if (id) {
            const detail = await db_1.default.verbAC.findUnique({ where: {
                    id: id.toString(),
                } });
            if (!detail) {
                res.status(404).json({ message: '' });
            }
            res.status(201).json(detail);
        }
        else if (verb_id) {
            const detail = await db_1.default.verbAC.findMany({
                where: {
                    verb_id: verb_id.toString()
                },
                select: {
                    ac: true
                }
            });
            if (!detail) {
                res.status(404).json({ message: '' });
            }
            res.status(200).json(detail);
        }
        else if (ac_id) {
            const detail = await db_1.default.verbAC.findMany({
                where: {
                    ac_id: ac_id.toString()
                },
            });
            if (!detail) {
                res.status(404).json({ message: '' });
            }
            res.status(200).json(detail);
        }
        else {
            const details = await db_1.default.verbAC.findMany();
            res.status(200).json(details);
        }
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const updateVerbAC = async (req, res) => {
    try {
        const { id, ...data } = req.body;
        const detail = await db_1.default.verbAC.update({ data, where: { id: id } });
        res.status(200).json(detail);
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const deleteVerbAC = async (req, res) => {
    const { id } = req.query;
    try {
        if (!id) {
            res.status(404).json({ message: '' });
        }
        try {
            const detail = await db_1.default.verbAC.delete({ where: { id: id?.toString() } });
            if (detail) {
                res.status(200).json(detail);
            }
            else {
                res.status(404).json({ message: '' });
            }
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
exports.default = { createVerbAC, getVerbAC, updateVerbAC, deleteVerbAC };
