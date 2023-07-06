import { Image } from "./image";
import { Category } from "./category";

export class Center{
    _id?:number;
    title?:string;
    description?:string;
    image?:[Object];
    category?:Category;
    longitude?:string;
    altitude?:string;
    location?:string;
    phone?:string;
    email?:string;
    nbVus?:number;
    disable?:boolean;
    createdAt?:string;
    updatedAt?:string;
}