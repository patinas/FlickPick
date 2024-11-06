declare module 'stremio-addon-sdk' {
  export interface Manifest {
    id: string;
    name: string;
    version: string;
    description: string;
    resources: string[];
    types: string[];
    catalogs: any[];
    idPrefixes?: string[];
  }

  export interface Request {
    type: string;
    id: string;
  }

  export interface MetaPreview {
    id: string;
    type: string;
    name: string;
    poster?: string;
  }

  export interface Meta extends MetaPreview {
    videos?: {
      id: string;
      title: string;
      released: string;
      thumbnail?: string;
    }[];
  }

  export interface MetaResponse {
    meta: Meta | null;
  }

  export class addonBuilder {
    constructor(manifest: Manifest);
    defineMetaHandler(handler: (request: Request) => Promise<MetaResponse>): void;
    getInterface(): any;
  }

  export function serveHTTP(addon: any, options: { port: number }): void;
}