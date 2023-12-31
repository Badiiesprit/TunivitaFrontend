export class Service{
  _id:number;
  name:string;
  description:string;
  date:string | null;;
  image:Object;
  phone:number;
  email:String;
  location:String;
  disable:boolean;
  qrCode:String;
  createdAt:string;
  updatedAt:string;
  ratedBy: RatedUser[];
  averageRating: number;
}

export interface RatedUser {
  userId: string;
  rating: number;
}
