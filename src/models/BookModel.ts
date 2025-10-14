import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
    titulo: string;
    autor: string;
    genero: string;
    condicao: 'Novo' | 'Usado - Excelente' | 'Usado - Bom' | 'Usado - Regular';
    doador: mongoose.Types.ObjectId;
    status: 'Disponível' | 'Reservado' | 'Entregue';
    data_cadastro: Date;
}

const BookSchema: Schema = new Schema({
    titulo: { type: String, required: true, trim: true },
    autor: { type: String, required: true, trim: true },
    isbn: { type: String, trim: true, sparse: true },
    genero: { type: String, required: true, trim: true },
    condicao: { 
        type: String, 
        enum: ['Novo', 'Usado - Excelente', 'Usado - Bom', 'Usado - Regular'], 
        required: true 
    },
    doador: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Disponível', 'Reservado', 'Entregue'], 
        default: 'Disponível' 
    },
    data_cadastro: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<IBook>('Book', BookSchema);