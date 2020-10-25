import { Router } from 'express';
import orphanagesRouter from '@modules/Orphanages/infra/http/routes/orphanages.routes';

const routes = Router();

routes.use('/orphanages', orphanagesRouter);

export default routes;
