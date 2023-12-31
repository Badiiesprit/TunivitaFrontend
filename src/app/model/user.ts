import { Image } from "./image";

export class User
{
  _id:String;
  firstname:String;
  lastname: String;
  gender:String;
  phone:String;
  email:String;
  password:String;
  image:Object;
  date_birth:Date;
  address:String;
  state:String;
  city:String;
  zip_code:String;
  role:String;
  disable:Boolean;
  tokens: String;
  loginCount: number;
}
