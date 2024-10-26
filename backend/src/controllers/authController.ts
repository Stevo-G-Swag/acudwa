import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { Session } from '../models/Session';
import { MFA } from '../models/MFA';

const oauth2Client = new OAuth2Client(process.env.OAUTH2_CLIENT_ID);

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Access token is invalid' });
    }

    req.user = user;
    next();
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.validatePassword(password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.json({ token });
};

export const oauth2Login = async (req: Request, res: Response) => {
  const { token } = req.body;

  const ticket = await oauth2Client.verifyIdToken({
    idToken: token,
    audience: process.env.OAUTH2_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    return res.status(401).json({ message: 'Invalid OAuth2 token' });
  }

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    user = new User({ email: payload.email, role: Role.USER });
    await user.save();
  }

  const jwtToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.json({ token: jwtToken });
};

export const roleBasedAccessControl = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};

export const sessionManagement = async (req: Request, res: Response, next: NextFunction) => {
  const session = await Session.findOne({ userId: req.user.id });

  if (!session) {
    return res.status(401).json({ message: 'Session not found' });
  }

  req.session = session;
  next();
};

export const multiFactorAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const mfa = await MFA.findOne({ userId: req.user.id });

  if (!mfa || !mfa.isVerified) {
    return res.status(401).json({ message: 'Multi-factor authentication required' });
  }

  next();
};
