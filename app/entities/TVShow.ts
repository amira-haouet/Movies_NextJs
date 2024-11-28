export interface TVShow {
    id: number;
    name: string;
    overview: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    backdrop_path: string;
  
    // Champs TVShow
    adult?: boolean;
    genre_ids?: number[];
    origin_country?: string[];
    original_language?: string;
    original_name?: string;
    popularity?: number;
  
    // Champs ShowDetailsType
    genres?: { id: number; name: string }[];
    created_by?: { id: number; name: string; profile_path: string | null }[];
    status?: string;
    number_of_seasons?: number;
    number_of_episodes?: number;
    networks?: { id: number; name: string; logo_path: string | null }[];
    tagline?: string;
    last_air_date?: string;
    production_companies?: { id: number; name: string; logo_path: string | null }[];
    homepage?: string;
    seasons?: {
      id: number;
      name: string;
      overview: string;
      poster_path: string | null;
      air_date: string | null;
      season_number: number;
      episode_count: number;
      vote_average: number;
    }[];
  }
  