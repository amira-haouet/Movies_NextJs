import TVShowGrid from "@/components/ui/MediaGrivTvShow";

export default function TopRatedMoviesPage() {
    return <TVShowGrid url="/api/shows/popular" title="Top Rated Movies" />;
}
