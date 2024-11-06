require('dotenv').config();
const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const manifest = require('./config/manifest');
const { DEFAULT_PORT } = require('./config/constants');
const TMDbService = require('./services/tmdb');
const MetaHandler = require('./handlers/meta');

const tmdbService = new TMDbService(process.env.TMDB_API_KEY);
const metaHandler = new MetaHandler(tmdbService);
const builder = new addonBuilder(manifest);

builder.defineMetaHandler(async (args) => {
    return metaHandler.handle(args);
});

const port = process.env.PORT || DEFAULT_PORT;
serveHTTP(builder.getInterface(), { port });