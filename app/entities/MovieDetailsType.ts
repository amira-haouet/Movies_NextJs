interface MovieDetailsType {
  title: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  release_date: string;
  status: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  production_companies: { id: number; name: string; logo_path: string }[];
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; name: string; job: string; profile_path: string | null }[];
  };
}
