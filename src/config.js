const config = {
  tmdb: {
    apiKey: '5c8f27038de81faa96a2b90bafe5c536',
    baseUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p/w500'
  },
  cache: {
    ttl: 3600 * 1000 // 1 hour in milliseconds
  },
  server: {
    port: 3000
  }
};

module.exports = config;