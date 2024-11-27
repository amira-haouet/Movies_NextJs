'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ShowDetailsType {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  poster_path: string;
}

export default function ShowDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [showDetails, setShowDetails] = useState<ShowDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/shows/${id}`);
        if (!res.ok) throw new Error('Erreur lors de la récupération des détails');
        const data = await res.json();
        setShowDetails(data);
      } catch (error) {
        console.error('Erreur :', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (isLoading) return <p>Chargement...</p>;
  if (!showDetails) return <p>Aucun détail trouvé.</p>;

  return (
    <div className="p-6">
      <div className="flex">
        <Image
          src={`https://image.tmdb.org/t/p/w500${showDetails.poster_path}`}
          alt={showDetails.name || 'Affiche indisponible'}
          width={300}
          height={450}
        />
        <div className="ml-6">
          <h1 className="text-3xl font-bold">{showDetails.name}</h1>
          <p>{showDetails.overview}</p>
          <p>
            <strong>Date de première diffusion :</strong> {showDetails.first_air_date}
          </p>
          <p>
            <strong>Note moyenne :</strong> {showDetails.vote_average.toFixed(1)}
          </p>
          <p>
            <strong>Genres :</strong> {showDetails.genres.map((genre) => genre.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}
