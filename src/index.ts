import express from "express";
import dotenv from  "dotenv"
import userRoutes from "./routes/userRoutes"
import verbRoutes from "./routes/verbRoutes";
import personaRoutes from "./routes/personaRoutes";
import uxCorrelationRoutes from "./routes/uxCorrelation";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import cors from 'cors'
import recoverRoutes from "./routes/recoverRoutes";
import cookieParser from "cookie-parser";
import path = require("path");


dotenv.config();
const app = express();
app.use(express.json()); 

app.use(cors({
  origin: [ 'https://masfe.onrender.com','https://masfe.vercel.app/'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
}));

app.use(cookieParser());


app.use('/api/users', userRoutes)
app.use('/api/verbs', verbRoutes)
app.use('/api/personas', personaRoutes)
app.use('/api/ux-correlation', uxCorrelationRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/recover', recoverRoutes)

// const frontendPath = path.join(__dirname, '../web/dist');
// app.use(express.static(frontendPath));
// app.use('*', (req, res) => {
//   res.sendFile(path.join(frontendPath, 'index.html'))
// })

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
