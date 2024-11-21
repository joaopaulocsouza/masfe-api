"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const handleError_1 = require("@utils/handleError/handleError");
const createUxCorrelation = async (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json(handleError_1.missingField);
    }
    try {
        const ux = await db_1.default.uxCorrelation.create({ data: req.body });
        res.status(201).json(ux);
    }
    catch (e) {
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const getUxCorrelation = async (req, res) => {
    const { id, user_id } = req.query;
    try {
        if (id) {
            const ux = await db_1.default.uxCorrelation.findUnique({ where: {
                    id: id.toString(),
                } });
            if (!ux) {
                res.status(404).json({ message: 'UX Correlation não encontrada' });
            }
            res.status(200).json(ux);
        }
        else if (user_id) {
            const ux = await db_1.default.uxCorrelation.findMany({
                where: {
                    user_id: user_id.toString()
                }
            });
            if (!ux) {
                res.status(404).json({ message: 'Nenhuma UX Correlation foi encontrada' });
            }
            res.status(200).json(ux);
        }
        else {
            const ux = await db_1.default.uxCorrelation.findMany();
            res.status(200).json(ux);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const updateUxCorrelation = async (req, res) => {
    try {
        const { id, ...data } = req.body;
        const ux = await db_1.default.uxCorrelation.update({ data, where: { id: id } });
        res.status(200).json(ux);
    }
    catch (e) {
        88;
        res.status(500).json((0, handleError_1.handleError)(e));
    }
};
const deleteUxCorrelation = async (req, res) => {
    const { id } = req.query;
    try {
        if (!id) {
            res.status(404).json({ message: 'UX Correlation não encontrada' });
        }
        try {
            const ux = await db_1.default.uxCorrelation.delete({ where: { id: id?.toString() } });
            if (ux) {
                res.status(200).json(ux);
            }
            else {
                res.status(404).json({ message: 'UX correlation não encontrada' });
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
exports.default = { createUxCorrelation, deleteUxCorrelation, getUxCorrelation, updateUxCorrelation };
