const fetch = require('node-fetch');
const { TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } = require('../config/constants');

class TMDbService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.cache = new Map();
    }

    async fetchFromTMDb(endpoint) {
        const cacheKey = endpoint;
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            return cached.data;
        }

        try {
            const response = await fetch(
                `${TMDB_BASE_URL}${endpoint}?api_key=${this.apiKey}`
            );
            
            if (!response.ok) {
                throw new Error(`TMDb API error: ${response.status}`);
            }

            const data = await response.json();
            this.cache.set(cacheKey, { data, timestamp: Date.now() });
            return data;
        } catch (error) {
            console.error('TMDb API error:', error);
            return null;
        }
    }

    async getSimilarMovies(movieId) {
        const data = await this.fetchFromTMDb(`/movie/${movieId}/similar`);
        if (!data || !data.results) return [];

        return data.results.slice(0, 10).map(movie => ({
            id: `tt${movie.id}`,
            title: movie.title,
            released: movie.release_date,
            thumbnail: movie.poster_path ? 
                `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null
        }));
    }
}

module.exports = TMDbService;