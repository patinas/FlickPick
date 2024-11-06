import { TMDbMovie } from './index';

export interface Manifest {
  id: string;
  version: string;
  name: string;
  description: string;
  types: string[];
  catalogs: any[];
  resources: string[];
  idPrefixes: string[];
}

export interface MetaRequest {
  type: string;
  id: string;
}

export interface SimilarRequest {
  type: string;
  id: string;
}

export interface MetaResponse {
  meta: {
    id: string;
    type: string;
    name: string;
    poster?: string;
  }[];
}

export interface SimilarResponse {
  similar: {
    id: string;
    type: string;
    name: string;
    poster: string | null;
  }[];
}

declare module 'stremio-addon-sdk' {
  export class AddonBuilder {
    constructor(manifest: Manifest);
    defineSimilarHandler(handler: (request: SimilarRequest) => Promise<SimilarResponse>): void;
    getInterface(): any;
  }
  
  export function serveHTTP(addon: any, options: { port: number }): void;
}