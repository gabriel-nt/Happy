import { injectable, inject } from "tsyringe";
import path from 'path';
import fs from 'fs';

import Image from '../infra/typeorm/entities/Image';

import uploadConfig from '@config/upload';
import IOrphanageRepository from '@modules/Orphanages/repositories/IOrphanagesRepository';
import { getRepository } from "typeorm";
import Orphanage from "../infra/typeorm/entities/Orphanage";

interface IRequest {
  name: string; 
  latitude: number; 
  longitude: number;
  about: string;
  instructions: string; 
  opening_hours: string;
  open_on_weekends: string;
  images: Express.Multer.File[],
  images_deleted: string | string[];
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
    opening_hours,
    images_deleted
  }: IRequest, id: string): Promise<Orphanage> {
    const imageOrphanageRepository = getRepository(Image);

    const orphanage = await this.orphanageRepository.findOne(id);

    if (!orphanage) {
      throw new Error('Orphanage not found in database');
    }

    const updateImages = images.map(image => {
      return { path: image.filename }
    });

    Object.assign(orphanage, {
      orphanage_id: orphanage.id,
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends: open_on_weekends === 'true' ? true : false,
    });

    const createdImages = imageOrphanageRepository.create(updateImages.map(image => ({
      path: image.path,
      orphanage_id: String(orphanage.id),
    })));

    await imageOrphanageRepository.save(createdImages);

    if (images_deleted) {
      if (typeof images_deleted == 'string') {
      
        const filePath = path.resolve(uploadConfig.uploadsFolder, images_deleted);
  
          try {
            await fs.promises.stat(filePath);
          } catch {
            throw new Error("");
          }
  
          await fs.promises.unlink(filePath);
          await imageOrphanageRepository.delete({ path: images_deleted});

      } else {

        images_deleted.forEach(async (file:string) => {
          const filePath = path.resolve(uploadConfig.uploadsFolder, file);
    
            try {
              await fs.promises.stat(filePath);
            } catch {
              throw new Error("");
            }
    
            await fs.promises.unlink(filePath);
            await imageOrphanageRepository.delete({ path: file});
        }); 

      }
    }

    await this.orphanageRepository.update(orphanage);

    return orphanage;
  }
}

export default CreateOrphanageService;