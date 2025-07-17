import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import User from '../Model/UserSchema';

export const VerifyAuth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.clearCookie('jwt', { httpOnly: true, path: '/' });
      return res.status(401).json({ isLoggedIn: false });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      res.clearCookie('jwt', { httpOnly: true, path: '/' });
      return res.status(401).json({ isLoggedIn: false });
    }

    const user = await User.findOne({_id:decoded.id,role:"user"});
    if (!user) {
      res.clearCookie('jwt', { httpOnly: true, path: '/' });
      return res.status(401).json({ isLoggedIn: false, message: 'User not found' });
    }

    req.user = decoded;
    next();

  } catch (error) {
    console.error('Auth failed', error);
    res.clearCookie('jwt', { httpOnly: true, path: '/' });
    return res.status(500).json({ isLoggedIn: false });
  }
};
