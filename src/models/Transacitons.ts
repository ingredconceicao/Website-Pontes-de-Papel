import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
    livro: mongoose.Types.ObjectId; 
    doador: mongoose.Types.ObjectId; 
    aluno: mongoose.Types.ObjectId;
    data_solicitacao: Date;
    data_finalizacao?: Date;
}

const TransactionSchema: Schema = new Schema({
    livro: { 
        type: Schema.Types.ObjectId, 
        ref: 'Book', 
        required: true, 
        unique: true
    },
    doador: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    aluno: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    data_solicitacao: { type: Date, default: Date.now },
    data_finalizacao: { type: Date, required: false },
}, { timestamps: true });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);