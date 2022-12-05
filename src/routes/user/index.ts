import { Router } from 'express';
import { router as v1 } from './routes/tickets';

export const router = Router();

router.use('/user', v1);
