export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    backdrop_path: string;

    // Champs Movie
    adult?: boolean;
    genre_ids?: number[];
    original_language?: string;
    original_title?: string;
    popularity?: number;
    video?: boolean;

    // Champs MovieDetailsType
    genres?: { id: number; name: string }[];
    tagline?: string;
    status?: string;
    runtime?: number;
    production_companies?: { id: number; name: string; logo_path: string }[];
    credits?: {
        cast: { id: number; name: string; character: string; profile_path: string | null }[];
        crew: { id: number; name: string; job: string; profile_path: string | null }[];
    };
}
