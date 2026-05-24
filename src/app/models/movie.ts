export interface Movie {
  title: string;
  description: string;
  image: string;
  big_image?: string;
  thumbnail?: string;
  year: number | string;
  genre: string[];
}