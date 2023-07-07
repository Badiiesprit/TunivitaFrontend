import { User } from "./user";
import { Center } from "./center";

export class Offer{
  _id:number;
  name: string;
  description: string;
  center: Center;
  image: Object;
  disable: boolean;
  clickCount: number;
  ratedBy: { userId: User['_id']; rating: number }[];
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
  isFavorite:boolean;
  favorites: string[];
}
