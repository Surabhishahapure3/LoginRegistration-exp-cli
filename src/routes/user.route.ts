import express,{ IRouter } from 'express';
import UserController from '../controllers/user.controller';
import UserValidator from '../validators/user.validator';

class UserRoutes {
  private UserController = new UserController();
  private router = express.Router();
  private userValidator = new UserValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.get('/',this.UserController.getAllUsers);
this.router.post('/login', this.userValidator.emailValidate, this.UserController.loginUser);
this.router.post('/register', this.userValidator.register,this.UserController.newUser); 

  };
  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;


