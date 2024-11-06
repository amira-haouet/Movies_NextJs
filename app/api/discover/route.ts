import { transformMoviesData, transformTVShowData } from '@/app/utils/transformData';
import { NextResponse } from 'next/server';

export async function GET() {
  const resMovie = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`);
  const dataMovie = await resMovie.json();

  const resTv = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}`);
  const dataTv = await resTv.json();

  const series = transformTVShowData(dataTv.results);
  const movies = transformMoviesData(dataMovie.results);

  return NextResponse.json({ "series": series, "movies": movies });
}
