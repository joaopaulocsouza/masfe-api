"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const handleError_1 = require("@utils/handleError/handleError");
const createPersona = async (req, res) => {
    if (!req.body.name) {
        res.status(400).json(handleError_1.missingField);
    }
    try {
        const persona = await db_1.default.persona.create({ data: { ...req.body, user_id: "41c462d3-ef7a-45a4-b6b3-e370ed86c7c4", age: Number(req.body.age) } });
        res.status(201).json(persona);
    }
    catch (e) {
        console.log(e);
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const getPersona = async (req, res) => {
    const { id, user_id } = req.query;
    try {
        if (id) {
            const persona = await db_1.default.persona.findUnique({ where: {
                    id: id.toString(),
                } });
            if (!persona) {
                res.status(404).json({ message: 'Persona não encontrada' });
            }
            res.status(200).json(persona);
        }
        else if (user_id) {
            const persona = await db_1.default.persona.findMany({
                where: {
                    user_id: user_id.toString()
                }
            });
            if (!persona) {
                res.status(404).json({ message: 'Nenhuma Persona foi encontrada' });
            }
            res.status(200).json(persona);
        }
        else {
            const persona = await db_1.default.persona.findMany();
            res.status(200).json(persona);
        }
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const updatePersona = async (req, res) => {
    try {
        const { id, ...data } = req.body;
        const persona = await db_1.default.persona.update({ data, where: { id: id } });
        res.status(200).json(persona);
    }
    catch (e) {
        88;
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const deletePersona = async (req, res) => {
    const { id } = req.query;
    try {
        if (!id) {
            res.status(404).json({ message: 'Persona não encontrada' });
        }
        try {
            const persona = await db_1.default.persona.delete({ where: { id: id?.toString() } });
            if (persona) {
                res.status(200).json(persona);
            }
            else {
                res.status(404).json({ message: 'persona não encontrada' });
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
exports.default = { createPersona, deletePersona, getPersona, updatePersona };
