import { transformTVShowData } from '@/app/utils/transformData';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}`);
  const data = await res.json();

  const series = transformTVShowData(data.results);

  return NextResponse.json(series);
}
