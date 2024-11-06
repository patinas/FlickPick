import { Manifest } from './types/stremio';

export const manifest: Manifest = {
  id: 'org.stremio.tmdbsimilar',
  version: '1.0.0',
  name: 'TMDb Similar Movies',
  description: 'Find similar movies powered by TMDb',
  types: ['movie'],
  catalogs: [],
  resources: ['similar'],
  idPrefixes: ['tt']
};