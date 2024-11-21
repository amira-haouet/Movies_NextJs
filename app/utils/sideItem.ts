import { Film, Smile, Tv, User } from "lucide-react"

export const movieItems = [
  {
    title: "Now Playing",
    url: "/pages/movies/now-playing", 
    icon: Film,
  },
  {
    title: "Popular",
    url: "/pages/movies/popular", 
    icon: User,
  },
  {
    title: "Top Rated",
    url: "/pages/movies/top-rated", 
    icon: Smile,
  },
];

export const TVShowsItems = [
  {
    title: "On The Air",
    url: "/pages/shows/on-the-air", 
    icon: Tv,
  },
  {
    title: "Popular",
    url: "/pages/shows/popular", 
    icon: User,
  },
  {
    title: "Top Rated",
    url: "/pages/shows/top-rated", 
    icon: Smile,
  },
];
