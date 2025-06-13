import { Superhero } from '../models/hero.js';
import fs from 'fs';
import path from 'path';

export const getAllHeroes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const total = await Superhero.countDocuments();
  const heroes = await Superhero.find({}, 'nickname images')
    .skip(skip)
    .limit(limit);

  res.json({
    page,
    totalPages: Math.ceil(total / limit),
    totalHeroes: total,
    heroes,
  });
};

export const getHeroById = async (req, res) => {
  const hero = await Superhero.findById(req.params.id);
  res.json(hero);
};

export const createHero = async (req, res) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body;
  const images = req.files.map(
    (file) =>
      `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, '/')}`,
  );
  const newHero = await Superhero.create({
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  });
  res.status(201).json(newHero);
};

export const updateHero = async (req, res) => {
  try {
    const heroId = req.params.id;
    const hero = await Superhero.findById(heroId);

    if (!hero) {
      return res.status(404).json({ message: 'Hero not found' });
    }

    const remainingImages = req.body.images ? JSON.parse(req.body.images) : [];

    const removedImages = (hero.images || []).filter(
      (img) => !remainingImages.includes(img),
    );

    removedImages.forEach((imgUrl) => {
      const imgPath = path.join(
        process.cwd(),
        'uploads',
        imgUrl.split('/uploads/')[1],
      );
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    });

    const newImageUrls = (req.files || []).map((file) => {
      return `${req.protocol}://${req.get('host')}/${file.path.replace(
        /\\/g,
        '/',
      )}`;
    });

    const updatedHero = await Superhero.findByIdAndUpdate(
      heroId,
      {
        ...req.body,
        images: [...remainingImages, ...newImageUrls],
      },
      { new: true },
    );

    res.json(updatedHero);
  } catch (error) {
    console.error('Error updating hero:', error);
    res.status(500).json({ message: 'Failed to update hero' });
  }
};

export const deleteHero = async (req, res) => {
  await Superhero.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
