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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Backdrop */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-5xl font-bold">{movieDetails.title}</h1>
          <p className="text-lg italic">{movieDetails.tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col lg:flex-row lg:space-x-8">
        {/* Poster */}
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title || 'Affiche indisponible'}
            width={300}
            height={450}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="flex-1 mt-4 lg:mt-0">
          <h2 className="text-3xl font-semibold">Synopsis</h2>
          <p className="mt-2">{movieDetails.overview}</p>
          <p className="mt-4">
            <strong>Date de sortie :</strong> {movieDetails.release_date}
          </p>
          <p>
            <strong>Durée :</strong> {movieDetails.runtime} minutes
          </p>
          <p>
            <strong>Statut :</strong> {movieDetails.status}
          </p>
          <p>
            <strong>Note moyenne :</strong> {movieDetails.vote_average.toFixed(1)} / 10
          </p>
          <p className="mt-4">
            <strong>Genres :</strong> {movieDetails.genres.map((genre) => genre.name).join(', ')}
          </p>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Sociétés de Production</h3>
            <div className="flex flex-wrap mt-2">
              {movieDetails.production_companies.map((company) => (
                <div key={company.id} className="mr-4 mb-4">
                  {company.logo_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  )}
                  <p className="text-sm">{company.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
