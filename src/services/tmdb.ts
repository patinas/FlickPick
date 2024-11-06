import fetch from 'node-fetch';
import NodeCache from 'node-cache';
import { TMDbMovie, TMDbResponse } from '../types/tmdb';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

export class TMDbService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  constructor(private readonly apiKey: string) {}

  async getSimilarMovies(movieId: string, page: number = 1): Promise<TMDbResponse> {
    const cacheKey = `similar-${movieId}-${page}`;
    const cached = cache.get<TMDbResponse>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const response = await fetch(
      `${this.baseUrl}/movie/${movieId}/similar?api_key=${this.apiKey}&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.status}`);
    }

    const data = await response.json() as TMDbResponse;
    cache.set(cacheKey, data);
    return data;
  }
}