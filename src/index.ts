import express from "express";
import dotenv from  "dotenv"
import userRoutes from "@routes/userRoutes"
import verbRoutes from "@routes/verbRoutes";
import accetanceCriteriaRoutes from "@routes/acceptanceCriteriaRoutes";
import personaRoutes from "@routes/personaRoutes";
import uxCorrelationRoutes from "@routes/uxCorrelation";
import detailsVerbACRoutes from "@routes/detailsVerbACRoutes";

dotenv.config();
const app = express();
app.use(express.json()); 


app.use('/users', userRoutes)
app.use('/verbs', verbRoutes)
app.use('/acceptance-criteria', accetanceCriteriaRoutes)
app.use('/personas', personaRoutes)
app.use('/verb-ac', detailsVerbACRoutes)
app.use('/ux-correlation', uxCorrelationRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
