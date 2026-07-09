import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';
import asyncHandler from 'express-async-handler';

// Helper to generate JWT token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists by email
  const userExistsEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userExistsEmail) {
    res.status(400);
    throw new Error('User already exists with this email');
  }

  // Check if user exists by phone
  if (phone) {
    const userExistsPhone = await prisma.user.findUnique({
      where: { phone },
    });

    if (userExistsPhone) {
      res.status(400);
      throw new Error('User already exists with this phone number');
    }
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone: phone || null,
      password: hashedPassword,
      role: role.toUpperCase(),
    },
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});
