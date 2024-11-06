import fetch from 'node-fetch';
import { CONFIG } from './config';

const BASE_URL = 'https://api.themoviedb.org/3';

export interface TMDbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

export async function getSimilarMovies(movieId: string, page: number = 1): Promise<TMDbMovie[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${CONFIG.TMDB_API_KEY}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return [];
  }
}