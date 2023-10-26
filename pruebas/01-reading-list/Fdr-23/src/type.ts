export type Book = {
    title: string;
    pages: number;
    genre: string;
    year: number;
    synopsis: string;
    cover: string;
    ISBN: string;
    author: {
      otherBooks: string[];
      name: string;
    };
  };