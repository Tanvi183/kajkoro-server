import { Router } from 'express';
import { submitContactForm, getContactMessages, markMessageAsRead } from '../controllers/contact.controller';

const router = Router();

// Public route to submit a form
router.post('/', submitContactForm);

// Protected routes for admin
// TODO: Add protect and admin middleware here later when fully secured
router.get('/', getContactMessages);
router.patch('/:id', markMessageAsRead);

export default router;
