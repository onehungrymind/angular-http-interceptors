import { Album } from './album';

export interface Artist {
  id: number;
  name: string;
  genres: string;
  images: string;
  albums: Album[];
}
