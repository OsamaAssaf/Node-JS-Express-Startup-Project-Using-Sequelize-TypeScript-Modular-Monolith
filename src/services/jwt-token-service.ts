import jwt from 'jsonwebtoken';
import User from '../models/user';

export function generateToken(user: User) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' },
  );

  return token;
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
