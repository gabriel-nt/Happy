import { injectable, inject } from "tsyringe";

import IOrphanageRepository from '@modules/Orphanages/repositories/IOrphanagesRepository';

@injectable()
class ListOrphanagesService {
  constructor(
    @inject('OrphanageRepository')
    private orphanageRepository: IOrphanageRepository,
  ) {}

  public async execute() {
    const orphanages = this.orphanageRepository.index();

    return orphanages;
  }
}

export default ListOrphanagesService;