// utils/transformData.ts
import { TVShow } from '@/app/entities/TVShow';

export function transformTVShowData(data: any[]): TVShow[] {
  return data.map((show: any) => ({
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


export function transformMoviesData(data: any[]): TVShow[] {
    return data.map((show: any) => ({
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