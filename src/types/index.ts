export interface TMDbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface TMDbResponse {
  page: number;
  results: TMDbMovie[];
  total_pages: number;
}

export interface TMDbError {
  status_message: string;
  status_code: number;
}