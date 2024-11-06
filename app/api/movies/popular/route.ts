import { transformMoviesData } from '@/app/utils/transformData';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`);
  const data = await res.json();
  const movies = transformMoviesData(data.results);

  return NextResponse.json(movies);
}