import MediaGrid from "@/components/ui/MediaGridMovie";

export default function TopRatedMoviesPage() {
  return <MediaGrid url="/api/movies/popular" title="Popular Movies" />;
}
