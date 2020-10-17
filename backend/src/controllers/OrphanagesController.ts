import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';

import Image from '../models/Image';
import Orphanage from '../models/Orphange';
import orphanages_view from '../views/orphanages_view';

export default {
  async index(request: Request, response:Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return response.json(orphanages_view.renderMany(orphanages));
  },

  async show(request: Request, response:Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(orphanages_view.render(orphanage));
  },

  async create(request:Request, response: Response) {
    const { 
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends
    } = request.body;
  
    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    });

    const data = {
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends: open_on_weekends === 'true' ? true : false,
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    });

    await schema.validate(data, {
      abortEarly: false
    });
  
    const orphanage = orphanagesRepository.create(data);
  
    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },

  async update(request:Request, response: Response) {
    const { id } = request.params;

    const { 
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      images_deleted
    } = request.body;
  
    const imageOrphanageRepository = getRepository(Image);
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne(id);

    if (!orphanage) {
      throw new Error('Orphanage not found in database');
    }

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
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

    const createdImages = imageOrphanageRepository.create(images.map(image => ({
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
              return;
          }
  
          await fs.promises.unlink(filePath);
          await imageOrphanageRepository.delete({ path: images_deleted});

      } else {

        images_deleted.forEach(async (file:string) => {
          const filePath = path.resolve(uploadConfig.uploadsFolder, file);
    
            try {
                await fs.promises.stat(filePath);
            } catch {
                return;
            }
    
            await fs.promises.unlink(filePath);
            await imageOrphanageRepository.delete({ path: file});
        }); 

      }
    }

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  }
}