import mongoose, { Document, Schema } from 'mongoose';

export interface ICampanha extends Document {
  nome: string;
  descricao: string;
  meta: number;
  status: 'Ativa' | 'Encerrada';
  livros: mongoose.Types.ObjectId[];
  criadaPor: mongoose.Types.ObjectId;
  dataInicio: Date;
  dataFim?: Date;
}

const CampanhaSchema = new Schema(
  {
    nome: { type: String, required: true, trim: true },
    descricao: { type: String, required: true },
    meta: { type: Number, required: true },
    status: { type: String, enum: ['Ativa', 'Encerrada'], default: 'Ativa' },
    livros: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    criadaPor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dataInicio: { type: Date, default: Date.now },
    dataFim: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<ICampanha>('Campaign', CampanhaSchema);
