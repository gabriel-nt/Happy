import Orphanage from '../infra/typeorm/entities/Orphanage';
import ICreateOrphanage from '../dtos/ICreateOrphanage';

interface IAppointmentsRepository {
  index(): Promise<Orphanage[]>;
  create(data: Omit<ICreateOrphanage, 'images_deleted'>): Promise<Orphanage>;
  update(orphanage: Orphanage): Promise<Orphanage>;
  findOne(id: string): Promise<Orphanage | undefined>;
}

export default IAppointmentsRepository;
