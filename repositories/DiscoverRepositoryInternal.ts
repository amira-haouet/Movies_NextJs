import { Movie } from "@/app/entities/Movie";
import { TVShow } from "@/app/entities/TVShow";

export class DiscoverRepositoryInternal {
  async getMovies(): Promise<Movie[]> {
    const res = await fetch(`/api/discover`);
    if (!res.ok) throw new Error("Erreur lors de la récupération des films");
    const data = await res.json();
    return data.movies;
  }

  async getTVShows(): Promise<TVShow[]> {
    const res = await fetch(`/api/discover`);
    if (!res.ok) throw new Error("Erreur lors de la récupération des séries");
    const data = await res.json();
    return data.series;
  }
}
