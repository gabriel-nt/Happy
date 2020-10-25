import { injectable, inject } from "tsyringe";

import IOrphanageRepository from '@modules/Orphanages/repositories/IOrphanagesRepository';
import Orphanage from "../infra/typeorm/entities/Orphanage";

@injectable()
class ShowOrphanageService {
  constructor(
    @inject('OrphanageRepository')
    private orphanageRepository: IOrphanageRepository,
  ) {}

  public async execute(id:string): Promise<Orphanage | undefined> {
    const orphanage = await this.orphanageRepository.findOne(id);

    return orphanage;
  }
}

export default ShowOrphanageService;