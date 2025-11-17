import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  _id: string;
  nome: string;
  tipo: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Não autorizado: token ausente' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.tipo)) {
      return res.status(403).json({ success: false, message: 'Acesso negado' });
    }
    next();
  };
};

