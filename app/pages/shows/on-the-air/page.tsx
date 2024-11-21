import TVShowGrid from "@/components/ui/MediaGrivTvShow";

export default function TopRatedMoviesPage() {
    return <TVShowGrid url="/api/shows/on-the-air" title="Top Rated Movies" />;
}
