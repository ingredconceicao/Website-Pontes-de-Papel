import { Request, Response } from 'express';
import User, { IUser } from '../models/UserModel';
import jwt from 'jsonwebtoken';


const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      _id: user._id,
      nome: user.nome,
      tipo: user.tipo,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
};


export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, password, senha, senha_hash, tipo, endereco, telefone } = req.body;

   
    const senhaRecebida = password || senha || senha_hash;

    if (!senhaRecebida) {
      return res.status(400).json({
        success: false,
        message: "A senha é obrigatória."
      });
    }

   
    const user = await User.create({
      nome,
      email,
      senha_hash: senhaRecebida,
      tipo,
      endereco,
      telefone,
    });

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          nome: user.nome,
          email: user.email,
          tipo: user.tipo,
        },
        token
      }
    });

  } catch (error) {
    console.error('❌ Erro no registro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao registrar usuário'
    });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, senha, senha_hash } = req.body;

    
    const senhaRecebida = password || senha || senha_hash;

    if (!email || !senhaRecebida) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    const user = await User.findOne({ email }).select('+senha_hash');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    const isMatch = await user.comparePassword(senhaRecebida);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          nome: user.nome,
          email: user.email,
          tipo: user.tipo
        },
        token
      }
    });

  } catch (error) {
    console.error('❌ Erro no login:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao fazer login'
    });
  }
};
