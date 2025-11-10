import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/MongooseConnection";
import bookRoutes from "./routes/BookRoutes";
import authRoutes from './routes/authRoutes'; 
import solicitacaoRoutes from './routes/solicitacaoRoutes';


dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', solicitacaoRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


export default app;
