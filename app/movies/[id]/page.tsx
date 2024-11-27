'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MovieDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`);
        if (!res.ok) throw new Error('Erreur lors de la récupération des détails');
        const data = await res.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Erreur :', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (isLoading) return <p>Chargement...</p>;
  if (!movieDetails) return <p>Aucun détail trouvé.</p>;

  // Génération des étoiles
  const generateStars = (rating: number) => {
    const stars = Math.round(rating / 2); // Convertir sur une échelle de 5
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span key={index} className={index < stars ? 'text-yellow-500' : 'text-gray-400'}>
          ★
        </span>
      ));
  };

  return (
    <div
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay avec flou et transparence */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      {/* Contenu principal */}
      <div className="relative p-6 flex flex-col lg:flex-row lg:space-x-8">
        {/* Poster */}
        <div className="z-10">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title || 'Affiche indisponible'}
            width={300}
            height={450}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="flex-1 mt-4 lg:mt-0 z-10">
          <h1 className="text-5xl font-bold">{movieDetails.title}</h1>
          <p className="text-lg italic">{movieDetails.tagline}</p>
          <div className="flex items-center mt-4">
            <strong>Note moyenne :</strong>
            <span className="ml-2">{generateStars(movieDetails.vote_average)}</span>
          </div>
          <p className="mt-4">
            <strong>Synopsis :</strong> {movieDetails.overview}
          </p>
          <p className="mt-4">
            <strong>Date de sortie :</strong> {movieDetails.release_date}
          </p>
          <p>
            <strong>Durée :</strong> {movieDetails.runtime} minutes
          </p>
          <p>
            <strong>Statut :</strong> {movieDetails.status}
          </p>
          <p className="mt-4">
            <strong>Genres :</strong> {movieDetails.genres.map((genre) => genre.name).join(', ')}
          </p>

          {/* Sociétés de production */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Sociétés de Production</h3>
            <div className="flex flex-wrap mt-2">
              {movieDetails.production_companies.map((company) => (
                <div key={company.id} className="mr-4 mb-4 text-center">
                  {company.logo_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      width={80}
                      height={80}
                      className="rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-700 flex items-center justify-center rounded">
                      <span className="text-sm text-gray-400">{company.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
