"use client";

import { Movie } from "@/app/entities/Movie";
import { useEffect, useState } from "react";

export default function TopRatedTVShows() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/movies/top-rated");
        const data = await res.json();
        setMovies(data); // Remplir l'état avec les données de l'API
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title || movie.original_title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">
                {movie.title || movie.original_title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">
                {movie.overview}
              </p>
              <p className="mt-2 font-bold text-yellow-500">
                Rating: {movie.vote_average}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Aucun film trouvé.</p>
      )}
    </div>
  );
}
