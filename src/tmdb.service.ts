import fetch from 'node-fetch';
import { CONFIG } from './config';
import { TMDbResponse, StremioMovie } from './types';

export class TMDbService {
  private static async fetchFromTMDb(endpoint: string): Promise<TMDbResponse> {
    const url = `${CONFIG.TMDB_BASE_URL}${endpoint}?api_key=${CONFIG.TMDB_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.status}`);
    }
    
    return response.json() as Promise<TMDbResponse>;
  }

  static async getSimilarMovies(movieId: string): Promise<StremioMovie[]> {
    const data = await this.fetchFromTMDb(`/movie/${movieId}/similar`);
    
    return data.results.map(movie => ({
      id: `tt${movie.id}`,
      type: 'movie' as const,
      name: movie.title,
      poster: movie.poster_path 
        ? `${CONFIG.TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : null
    }));
  }
}