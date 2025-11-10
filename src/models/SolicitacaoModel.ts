import mongoose, { Document, Schema } from 'mongoose';

export interface ISolicitacao extends Document {
  livro: mongoose.Types.ObjectId;
  aluno: mongoose.Types.ObjectId;
  status: 'Pendente' | 'Aceita' | 'Recusada';
  data_solicitacao: Date;
}

const SolicitacaoSchema = new Schema({
  livro: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  aluno: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['Pendente', 'Aceita', 'Recusada'],
    default: 'Pendente',
  },
  data_solicitacao: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<ISolicitacao>('Solicitacao', SolicitacaoSchema);
