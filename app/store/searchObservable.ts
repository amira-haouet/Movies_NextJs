import { BehaviorSubject } from "rxjs";

export const searchTerm$ = new BehaviorSubject<string>("");

export const setSearchTerm = (term: string) => {
  searchTerm$.next(term);
};
