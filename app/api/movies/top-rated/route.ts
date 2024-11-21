import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!res.ok) throw new Error("Erreur lors de la récupération des données.");
    const data = await res.json();

    return NextResponse.json(data.results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la récupération des films top rated." }, { status: 500 });
  }
}
