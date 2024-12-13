import { Movie } from "@/app/entities/Movie";
import { MoviesRepository } from "./interfaces/MoviesRepository";

export class MoviesRepositoryInternal implements MoviesRepository {
  private async fetchFromApi(endpoint: string): Promise<Movie[]> {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }

  async getPopularMovies(): Promise<Movie[]> {
    return this.fetchFromApi(`/api/movies/popular`);
  }

  async getNowPlayingMovies(): Promise<Movie[]> {
    return this.fetchFromApi(`/api/movies/now-playing`);
  }

  async getTopRatedMovies(): Promise<Movie[]> {
    return this.fetchFromApi(`/api/movies/top-rated`);
  }
}
