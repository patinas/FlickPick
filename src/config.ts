import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 3000,
  TMDB_API_KEY: process.env.TMDB_API_KEY || '',
};