import { TVShow } from "@/app/entities/TVShow";
import { TVShowRepository } from "./interfaces/TVShowRepository";

export class TVShowRepositoryInternal implements TVShowRepository {
  private async fetchFromApi(endpoint: string): Promise<TVShow[]> {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch TVShow: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching TVShow:", error);
      throw error;
    }
  }

  async getPopularTVShow(): Promise<TVShow[]> {
    return this.fetchFromApi(`/api/shows/popular`);
  }

  async getOnTheAirTVShow(): Promise<TVShow[]> {
    return this.fetchFromApi(`/api/shows/on-the-air`);
  }

  async getTopRatedTVShow(): Promise<TVShow[]> {
    return this.fetchFromApi(`/api/shows/top-rated`);
  }
  async getTVShowDetails(id: string): Promise<TVShow> {
    const response = await fetch(`/api/shows/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération du serie avec l'ID ${id}`);
    }
    return await response.json();
  }
}
