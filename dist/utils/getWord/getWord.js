"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWord = void 0;
const getWord = (word) => {
    switch (word) {
        case 'verb':
            return 'Verbo';
        default:
            return '';
    }
};
exports.getWord = getWord;
