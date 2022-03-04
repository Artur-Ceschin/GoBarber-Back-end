import { Router } from 'express';
import { appointmentsRouter } from './appointments.routes';
import { sesseionsRouter } from './sessions.routes';
import { usersRouter } from './users.routes';
const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sesseionsRouter);

export default routes;
