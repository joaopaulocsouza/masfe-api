"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const handleError_1 = require("@utils/handleError/handleError");
const createAcceptanceCriteria = async (req, res) => {
    if (!req.body.criteria || !req.body.dimension) {
        res.status(400).json(handleError_1.missingField);
    }
    try {
        await db_1.default.accetanceCriteria.create({ data: { ...req.body, user_id: "41c462d3-ef7a-45a4-b6b3-e370ed86c7c4" } });
        res.status(201).json({ code: "CREATE_SUCESS", message: "Critério de aceitação cadastrado com sucesso" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const getAcceptanceCriteria = async (req, res) => {
    const { id, user } = req.query;
    try {
        if (id) {
            const ac = await db_1.default.accetanceCriteria.findUnique({ where: {
                    id: id.toString(),
                } });
            if (!ac) {
                res.status(404).json({ message: 'Critério de aceitação não encontrado' });
            }
            res.status(201).json(ac);
        }
        else if (user) {
            const ac = await db_1.default.accetanceCriteria.findMany({
                where: {
                    user_id: "41c462d3-ef7a-45a4-b6b3-e370ed86c7c4"
                },
                select: { criteria: true, dimension: true, user: { select: { name: true } } }
            });
            if (!ac) {
                res.status(404).json({ message: 'Nenhum critério de aceitação foi encontrado' });
            }
            res.status(200).json(ac);
        }
        else {
            const ac = await db_1.default.accetanceCriteria.findMany();
            res.status(200).json(ac);
        }
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const updateAcceptanceCriteria = async (req, res) => {
    try {
        const { id, ...data } = req.body;
        const ac = await db_1.default.accetanceCriteria.update({ data, where: { id: id } });
        res.status(200).json(ac);
    }
    catch (e) {
        88;
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const deleteAcceptanceCriteria = async (req, res) => {
    const { id } = req.query;
    try {
        if (!id) {
            res.status(404).json({ message: 'Critério de aceitação não encontrado' });
        }
        try {
            const ac = await db_1.default.accetanceCriteria.delete({ where: { id: id?.toString() } });
            if (ac) {
                res.status(200).json(ac);
            }
            else {
                res.status(404).json({ message: 'Critério de aceitação não encontrado' });
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
exports.default = { createAcceptanceCriteria, deleteAcceptanceCriteria, getAcceptanceCriteria, updateAcceptanceCriteria };
