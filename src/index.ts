import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import jobsRoutes from './routes/jobs.routes';
import submissionsRoutes from './routes/submissions.routes';
import walletRoutes from './routes/wallet.routes';
import usersRoutes from './routes/users.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/users', usersRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
