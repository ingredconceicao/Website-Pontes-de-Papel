import express from "express";
import connectDB from "./database/MongooseConnection";
import bookRoutes from "./routes/BookRoutes";
import authRoutes from './routes/authRoutes'; 
import solicitacaoRoutes from './routes/solicitacaoRoutes';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import{config} from './config/environment';
import cors from 'cors';
import aiRoutes from "./routes/aiRoutes";






const URI = config.mongo_uri;
const PORT =config.port

const app = express();

app.use(express.json());
dotenv.config();

app.use(cors({

  origin: [
    'http://localhost:3000', 
    'https://pontes-de-papel.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());

app.use("/api/ai", aiRoutes);

app.use("/api/books", bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/solicitacoes', solicitacaoRoutes);


connectDB()
  .then(() => {
    console.log("✅ MongoDB conectado");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no MongoDB:", err);
  });

export default app;

