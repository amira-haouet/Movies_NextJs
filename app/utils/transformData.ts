// utils/transformData.ts
import { TVShow } from '@/app/entities/TVShow';
import { Movie } from '../entities/Movie';

export function transformTVShowData(data: TVShow[]): TVShow[] {
  return data.map((show: TVShow) => ({
    adult: show.adult,
    backdrop_path: show.backdrop_path,
    genre_ids: show.genre_ids,
    id: show.id,
    origin_country: show.origin_country,
    original_language: show.original_language,
    original_name: show.original_name,
    overview: show.overview,
    popularity: show.popularity,
    poster_path: show.poster_path,
    first_air_date: show.first_air_date,
    name: show.name,
    vote_average: show.vote_average,
    vote_count: show.vote_count,
  }));
}


export function transformMovieData(data: Movie[]): Movie[] {
  return data.map((movie: Movie) => ({
    adult: movie.adult,
    backdrop_path: movie.backdrop_path,
    genre_ids: movie.genre_ids,
    id: movie.id,
    original_language: movie.original_language,
    original_title: movie.original_title,
    overview: movie.overview,
    popularity: movie.popularity,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    title: movie.title,
    video: movie.video,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
  }));
}
