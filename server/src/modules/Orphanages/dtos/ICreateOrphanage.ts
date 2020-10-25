import ICreateImage from "./ICreateImage";

export default interface ICreateOrphanage {
  name: string; 
  latitude: number; 
  longitude: number;
  about: string;
  instructions: string; 
  opening_hours: string;
  open_on_weekends: string;
  images: ICreateImage[]
  images_deleted: string | string[];
}