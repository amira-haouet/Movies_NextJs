import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "L'ID du film est requis." }, { status: 400 });
  }

  try {
    const detailsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
    );

    const creditsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
    );

    if (!detailsRes.ok || !creditsRes.ok) {
      throw new Error('Erreur lors de la récupération des données de l\'API');
    }

    const details = await detailsRes.json();
    const credits = await creditsRes.json();

    const responseData = {
      ...details,
      credits,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Erreur API :', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
