"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidCredentials = exports.unauthorized = exports.missingField = exports.handleError = void 0;
const handleError = (e) => {
    switch (e.code) {
        case 'P2002':
            return { code: 'P2002', message: e?.meta?.target + " já cadastrado" };
        default:
            return { code: '0000', message: "Erro interno do servidor" };
    }
};
exports.handleError = handleError;
exports.missingField = { code: "MISSING_FIELDS", message: "Um ou mais campos obrigatórios não foram preenchidos" };
exports.unauthorized = { code: 'UNAUTHORIZED', message: 'Acesso não autorizado' };
exports.invalidCredentials = { code: 'INVALID_CREDENTIALS', message: 'Email e/ou senha inválido(s)' };
exports.default = { handleError: exports.handleError, missingField: exports.missingField, unauthorized: exports.unauthorized, invalidCredentials: exports.invalidCredentials };
