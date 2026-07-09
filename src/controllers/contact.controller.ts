import { Request, Response } from 'express';
import { prisma } from '../db';
import asyncHandler from 'express-async-handler';

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
export const submitContactForm = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error('Please provide a valid email address');
  }

  if (message.trim().length < 10) {
    res.status(400);
    throw new Error('Message must be at least 10 characters long');
  }

  const contactMessage = await prisma.contactMessage.create({
    data: {
      name,
      email,
      message,
    },
  });

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: contactMessage,
  });
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getContactMessages = asyncHandler(async (req: Request, res: Response) => {
  const messages = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.status(200).json(messages);
});

// @desc    Mark a contact message as read
// @route   PATCH /api/contact/:id
// @access  Private/Admin
export const markMessageAsRead = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const message = await prisma.contactMessage.findUnique({
    where: { id },
  });

  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }

  const updatedMessage = await prisma.contactMessage.update({
    where: { id },
    data: {
      isRead: true,
    },
  });

  res.status(200).json(updatedMessage);
});
