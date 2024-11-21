import { Film, Smile, Tv, User } from "lucide-react"

export const movieItems = [
  {
    title: "Now Playing",
    url: "api/movies/now-playing", 
    icon: Film,
  },
  {
    title: "Popular",
    url: "api/movies/popular", 
    icon: User,
  },
  {
    title: "Top Rated",
    url: "api/movies/top-rated", 
    icon: Smile,
  },
];

export const TVShowsItems = [
  {
    title: "On The Air",
    url: "api/shows/on-the-air", 
    icon: Tv,
  },
  {
    title: "Popular",
    url: "api/shows/popular", 
    icon: User,
  },
  {
    title: "Top Rated",
    url: "api/shows/top-rated", 
    icon: Smile,
  },
];
