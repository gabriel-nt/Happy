import IOrphanagesRepository from '../../../repositories/IOrphanagesRepository';
import Orphanage from '../entities/Orphanage';
import { Repository, getRepository } from 'typeorm';
import ICreateOrphanage from '../../../dtos/ICreateOrphanage';

class OrphanageRepository implements IOrphanagesRepository {
  private ormRepository: Repository<Orphanage>;

  constructor() {
      this.ormRepository = getRepository(Orphanage);
  }

  public async index(): Promise<Orphanage[]> {
    const orphanages = await this.ormRepository.find({
      relations: ['images']
    });

    return orphanages;
  }

  public async create({
    about,
    images,
    instructions,
    latitude,
    longitude,
    name,
    open_on_weekends,
    opening_hours
  }: Omit<ICreateOrphanage, 'images_deleted'>): Promise<Orphanage> {
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

    const appointment = this.ormRepository.create(data)

    await this.ormRepository.save(appointment);

    return appointment;
  }


  public async findOne(id: string): Promise<Orphanage | undefined> {
    const orphanage = await this.ormRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return orphanage;
  }

  public async update(orphanage: Orphanage): Promise<Orphanage> {
    return this.ormRepository.save(orphanage);
  }

}

export default OrphanageRepository;
