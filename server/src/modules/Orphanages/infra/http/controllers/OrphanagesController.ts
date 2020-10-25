import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrphanageService from '@modules/Orphanages/services/CreateOrphanageService';
import ListOrphanagesService from '@modules/Orphanages/services/ListOrphanagesServices';
import ShowOrphanageService from '@modules/Orphanages/services/ShowOrphanageService';
import UpdateOrphanageService from '@modules/Orphanages/services/UpdateOrphanageService';
import orphanages_view from '@shared/views/orphanages_view';
import orphanageRouter from '../routes/orphanages.routes';


export default class OrphanagesController {
    public async create(
      request: Request,
      response: Response,
    ): Promise<Response> {
      const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
      } = request.body;

      const createOrphanage = container.resolve(CreateOrphanageService);

      const appointment = await createOrphanage.execute({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
        images: request.files as Express.Multer.File[]
      });

      return response.json(appointment);
    }

    public async index(
        _: Request,
        response: Response,
    ): Promise<Response> {
        const listOrphanages = container.resolve(ListOrphanagesService);

        const orphanages = await listOrphanages.execute();

        return response.json(orphanages_view.renderMany(orphanages));
    }

    public async show(
      request: Request,
      response: Response,
    ): Promise<Response> {
      const { id } = request.params;

      const showOrphanage = container.resolve(ShowOrphanageService);

      const orphanage = await showOrphanage.execute(id);

      if (!orphanage) {
        throw new Error("");
      }

      return response.json(orphanages_view.render(orphanage));
    }

    public async update(
      request: Request,
      response: Response,
    ): Promise<Response> {
      const { id } = request.params;

      const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
        images_deleted,
      } = request.body;

      const createOrphanage = container.resolve(UpdateOrphanageService);

      const appointment = await createOrphanage.execute({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
        images_deleted,
        images: request.files as Express.Multer.File[]
      }, id);

      return response.json(appointment);
    }

}
