const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const fetch = require('node-fetch');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const manifest = {
    id: 'org.stremio.tmdbsimilar',
    version: '1.0.0',
    name: 'TMDb Similar Movies',
    description: 'Find similar movies powered by TMDb',
    resources: ['meta'],
    types: ['movie'],
    idPrefixes: ['tt']
};

const builder = new addonBuilder(manifest);

const cache = new Map();
const CACHE_TTL = 3600 * 1000; // 1 hour

async function getSimilarMovies(movieId) {
    const cacheKey = `movie-${movieId}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error(`TMDb API error: ${response.status}`);
        }

        const data = await response.json();
        const results = data.results.slice(0, 10).map(movie => ({
            id: `tt${movie.id}`,
            title: movie.title,
            released: movie.release_date,
            thumbnail: movie.poster_path ? 
                `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
        }));

        cache.set(cacheKey, { data: results, timestamp: Date.now() });
        return results;
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        return [];
    }
}

builder.defineMetaHandler(async ({ type, id }) => {
    if (type !== 'movie') {
        return { meta: null };
    }

    try {
        const movieId = id.replace('tt', '');
        const videos = await getSimilarMovies(movieId);

        return {
            meta: {
                id,
                type,
                name: 'Similar Movies',
                videos
            }
        };
    } catch (error) {
        console.error('Error in meta handler:', error);
        return { meta: null };
    }
});

serveHTTP(builder.getInterface(), { port: process.env.PORT || 7000 });