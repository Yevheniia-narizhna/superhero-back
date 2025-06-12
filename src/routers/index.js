import { Router } from 'express';
import heroRouter from './hero.js';

const router = Router();

router.use('/hero', heroRouter);

export default router;
