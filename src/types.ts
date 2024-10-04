export enum Genre {
  Fiction = "Fiction",
  NonFiction = "Non-Fiction",
  Mystery = "Mystery",
  ScienceFiction = "Science Fiction",
  Biography = "Biography",
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  publishedYear: number;
  available: boolean;
}
