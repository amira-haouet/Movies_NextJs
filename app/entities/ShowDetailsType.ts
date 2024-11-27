interface ShowDetailsType {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  poster_path: string;
  backdrop_path: string;
  created_by: { id: number; name: string; profile_path: string | null }[];
  status: string;
  number_of_seasons: number;
  number_of_episodes: number;
  networks: { id: number; name: string; logo_path: string }[];
  tagline: string; // Exemple : "Souviens-toi de mon nom."
  last_air_date: string;
  production_companies: { id: number; name: string; logo_path: string | null }[];
  homepage: string; // Lien vers la page officielle
  popularity: number; // Mesure de popularité
  seasons: {
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
