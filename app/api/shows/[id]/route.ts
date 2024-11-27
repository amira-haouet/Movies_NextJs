<<<<<<< HEAD
import { NextApiRequest, NextApiResponse } from 'next';
=======
>>>>>>> f538e0e6ff15c1aa2e4fe2dcbe04507f845ca95d
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "L'ID de l'émission est requis." }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
    );

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des détails de l\'émission');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Erreur API :', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
