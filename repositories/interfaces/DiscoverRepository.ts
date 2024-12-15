import { Movie } from "../../app/entities/Movie";

export interface MoviesRepository {
    getMovies(): Promise<Movie[]>;
    getTVShows(): Promise<Movie[]>;

  }