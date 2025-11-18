import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/MongooseConnection";
import bookRoutes from "./routes/BookRoutes";
import authRoutes from './routes/authRoutes'; 
import solicitacaoRoutes from './routes/solicitacaoRoutes';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());


app.use("/api/books", bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/solicitacoes', solicitacaoRoutes);


connectDB()
  .then(() => {
    console.log("✅ MongoDB conectado");

    app.listen(3000, () => {
      console.log("🚀 Servidor rodando na porta 3000");
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no MongoDB:", err);
  });

export default app;

