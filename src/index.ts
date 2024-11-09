import express from "express";
import dotenv from  "dotenv"
import userRoutes from "@routes/userRoutes"
import verbRoutes from "@routes/verbRoutes";
import prisma from "./config/db";

dotenv.config();
const app = express();
app.use(express.json()); 


app.use('/users', userRoutes)
app.use('/verbs', verbRoutes)



// Inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
