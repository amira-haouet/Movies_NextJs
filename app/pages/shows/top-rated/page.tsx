import TVShowGrid from "@/components/ui/MediaGrivTvShow";
import ThemeToggle from "@/components/ui/themeToggle";

export default function TopRatedMoviesPage() {
    return (
        <div>
            <ThemeToggle />
            <TVShowGrid url="/api/shows/top-rated" title="Top Rated Movies" />
        </div>
    );
}
