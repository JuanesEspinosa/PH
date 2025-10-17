import jwt, { SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  id: number;
  email: string;
  rol: 'admin' | 'usuario';
}

export const generateToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'default_secret',
    options
  );
};

export const generateResetToken = (userId: number): string => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_RESET_EXPIRES_IN || '1h'
  };
  
  return jwt.sign(
    { id: userId, type: 'reset' },
    process.env.JWT_SECRET || 'default_secret',
    options
  );
};

export const verifyResetToken = (token: string): { id: number } | null => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret'
    ) as { id: number; type: string };
    
    if (decoded.type === 'reset') {
      return { id: decoded.id };
    }
    return null;
  } catch (error) {
    return null;
  }
};

