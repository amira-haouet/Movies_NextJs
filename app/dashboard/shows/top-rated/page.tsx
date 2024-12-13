'use client';

import GridTvShow from "../components/GridTvShow";
import { useFetchTvShows } from "../useCase/useFetchTvShows";

export default function TopRatedTvShowsPage() {
    const { TVShows, isLoading } = useFetchTvShows("top-rated");
    return <GridTvShow shows={TVShows || []} isLoading={isLoading} />;
}
