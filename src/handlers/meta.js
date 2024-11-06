class MetaHandler {
    constructor(tmdbService) {
        this.tmdbService = tmdbService;
    }

    async handle({ type, id }) {
        if (type !== 'movie') {
            return { meta: null };
        }

        try {
            const movieId = id.replace('tt', '');
            const videos = await this.tmdbService.getSimilarMovies(movieId);

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
    }
}

module.exports = MetaHandler;