import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function auth(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}
