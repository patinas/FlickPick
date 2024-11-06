import { addonBuilder, serveHTTP, Request, MetaResponse } from 'stremio-addon-sdk';
import { TMDbService } from './services/tmdb';
import { CONFIG } from './config';

const manifest = {
  id: 'org.stremio.tmdbsimilar',
  version: '1.0.0',
  name: 'TMDb Similar Movies',
  description: 'Find similar movies using TMDb API',
  resources: ['meta'],
  types: ['movie'],
  idPrefixes: ['tt']
};

const tmdb = new TMDbService(CONFIG.TMDB_API_KEY);
const builder = new addonBuilder(manifest);

builder.defineMetaHandler(async (request: Request): Promise<MetaResponse> => {
  const { type, id } = request;

  if (type !== 'movie') {
    return { meta: null };
  }

  try {
    const movieId = id.replace('tt', '');
    const { results } = await tmdb.getSimilarMovies(movieId);

    return {
      meta: {
        id,
        type,
        name: 'Similar Movies',
        videos: results.slice(0, 10).map(movie => ({
          id: `tt${movie.id}`,
          title: movie.title,
          released: new Date(movie.release_date).toISOString(),
          thumbnail: movie.poster_path ? 
            `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined
        }))
      }
    };
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return { meta: null };
  }
});

const port = Number(CONFIG.PORT);
serveHTTP(builder.getInterface(), { port });

console.log(`Addon running at http://localhost:${port}`);