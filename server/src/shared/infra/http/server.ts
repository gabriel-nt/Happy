import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';

import '@shared/container';
import '@shared/infra/typeorm';

import routes from './routes';
import errorHandler from '@shared/errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(3333);
