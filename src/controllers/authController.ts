import { Request, Response } from 'express';
import User, { IUser } from '../models/UserModel';
import jwt from 'jsonwebtoken';

const generateToken = (user: IUser) => {
  return jwt.sign(
    { _id: user._id, nome: user.nome, tipo: user.tipo },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
};

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, password, tipo, endereco, telefone } = req.body;

    const user = await User.create({
      nome,
      email,
      senha_hash: password,
      tipo,
      endereco,
      telefone,
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: { user: { _id: user._id, nome: user.nome, tipo: user.tipo }, token },
    });
  } catch (error) {
    console.error('❌ Erro no registro:', error);
    res.status(500).json({ success: false, message: 'Erro ao registrar usuário' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+senha_hash');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      data: { user: { _id: user._id, nome: user.nome, tipo: user.tipo }, token },
    });
  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ success: false, message: 'Erro ao fazer login' });
  }
};
