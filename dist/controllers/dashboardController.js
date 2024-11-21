"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const verifyJWT_1 = require("@utils/verifyJWT/verifyJWT");
const handleError_1 = require("@utils/handleError/handleError");
const getDashboard = async (req, res) => {
    const validate = await (0, verifyJWT_1.verifyJWT)(req.headers.cookie ?? "");
    if (!validate) {
        res.status(401).json(handleError_1.unauthorized);
    }
    try {
        const uxs = await db_1.default.uxCorrelation.findMany({
            take: 20,
            select: {
                name: true,
                description: true,
                persona: {
                    select: {
                        name: true,
                        occupation: true
                    }
                },
                verb_ac: {
                    select: {
                        verb: {
                            select: {
                                verb: true
                            }
                        },
                        ac: {
                            select: {
                                criteria: true
                            }
                        }
                    }
                }
            },
            where: {
                user_id: validate
            }
        });
        const verbs = await db_1.default.verbAC.findMany({
            select: {
                id: true,
                verb: true,
                verb_id: true,
                _count: {
                    select: {
                        uxCorrelations: {}
                    }
                }
            }
        });
        const acDimensionCount = await db_1.default.accetanceCriteria.groupBy({
            by: "dimension",
            _count: true,
        });
        console.log({
            uxs,
            verbs,
            dimensions: {
                acDimensionCount
            }
        });
        res.status(200).json({
            uxs,
            verbs,
            dimensions: {
                acDimensionCount
            }
        });
    }
    catch (e) {
        return;
    }
};
exports.default = { getDashboard };
