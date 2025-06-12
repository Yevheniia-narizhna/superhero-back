import { Superhero } from '../models/hero.js';

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
  const images = req.files.map((file) => file.path);
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
  const updates = { ...req.body };

  if (req.files && req.files.length) {
    const hero = await Superhero.findById(req.params.id);
    updates.images = [
      ...(hero.images || []),
      ...req.files.map((file) => file.path),
    ];
  }

  const updatedHero = await Superhero.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true },
  );

  res.json(updatedHero);
};

export const deleteHero = async (req, res) => {
  await Superhero.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

// export const updateHero = async (req, res) => {
//   const updates = req.body;
//   if (req.files.length) {
//     updates.images = req.files.map((file) => file.path);
//   }
//   const updatedHero = await Superhero.findByIdAndUpdate(
//     req.params.id,
//     updates,
//     { new: true },
//   );
//   res.json(updatedHero);
// };
