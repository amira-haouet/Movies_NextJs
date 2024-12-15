'use client';

import Image from 'next/image';
import { useFetchMovieDetails } from '../useCase/useFetchMoviesDetails';

export default function MovieDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { movie, isLoading, isError } = useFetchMovieDetails(id);

  if (isLoading) return <p className="text-center text-gray-700 dark:text-gray-300">Chargement...</p>;
  if (isError || !movie) return <p className="text-center text-red-500">Erreur lors du chargement des détails du film.</p>;

  // Génération des étoiles
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
      {/* Background Section */}
      <div
        className="relative bg-cover bg-center h-[50vh] rounded-md shadow-lg overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90 flex items-center px-6 text-white">
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            {movie.tagline && <p className="mt-2 italic text-lg">{movie.tagline}</p>}
            <p className="mt-3 text-sm">
              <strong>Date de sortie :</strong> {movie.release_date}
            </p>
            <p className="text-sm">
              <strong>Statut :</strong> {movie.status}
            </p>
            <div className="flex items-center mt-3">
              <strong>Note moyenne :</strong>
              <div className="ml-2 flex items-center">
                {generateStars(movie.vote_average)}
              </div>
              <span className="ml-2 text-yellow-400 font-semibold">
                {movie.vote_average.toFixed(1)} / 10
              </span>
              <span className="ml-2 text-gray-300 dark:text-gray-500">({movie.vote_count} votes)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-6 flex flex-col lg:flex-row lg:space-x-8">
        {/* Poster */}
        <div className="flex-shrink-0 hidden lg:block lg:w-1/4">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || 'Affiche indisponible'}
            width={300}
            height={450}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="mt-4 lg:mt-0 flex-1">
          <h2 className="text-xl font-semibold">Synopsis</h2>
          <p className="mt-2 text-sm">{movie.overview}</p>

          <p className="mt-4 text-sm">
            <strong>Genres :</strong> {movie.genres?.map((genre) => genre.name).join(', ')}
          </p>

          {/* Production Companies */}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-semibold">Sociétés de production</h3>
              <div className="flex flex-wrap gap-4 mt-2">
                {movie.production_companies?.map((company) => (
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

      {/* Équipe de production */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Équipe de production</h3>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {movie.credits?.crew
            ?.filter((crew) => crew.job === 'Director' || crew.job === 'Producer')
            .map((crew) => (
              <div
                key={crew.id}
                className="flex-shrink-0 w-36 text-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4"
              >
                <img
                  src={
                    crew.profile_path
                      ? `https://image.tmdb.org/t/p/w200${crew.profile_path}`
                      : "/images/profil.png"
                  }
                  alt={crew.name}
                  style={{ width: "120px", height: "180px" }}
                  className="rounded-lg mb-4 object-cover"
                />
                <p className="text-base font-semibold">{crew.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{crew.job}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Acteurs */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Acteurs</h3>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {movie.credits?.cast?.map((actor) => (
            <div
              key={actor.id}
              className="flex-shrink-0 w-36 text-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "/images/profil.png"
                }
                alt={actor.name}
                style={{ width: "120px", height: "180px" }}
                className="rounded-lg mb-4 object-cover"
              />
              <p className="text-base font-semibold">{actor.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Quelques images</h3>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Fonds d'écran</h3>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {movie.images?.backdrops?.map((image) => (
              <div
                key={image.file_path}
                className="flex-shrink-0 w-80 h-48 text-center rounded-lg p-2"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Affiches</h3>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {movie.images?.posters?.map((image) => (
              <div
                key={image.file_path}
                className="flex-shrink-0 w-40 h-60 text-center rounded-lg p-2"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
