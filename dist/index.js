"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("@routes/userRoutes"));
const verbRoutes_1 = __importDefault(require("@routes/verbRoutes"));
const acceptanceCriteriaRoutes_1 = __importDefault(require("@routes/acceptanceCriteriaRoutes"));
const personaRoutes_1 = __importDefault(require("@routes/personaRoutes"));
const uxCorrelation_1 = __importDefault(require("@routes/uxCorrelation"));
const verbACRoutes_1 = __importDefault(require("@routes/verbACRoutes"));
const authRoutes_1 = __importDefault(require("@routes/authRoutes"));
const dashboardRoutes_1 = __importDefault(require("@routes/dashboardRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Substitua pela URL do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Permitir cookies, se necessário
}));
app.use('/users', userRoutes_1.default);
app.use('/verbs', verbRoutes_1.default);
app.use('/acceptance-criteria', acceptanceCriteriaRoutes_1.default);
app.use('/personas', personaRoutes_1.default);
app.use('/verb-ac', verbACRoutes_1.default);
app.use('/ux-correlation', uxCorrelation_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/dashboard', dashboardRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
