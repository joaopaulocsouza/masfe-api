import express from "express";
import dotenv from  "dotenv"
import userRoutes from "@routes/userRoutes"
import verbRoutes from "@routes/verbRoutes";
import accetanceCriteriaRoutes from "@routes/acceptanceCriteriaRoutes";
import personaRoutes from "@routes/personaRoutes";
import uxCorrelationRoutes from "@routes/uxCorrelation";
import authRoutes from "@routes/authRoutes";
import dashboardRoutes from "@routes/dashboardRoutes";
import cors from 'cors'
import recoverRoutes from "@routes/recoverRoutes";

dotenv.config();
const app = express();
app.use(express.json()); 


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
}));

app.use('/users', userRoutes)
app.use('/verbs', verbRoutes)
app.use('/acceptance-criteria', accetanceCriteriaRoutes)
app.use('/personas', personaRoutes)
app.use('/ux-correlation', uxCorrelationRoutes)
app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/recover', recoverRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
