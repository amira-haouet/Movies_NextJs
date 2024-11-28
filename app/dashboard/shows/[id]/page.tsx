'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ShowDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const [showDetails, setShowDetails] = useState<ShowDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
      <div
        className="relative bg-cover bg-center h-[60vh] rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${showDetails.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-6 text-white">
          <div>
            <h1 className="text-5xl font-bold">{showDetails.name}</h1>
            {showDetails.tagline && (
              <p className="mt-2 italic text-xl text-gray-300">{showDetails.tagline}</p>
            )}
            <p className="mt-4">
              <strong>Date de première diffusion :</strong> {showDetails.first_air_date}
            </p>
            <p>
              <strong>Statut :</strong> {showDetails.status}
            </p>
            <p>
              <strong>Note moyenne :</strong>{' '}
              <span className="text-yellow-400 text-2xl font-bold">
                {showDetails.vote_average.toFixed(1)} / 10
              </span>{' '}
              ({showDetails.vote_count} votes)
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 lg:px-16 lg:flex lg:space-x-12">
        {/* Poster */}
        <div className="flex-shrink-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${showDetails.poster_path}`}
            alt={showDetails.name || 'Affiche indisponible'}
            width={300}
            height={450}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="mt-6 lg:mt-0 flex-1 text-gray-800">
          <h2 className="text-2xl font-semibold">Synopsis</h2>
          <p className="mt-2">{showDetails.overview}</p>

          <p className="mt-4">
            <strong>Genres :</strong> {showDetails.genres.map((genre) => genre.name).join(', ')}
          </p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Créateurs</h3>
            <ul>
              {showDetails.created_by.map((creator) => (
                <li key={creator.id} className="mt-2">
                  {creator.name}
                  {creator.profile_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${creator.profile_path}`}
                      alt={creator.name}
                      width={50}
                      height={50}
                      className="ml-2 inline-block rounded"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Saisons</h3>
            <ul>
              {showDetails.seasons.map((season) => (
                <li key={season.id} className="mt-2">
                  <strong>{season.name}</strong> ({season.episode_count} épisodes) -{' '}
                  {season.air_date || 'Date non disponible'}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Sociétés de production</h3>
            <div className="flex flex-wrap">
              {showDetails.production_companies.map((company) => (
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
