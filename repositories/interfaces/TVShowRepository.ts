import { TVShow } from '../../app/entities/TVShow';

export interface TVShowRepository {
    getPopularTVShow(): Promise<TVShow[]>;
    getOnTheAirTVShow(): Promise<TVShow[]>;
    getTopRatedTVShow(): Promise<TVShow[]>;
  }