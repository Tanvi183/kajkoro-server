import { Request, Response, NextFunction } from 'express';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace with actual user type later
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement JWT authentication logic
  next();
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // TODO: Implement role-based authorization logic
    next();
  };
};
