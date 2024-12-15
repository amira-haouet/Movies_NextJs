'use client';

import Image from 'next/image';
import { useFetchTVShowDetails } from '../useCase/useFetchTvShowsDetails';

export default function ShowDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { TVShow, isLoading, isError } = useFetchTVShowDetails(id);

  if (isLoading) return <p className="text-center text-gray-700 dark:text-gray-300">Chargement...</p>;
  if (isError || !TVShow) return <p className="text-center text-red-500">Erreur lors du chargement des détails de l'émission.</p>;

  const generateStars = (rating: number) => {
    const stars = Math.round(rating / 2);
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span key={index} className={index < stars ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-600'}>
          ★
        </span>
      ));
  };

  return (
    <div className="px-4 py-6 min-h-screen text-gray-800 dark:text-gray-200">
      <div
        className="relative bg-cover bg-center h-[50vh] rounded-md shadow-lg overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${TVShow.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90 flex items-center px-6 text-white">
          <div>
            <h1 data-testid="show-title" className="text-4xl font-bold">{TVShow.name}</h1>
            {TVShow.tagline && <p className="mt-2 italic text-lg">{TVShow.tagline}</p>}
            <p className="mt-3 text-sm">
              <strong>Date de première diffusion :</strong> {TVShow.first_air_date}
            </p>
            <p className="text-sm">
              <strong>Statut :</strong> {TVShow.status}
            </p>
            <div className="flex items-center mt-3">
              <strong>Note moyenne :</strong>
              <div className="ml-2 flex items-center">
                {generateStars(TVShow.vote_average)}
              </div>
              <span  data-testid="show-rating" className="ml-2 text-yellow-400 font-semibold">
                {TVShow.vote_average.toFixed(1)} / 10
              </span>
              <span className="ml-2 text-gray-300 dark:text-gray-500">({TVShow.vote_count} votes)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row lg:space-x-8">
        <div className="flex-shrink-0 hidden lg:block lg:w-1/4">
          <Image
            data-testid="show-poster"
            src={`https://image.tmdb.org/t/p/w500${TVShow.poster_path}`}
            alt={TVShow.name || 'Affiche indisponible'}
            width={300}
            height={450}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="mt-4 lg:mt-0 flex-1">
          <h2 className="text-xl font-semibold">Synopsis</h2>
          <p className="mt-2 text-sm">{TVShow.overview}</p>
          <p className="mt-4 text-sm">
            <strong>Genres :</strong> {TVShow.genres?.map((genre) => genre.name).join(', ')}
          </p>

          {TVShow.production_companies && TVShow.production_companies?.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-semibold">Sociétés de production</h3>
              <div className="flex flex-wrap gap-4 mt-2">
                {TVShow.production_companies?.map((company) => (
                  <div key={company.id} className="flex items-center space-x-2">
                    {company.logo_path && (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        width={80}
                        height={80}
                        className="rounded-md bg-gray-200 dark:bg-gray-700 p-2"
                      />
                    )}
                    <p className="text-sm">{company.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {TVShow.seasons && TVShow.seasons?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Saisons</h3>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4">
              {TVShow.seasons?.map((season) => (
                <div
                  key={season.id}
                  className="flex-shrink-0 w-64 text-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-lg font-semibold">{season.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{season.episode_count} épisodes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {season.air_date || 'Date non disponible'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {TVShow.created_by &&TVShow.created_by?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Créateurs</h3>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {TVShow.created_by?.map((creator) => (
              <div
                key={creator.id}
                className="flex-shrink-0 w-36 text-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4"
              >
                <img
                  src={
                    creator.profile_path
                      ? `https://image.tmdb.org/t/p/w200${creator.profile_path}`
                      : '/images/profil.png'
                  }
                  alt={creator.name}
                  style={{ width: '120px', height: '180px' }}
                  className="rounded-lg mb-4 object-cover"
                />
                <p className="text-base font-semibold">{creator.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {( TVShow.images && (TVShow.images?.backdrops?.length > 0 || TVShow.images?.posters?.length > 0)) && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Quelques images</h3>

          {TVShow.images && TVShow.images?.backdrops?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Fonds d'écran</h3>
              <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
                {TVShow.images?.backdrops.map((image) => (
                  <div
                    key={image.file_path}
                    className="flex-shrink-0 w-80 h-48 text-center rounded-lg p-2"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                      style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                      className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {TVShow.images && TVShow.images?.posters?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Affiches</h3>
              <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
                {TVShow.images?.posters?.map((image) => (
                  <div
                    key={image.file_path}
                    className="flex-shrink-0 w-40 h-60 text-center rounded-lg p-2"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                      style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                      className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
