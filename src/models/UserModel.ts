
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs'; 


export interface IUser extends Document {
    nome: string;
    email: string;
    senha_hash: string;
    tipo: 'aluno' | 'doador';
    endereco: string;
    telefone: string;
    data_cadastro: Date;
    
    comparePassword(candidatePassword: string): Promise<boolean>;
}


const UserSchema: Schema = new Schema({
    nome: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    senha_hash: { type: String, required: true, select: false },
    tipo: { 
        type: String, 
        enum: ['aluno', 'doador'], 
        required: true 
    },
    endereco: { type: String, required: true },
    telefone: { type: String, required: true },
    data_cadastro: { type: Date, default: Date.now },
}, { timestamps: true }); 

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('senha_hash')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.senha_hash = await bcrypt.hash(this.senha_hash, salt);
    next();
});


UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.senha_hash);
};

export default mongoose.model<IUser>('User', UserSchema);