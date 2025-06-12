import { Router } from 'express';
import {
  createHero,
  deleteHero,
  getAllHeroes,
  getHeroById,
  updateHero,
} from '../controllers/heroController.js';
import upload from '../middlewares/upload.js';
// import express from 'express';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js';

// const jsonParser = express.json();

const router = Router();

router.get('/', getAllHeroes);

router.get('/:id', getHeroById);

router.post('/', upload.array('images', 4), createHero);

router.put('/:id', upload.array('images', 4), updateHero);

router.delete('/:id', deleteHero);

export default router;
