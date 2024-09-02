import express, { IRouter } from 'express';
const router = express.Router();
// import AuthRoute from './auth.route';
import noteRoutes from './note.route';
import userRoute from './user.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new userRoute().getRoutes());
  router.use('/router', noteRoutes);

  return router;
};

export default routes;