import { MoviesRepositoryInternal } from "@/repositories/MoviesRepositoryInternal";
import { DiscoverRepositoryInternal } from "@/repositories/DiscoverRepositoryInternal";
import { TVShowRepositoryInternal } from "./TVShowRepositoryInternal";
import { createContext, useContext } from "react";

export interface ApplicationRepository {
  moviesRepository: MoviesRepositoryInternal;
  tvShowsRepository: TVShowRepositoryInternal;
  discoverRepository: DiscoverRepositoryInternal;
}

const ApplicationRepositoryContext = createContext<ApplicationRepository | null>(null);

// 2. Hook personnalisé pour utiliser le contexte
export const useApplicationRepositoryContext = () => {
  const context = useContext(ApplicationRepositoryContext);
  if (!context) {
    throw new Error(
      "useApplicationRepositoryContext doit être utilisé dans un ApplicationRepositoryProvider"
    );
  }
  return context;
};

// 3. Provider pour envelopper l'application
export const ApplicationRepositoryProvider = ({ children }: { children: React.ReactNode }) => {
  const repositories: ApplicationRepository = {
    moviesRepository: new MoviesRepositoryInternal(),
    tvShowsRepository: new TVShowRepositoryInternal(),
    discoverRepository: new DiscoverRepositoryInternal(),
  };

  return (
    <ApplicationRepositoryContext.Provider value={repositories}>
      {children}
    </ApplicationRepositoryContext.Provider>
  );
};