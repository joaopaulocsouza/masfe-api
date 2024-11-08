import express from "express";
import dotenv from  "dotenv"
import userRoutes from "@routes/userRoutes"

dotenv.config();
const app = express();
app.use(express.json()); 


app.use('/users', userRoutes)

// Inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
