import { container } from 'tsyringe';

import IOrphanagesRepository from '@modules/Orphanages/repositories/IOrphanagesRepository';
import OrphanageRepository from '@modules/Orphanages/infra/typeorm/repositories/OrphanageRepository';

container.registerSingleton<IOrphanagesRepository>(
    'OrphanageRepository',
    OrphanageRepository,
);
