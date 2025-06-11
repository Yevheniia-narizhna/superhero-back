import { model, Schema } from 'mongoose';

const superheroSchema = new Schema({
  nickname: String,
  real_name: String,
  origin_description: String,
  superpowers: String,
  catch_phrase: String,
  images: [String],
});

export const Superhero = model('Superhero', superheroSchema, 'heroes');
