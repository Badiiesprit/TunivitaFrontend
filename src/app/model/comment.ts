import { Post } from "./post";
import { User } from "./user";

export class Comment{
  _id:string;
  text:string;
  post:Post;
  user:User;
  like:number;
  dislike:number;
  disable:boolean;
}
