import { injectable, inject } from "tsyringe";

import IOrphanageRepository from '@modules/Orphanages/repositories/IOrphanagesRepository';

interface IRequest {
  name: string; 
  latitude: number; 
  longitude: number;
  about: string;
  instructions: string; 
  opening_hours: string;
  open_on_weekends: string;
  images: Express.Multer.File[]
}

@injectable()
class CreateOrphanageService {
  constructor(
      @inject('OrphanageRepository')
      private orphanageRepository: IOrphanageRepository,
  ) {}

  public async execute({
    name,
    about,
    images,   
    instructions,
    latitude,
    longitude,
    open_on_weekends,
    opening_hours
  }: IRequest) {

    const updateImages = images.map(image => {
      return { path: image.filename }
    });

    const orphanage = await this.orphanageRepository.create({
      name,
      about,
      instructions,
      latitude,
      longitude,
      open_on_weekends,
      opening_hours,
      images: updateImages,   
    });

    return orphanage;
  }
}

export default CreateOrphanageService;