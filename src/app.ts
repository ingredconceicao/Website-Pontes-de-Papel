import express from "express";
import connectDB from "./database/MongooseConnection";
import bookRoutes from "./routes/BookRoutes";
import authRoutes from './routes/authRoutes'; 
import solicitacaoRoutes from './routes/solicitacaoRoutes';
import mongoose from 'mongoose';
import{config} from './config/environment'

const URI = config.mongo_uri;
const PORT =config.port

const app = express();
app.use(express.json());


app.use("/api/books", bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/solicitacoes', solicitacaoRoutes);


connectDB()
  .then(() => {
    console.log("✅ MongoDB conectado");

    app.listen(PORT, () => {
      console.log("🚀 Servidor rodando na porta 3000");
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no MongoDB:", err);
  });

export default app;

