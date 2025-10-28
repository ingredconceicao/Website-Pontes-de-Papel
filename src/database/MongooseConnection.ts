import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('ERRO: A variável de ambiente MONGO_URI não está definida.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB conectado com sucesso');

    
    mongoose.connection.on('error', (err) => {
      console.error('❌ Erro de conexão com o MongoDB:', err);
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error(`❌ Falha ao conectar com o MongoDB: ${message}`);
    process.exit(1);
  }
};

export default connectDB;