const fetch = require('node-fetch');
const config = require('./config');

const cache = new Map();

async function fetchTMDbData(endpoint) {
  const url = `${config.tmdb.baseUrl}${endpoint}?api_key=${config.tmdb.apiKey}`;
  const cacheKey = url;
  
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < config.cache.ttl) {
    return cached.data;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.status}`);
    }

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('TMDb API error:', error);
    return null;
  }
}

async function getSimilarMovies(movieId) {
  const data = await fetchTMDbData(`/movie/${movieId}/similar`);
  if (!data || !data.results) return [];

  return data.results.slice(0, 10).map(movie => ({
    id: `tt${movie.id}`,
    type: 'movie',
    name: movie.title,
    poster: movie.poster_path ? `${config.tmdb.imageBaseUrl}${movie.poster_path}` : null,
    description: movie.overview,
    releaseInfo: movie.release_date ? movie.release_date.split('-')[0] : '',
    imdbRating: movie.vote_average ? movie.vote_average : null
  }));
}

module.exports = {
  getSimilarMovies
};