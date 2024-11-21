"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const handleError_1 = require("@utils/handleError/handleError");
const createVerb = async (req, res) => {
    if (!req.body.verb) {
        res.status(400).json(handleError_1.missingField);
    }
    try {
        const verb = await db_1.default.verb.create({ data: { ...req.body, user_id: "41c462d3-ef7a-45a4-b6b3-e370ed86c7c4" } });
        res.status(201).json(verb);
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const getVerb = async (req, res) => {
    const { id, user } = req.query;
    try {
        if (id) {
            const verb = await db_1.default.verb.findUnique({ where: {
                    id: id.toString(),
                } });
            if (!verb) {
                res.status(404).json({ message: "Verbo não encontrado" });
            }
            res.status(200).json(verb);
        }
        else if (user) {
            const verbs = await db_1.default.verb.findMany({ where: {
                    user_id: "41c462d3-ef7a-45a4-b6b3-e370ed86c7c4",
                }, select: { user: { select: { name: true } }, dimension: true, garret: true, id: true, verb: true } });
            if (!verbs) {
                res.status(404).json({ message: "Nenhum verbo encontrado" });
            }
            res.status(200).json(verbs);
        }
        else {
            const verbs = await db_1.default.verb.findMany({ select: { user: { select: { name: true } }, dimension: true, garret: true, id: true, verb: true } });
            res.status(200).json(verbs);
        }
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const updateVerb = async (req, res) => {
    console.log(req.body);
    try {
        const { id, ...data } = req.body;
        const verb = await db_1.default.verb.update({ data, where: { id: id } });
        res.status(200).json(verb);
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const deleteVerb = async (req, res) => {
    const { id } = req.query;
    try {
        if (!id) {
            res.status(404).json({ message: 'User not found' });
        }
        try {
            const deletedVerb = await db_1.default.verb.delete({ where: { id: id?.toString() } });
            if (deletedVerb) {
                res.status(200).json(deletedVerb);
            }
            else {
                res.status(404).json({ message: 'User not found' });
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
exports.default = { createVerb, updateVerb, deleteVerb, getVerb };
